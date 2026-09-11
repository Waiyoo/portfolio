import { projectRepository } from "@/repositories/project.repository";
import { AppError } from "@/lib/errors/AppError";
import { z } from "zod";
import { createProjectSchema, updateProjectSchema } from "@/validations/project.schema";

export class ProjectService {
  async getPublicProjects() {
    const projects = await projectRepository.findPublished();
    return projects.map((p) => this.formatProjectResponse(p));
  }

  async getProjectBySlug(slug: string) {
    const project = await projectRepository.findBySlug(slug);
    if (!project || project.publicationStatus !== "PUBLISHED" || !project.published) {
      throw AppError.notFound(`Project with slug '${slug}' was not found.`);
    }
    return this.formatProjectResponse(project);
  }

  async getAllProjectsForAdmin() {
    return projectRepository.findAllAdmin();
  }

  async createProject(input: z.infer<typeof createProjectSchema>) {
    const existing = await projectRepository.findBySlug(input.slug);
    if (existing) {
      throw AppError.conflict(`Project slug '${input.slug}' is already in use.`);
    }

    const { technologyIds, ...projectData } = input;
    return projectRepository.create(projectData as any, technologyIds);
  }

  async updateProject(id: string, input: z.infer<typeof updateProjectSchema>) {
    const { technologyIds, ...projectData } = input;
    return projectRepository.update(id, projectData as any, technologyIds);
  }

  async deleteProject(id: string) {
    return projectRepository.delete(id);
  }

  private formatProjectResponse(project: any) {
    return {
      id: project.id,
      slug: project.slug,
      title: project.title,
      category: project.category,
      tagline: project.tagline,
      operationalStatus: project.operationalStatus,
      overview: project.overview,
      objective: project.objective,
      problem: project.problem,
      solution: project.solution,
      features: project.features,
      images: project.images,
      technologies: project.technologies.map((pt: any) => pt.technology.name),
      links: {
        github: project.githubUrl,
        live: project.liveUrl,
        demo: project.demoUrl,
      },
      caseStudyRef: project.caseStudyRef,
    };
  }
}

export const projectService = new ProjectService();
