import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/services/api.client";

export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  category: string;
  tagline: string;
  operationalStatus: "COMPLETED_PROTOTYPE" | "PARTIALLY_COMPLETED" | "IN_DEVELOPMENT";
  overview: string;
  objective: string;
  problem: string;
  solution: string;
  features: string[];
  images: string[];
  technologies: string[];
  links: { github?: string; live?: string; demo?: string };
}

export function usePublicProjects() {
  return useQuery<ProjectData[]>({
    queryKey: ["projects", "public"],
    queryFn: () => apiClient.get<ProjectData[]>("/projects"),
    staleTime: 1000 * 60 * 5, // 5 Minutes
    retry: 2,
  });
}

export function usePublicProjectDetail(slug: string) {
  return useQuery<ProjectData>({
    queryKey: ["projects", "public", slug],
    queryFn: () => apiClient.get<ProjectData>(`/projects/${slug}`),
    enabled: !!slug,
    retry: 1,
  });
}