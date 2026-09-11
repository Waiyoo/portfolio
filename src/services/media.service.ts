import { db } from "@/lib/db/client";
import { AppError } from "@/lib/errors/AppError";
import { z } from "zod";
import {
  createMediaSchema,
  updateMediaSchema,
  reorderMediaSchema,
} from "@/validations/media.schema";

export class MediaService {
  async getProjectMedia(projectId: string, includeHidden = false) {
    return db.projectImage.findMany({
      where: {
        projectId,
        ...(includeHidden ? {} : { isPrimary: true }),
      },
      orderBy: [{ isPrimary: "desc" }, { displayOrder: "asc" }],
    });
  }

  async addMedia(input: z.infer<typeof createMediaSchema>) {
    if (input.isFeatured) {
      await db.projectImage.updateMany({
        where: { projectId: input.projectId, isPrimary: true },
        data: { isPrimary: false },
      });
    }

    return db.projectImage.create({
      data: {
        projectId: input.projectId,
        url: input.url,
        altText: input.altText,
        caption: input.caption,
        isPrimary: input.isFeatured ?? false,
        displayOrder: input.order ?? 0,
      },
    });
  }

  async updateMedia(
    id: string,
    input: z.infer<typeof updateMediaSchema>
  ) {
    const existing = await db.projectImage.findUnique({
      where: { id },
    });

    if (!existing) {
      throw AppError.notFound("Media item not found");
    }

    if (input.isFeatured && !existing.isPrimary) {
      await db.projectImage.updateMany({
        where: {
          projectId: existing.projectId,
          isPrimary: true,
        },
        data: { isPrimary: false },
      });
    }

    return db.projectImage.update({
      where: { id },
      data: {
        ...(input.url !== undefined && { url: input.url }),
        ...(input.altText !== undefined && { altText: input.altText }),
        ...(input.caption !== undefined && { caption: input.caption }),
        ...(input.isFeatured !== undefined && {
          isPrimary: input.isFeatured,
        }),
        ...(input.order !== undefined && {
          displayOrder: input.order,
        }),
      },
    });
  }

  async reorderMedia(
    projectId: string,
    input: z.infer<typeof reorderMediaSchema>
  ) {
    const updates = input.items.map((item) =>
      db.projectImage.updateMany({
        where: {
          id: item.id,
          projectId,
        },
        data: {
          displayOrder: item.order,
        },
      })
    );

    await db.$transaction(updates);

    return { reordered: true };
  }

  async deleteMedia(id: string) {
    return db.projectImage.delete({
      where: { id },
    });
  }
}

export const mediaService = new MediaService();
