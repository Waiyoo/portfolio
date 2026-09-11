import { MetadataRoute } from "next";
import { db } from "@/lib/db/client";
import { SITE_CONFIG } from "@/lib/seo/metadata.config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

  // Static Public Routes
  const routes = ["", "/projects", "/services", "/workstation", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic Case Study Routes from DB
  try {
    const projects = await db.project.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
    });

    const projectRoutes = projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: project.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    return [...routes, ...projectRoutes];
  } catch {
    return routes;
  }
}