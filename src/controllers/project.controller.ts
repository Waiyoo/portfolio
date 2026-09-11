import { NextRequest, NextResponse } from "next/server";
import { projectService } from "@/services/project.service";
import { successResponse, errorResponse } from "@/lib/response/apiResponse";
import { createProjectSchema, updateProjectSchema } from "@/validations/project.schema";

export class ProjectController {
  /**
   * Retrieves public project listings for client-facing showcase routes.
   */
  async getPublicProjects(): Promise<NextResponse> {
    try {
      const projects = await projectService.getPublicProjects();
      return successResponse(projects, 200);
    } catch (err) {
      return errorResponse(err);
    }
  }

  /**
   * Fetches detailed information for a single project by its unique slug.
   */
  async getProjectBySlug(slug: string): Promise<NextResponse> {
    try {
      const project = await projectService.getProjectBySlug(slug);
      return successResponse(project, 200);
    } catch (err) {
      return errorResponse(err);
    }
  }

  /**
   * Fetches all projects including drafts and unlisted records for administrative management.
   */
  async getAdminProjects(): Promise<NextResponse> {
    try {
      const projects = await projectService.getAllProjectsForAdmin();
      return successResponse(projects, 200);
    } catch (err) {
      return errorResponse(err);
    }
  }

  /**
   * Creates a new project entity after validating the payload against `createProjectSchema`.
   */
  async createProject(request: NextRequest): Promise<NextResponse> {
    try {
      let body: unknown;
      try {
        body = await request.json();
      } catch {
        return errorResponse(new Error("Invalid JSON payload provided."), 400);
      }

      const validated = createProjectSchema.parse(body);
      const project = await projectService.createProject(validated);
      return successResponse(project, 201);
    } catch (err) {
      return errorResponse(err);
    }
  }

  /**
   * Updates an existing project record by ID after validating updates against `updateProjectSchema`.
   */
  async updateProject(id: string, request: NextRequest): Promise<NextResponse> {
    try {
      let body: unknown;
      try {
        body = await request.json();
      } catch {
        return errorResponse(new Error("Invalid JSON payload provided."), 400);
      }

      const validated = updateProjectSchema.parse(body);
      const project = await projectService.updateProject(id, validated);
      return successResponse(project, 200);
    } catch (err) {
      return errorResponse(err);
    }
  }

  /**
   * Deletes a project record by ID.
   */
  async deleteProject(id: string): Promise<NextResponse> {
    try {
      await projectService.deleteProject(id);
      return successResponse({ deleted: true, id }, 200);
    } catch (err) {
      return errorResponse(err);
    }
  }
}

export const projectController = new ProjectController();