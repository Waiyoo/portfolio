import { db } from "@/lib/db/client";
import { Prisma } from "@prisma/client";

export interface DiscoveryFilterParams {
  category?: string;
  technology?: string;
  search?: string;
  sort?: "newest" | "oldest" | "title_asc" | "title_desc";
  page?: number;
  limit?: number;
}

interface SimilarityEntity {
  id: string;
  category: unknown;
  technologies: string[];
  features: unknown[];
}

function calculateProjectSimilarity(
  source: SimilarityEntity,
  candidate: SimilarityEntity
): number {
  if (source.id === candidate.id) return 0;

  let score = 0;

  if (
    source.category &&
    candidate.category &&
    JSON.stringify(source.category) === JSON.stringify(candidate.category)
  ) {
    score += 3;
  }

  const sourceTech = new Set(source.technologies.map((item) => item.toLowerCase()));
  const candidateTech = new Set(candidate.technologies.map((item) => item.toLowerCase()));

  for (const technology of sourceTech) {
    if (candidateTech.has(technology)) {
      score += 2;
    }
  }

  const sourceFeatures = new Set(
    source.features.map((item) =>
      typeof item === "string"
        ? item.toLowerCase()
        : JSON.stringify(item).toLowerCase()
    )
  );

  const candidateFeatures = new Set(
    candidate.features.map((item) =>
      typeof item === "string"
        ? item.toLowerCase()
        : JSON.stringify(item).toLowerCase()
    )
  );

  for (const feature of sourceFeatures) {
    if (candidateFeatures.has(feature)) {
      score += 1;
    }
  }

  return score;
}

export class ProjectDiscoveryRepository {
  async findWithFilters(params: DiscoveryFilterParams) {
    const {
      category,
      technology,
      search,
      sort = "newest",
      page = 1,
      limit = 9,
    } = params;

    const where: Prisma.ProjectWhereInput = {
      published: true,
      publicationStatus: "PUBLISHED",
      ...(category && category !== "ALL"
        ? {
            category: {
              slug: category,
            },
          }
        : {}),
      ...(technology && technology !== "ALL"
        ? {
            technologies: {
              some: {
                technology: {
                  name: {
                    equals: technology,
                    mode: "insensitive",
                  },
                },
              },
            },
          }
        : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { tagline: { contains: search, mode: "insensitive" } },
              { overview: { contains: search, mode: "insensitive" } },
              {
                features: {
                  some: {
                    OR: [
                      { title: { contains: search, mode: "insensitive" } },
                      {
                        description: {
                          contains: search,
                          mode: "insensitive",
                        },
                      },
                    ],
                  },
                },
              },
            ],
          }
        : {}),
    };

    let orderBy: Prisma.ProjectOrderByWithRelationInput = {
      createdAt: "desc",
    };

    if (sort === "oldest") orderBy = { createdAt: "asc" };
    if (sort === "title_asc") orderBy = { title: "asc" };
    if (sort === "title_desc") orderBy = { title: "desc" };

    const [items, total] = await Promise.all([
      db.project.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          category: true,
          technologies: {
            include: {
              technology: true,
            },
          },
          features: {
            orderBy: {
              displayOrder: "asc",
            },
          },
          images: {
            orderBy: [
              { isPrimary: "desc" },
              { displayOrder: "asc" },
            ],
          },
        },
      }),
      db.project.count({ where }),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findRelatedProjects(projectId: string, limit = 3) {
    const current = await db.project.findUnique({
      where: { id: projectId },
      include: {
        category: true,
        technologies: {
          include: {
            technology: true,
          },
        },
        features: true,
      },
    });

    if (!current) return [];

    const candidates = await db.project.findMany({
      where: {
        published: true,
        publicationStatus: "PUBLISHED",
        id: { not: projectId },
      },
      include: {
        category: true,
        technologies: {
          include: {
            technology: true,
          },
        },
        features: true,
        images: {
          orderBy: [
            { isPrimary: "desc" },
            { displayOrder: "asc" },
          ],
        },
      },
    });

    const sourceEntity: SimilarityEntity = {
      id: current.id,
      category: current.category,
      technologies: current.technologies.map(
        (item) => item.technology.name
      ),
      features: current.features,
    };

    const scored = candidates.map((candidate) => ({
      project: candidate,
      score: calculateProjectSimilarity(sourceEntity, {
        id: candidate.id,
        category: candidate.category,
        technologies: candidate.technologies.map(
          (item) => item.technology.name
        ),
        features: candidate.features,
      }),
    }));

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.project);
  }

  async findRelatedServicesForProject(category: string) {
    void category;

    return db.service.findMany({
      where: {
        published: true,
      },
      take: 2,
      orderBy: {
        displayOrder: "asc",
      },
    });
  }
}

export const projectDiscoveryRepository =
  new ProjectDiscoveryRepository();
