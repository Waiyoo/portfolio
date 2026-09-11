import { z } from "zod";

export const createProjectSchema = z.object({
  slug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/, "Slug must be lowercase kebab-case"),
  title: z.string().min(2).max(150),
  category: z.string().min(2),
  tagline: z.string().min(5).max(255),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  operationalStatus: z.enum(["COMPLETED_PROTOTYPE", "PARTIALLY_COMPLETED", "IN_DEVELOPMENT"]),
  overview: z.string().min(10),
  objective: z.string().min(10),
  problem: z.string().min(10),
  solution: z.string().min(10),
  features: z.array(z.string()),
  images: z.array(z.string().url()).default([]),
  technologyIds: z.array(z.string()),
  githubUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  demoUrl: z.string().url().optional().or(z.literal("")),
  caseStudyRef: z.string().optional(),
});

export const updateProjectSchema = createProjectSchema.partial();