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

export class ProjectDiscoveryRepository {
  async findWithFilters(params: DiscoveryFilterParams) {
    const { category, technology, search, sort = "newest", page = 1, limit = 9 } = params;

    const where: Prisma.ProjectWhereInput = {
      status: "PUBLISHED",
      ...(category && category !== "ALL" ? { category } : {}),
      ...(technology && technology !== "ALL"
        ? {
            technologies: {
              some: {
                technology: { name: { equals: technology, mode: "insensitive" } },
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
              { features: { hasSome: [search] } },
            ],
          }
        : {}),
    };

    let orderBy: Prisma.ProjectOrderByWithRelationInput = { createdAt: "desc" };
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
          technologies: { include: { technology: true } },
          media: { where: { isVisible: true }, orderBy: [{ isFeatured: "desc" }, { order: "asc" }] },
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
      include: { technologies: { include: { technology: true } } },
    });

    if (!current) return [];

    const candidates = await db.project.findMany({
      where: { status: "PUBLISHED", id: { not: projectId } },
      include: {
        technologies: { include: { technology: true } },
        media: { where: { isVisible: true, isFeatured: true } },
      },
    });

    const sourceEntity = {
      id: current.id,
      category: current.category,
      technologies: current.technologies.map((t) => t.technology.name),
      features: current.features,
    };

    const scored = candidates.map((c) => ({
      project: c,
      score: calculateProjectSimilarity(sourceEntity, {
        id: c.id,
        category: c.category,
        technologies: c.technologies.map((t) => t.technology.name),
        features: c.features,
      }),
    }));

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.project);
  }

  async findRelatedServicesForProject(category: string) {
    return db.service.findMany({
      where: { status: "PUBLISHED" },
      take: 2,
    });
  }
}

export const projectDiscoveryRepository = new ProjectDiscoveryRepository();