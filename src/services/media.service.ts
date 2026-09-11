import { db } from "@/lib/db/client";
import { AppError } from "@/lib/errors/AppError";
import { z } from "zod";
import { createMediaSchema, updateMediaSchema, reorderMediaSchema } from "@/validations/media.schema";

export class MediaService {
  async getProjectMedia(projectId: string, includeHidden = false) {
    return db.projectMedia.findMany({
      where: {
        projectId,
        ...(includeHidden ? {} : { isVisible: true }),
      },
      orderBy: [{ isFeatured: "desc" }, { order: "asc" }],
    });
  }

  async addMedia(input: z.infer<typeof createMediaSchema>) {
    if (input.isFeatured) {
      await db.projectMedia.updateMany({
        where: { projectId: input.projectId, isFeatured: true },
        data: { isFeatured: false },
      });
    }

    return db.projectMedia.create({ data: input });
  }

  async updateMedia(id: string, input: z.infer<typeof updateMediaSchema>) {
    const existing = await db.projectMedia.findUnique({ where: { id } });
    if (!existing) throw AppError.notFound("Media item not found");

    if (input.isFeatured && !existing.isFeatured) {
      await db.projectMedia.updateMany({
        where: { projectId: existing.projectId, isFeatured: true },
        data: { isFeatured: false },
      });
    }

    return db.projectMedia.update({
      where: { id },
      data: input,
    });
  }

  async reorderMedia(projectId: string, input: z.infer<typeof reorderMediaSchema>) {
    const updates = input.items.map((item) =>
      db.projectMedia.updateMany({
        where: { id: item.id, projectId },
        data: { order: item.order },
      })
    );

    await db.$transaction(updates);
    return { reordered: true };
  }

  async deleteMedia(id: string) {
    return db.projectMedia.delete({ where: { id } });
  }
}

export const mediaService = new MediaService();