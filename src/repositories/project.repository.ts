import { db } from "@/lib/db/client";
import { Prisma } from "@prisma/client";

export class ProjectRepository {
  async findPublished() {
    return db.project.findMany({
      where: { publicationStatus: "PUBLISHED", published: true },
      include: {
        technologies: {
          include: { technology: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findBySlug(slug: string) {
    return db.project.findUnique({
      where: { slug },
      include: {
        technologies: {
          include: { technology: true },
        },
      },
    });
  }

  async findAllAdmin() {
    return db.project.findMany({
      include: {
        technologies: {
          include: { technology: true },
        },
      },
      orderBy: { updatedAt: "desc" },
    });
  }

  async create(data: Prisma.ProjectCreateInput, technologyIds: string[]) {
    return db.project.create({
      data: {
        ...data,
        technologies: {
          create: technologyIds.map((id) => ({ technologyId: id })),
        },
      },
      include: {
        technologies: { include: { technology: true } },
      },
    });
  }

  async update(id: string, data: Prisma.ProjectUpdateInput, technologyIds?: string[]) {
    if (technologyIds) {
      await db.projectTechnology.deleteMany({ where: { projectId: id } });
    }

    return db.project.update({
      where: { id },
      data: {
        ...data,
        ...(technologyIds && {
          technologies: {
            create: technologyIds.map((techId) => ({ technologyId: techId })),
          },
        }),
      },
      include: {
        technologies: { include: { technology: true } },
      },
    });
  }

  async delete(id: string) {
    return db.project.delete({ where: { id } });
  }
}

export const projectRepository = new ProjectRepository();
