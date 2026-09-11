import { z } from "zod";

export const createMediaSchema = z.object({
  projectId: z.string().cuid(),
  url: z.string().url("Must be a valid image URL"),
  blurDataUrl: z.string().optional(),
  altText: z.string().min(3, "Alt text is required for accessibility").max(150),
  caption: z.string().max(255).optional(),
  isFeatured: z.boolean().default(false),
  isVisible: z.boolean().default(true),
  order: z.number().int().nonnegative().default(0),
  width: z.number().int().positive().default(1920),
  height: z.number().int().positive().default(1080),
});

export const updateMediaSchema = createMediaSchema.partial();

export const reorderMediaSchema = z.object({
  items: z.array(
    z.object({
      id: z.string().cuid(),
      order: z.number().int().nonnegative(),
    })
  ),
});