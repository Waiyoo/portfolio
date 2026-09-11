import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/services/api.client";

export function useAdminProjects() {
  return useQuery({
    queryKey: ["admin", "projects"],
    queryFn: () => apiClient.get("/admin/projects"),
  });
}

export function useCreateProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProjectData: any) => apiClient.post("/admin/projects", newProjectData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects", "public"] });
    },
  });
}

export function useDeleteProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/admin/projects/${id}`),
    // Optimistic UI Removal
    onMutate: async (deletedId: string) => {
      await queryClient.cancelQueries({ queryKey: ["admin", "projects"] });
      const previousProjects = queryClient.getQueryData<any[]>(["admin", "projects"]);

      if (previousProjects) {
        queryClient.setQueryData(
          ["admin", "projects"],
          previousProjects.filter((p) => p.id !== deletedId)
        );
      }

      return { previousProjects };
    },
    onError: (_err, _newTodo, context) => {
      if (context?.previousProjects) {
        queryClient.setQueryData(["admin", "projects"], context.previousProjects);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects", "public"] });
    },
  });
}