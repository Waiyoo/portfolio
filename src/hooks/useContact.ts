import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/services/api.client";

export interface ContactPayload {
  name: string;
  email: string;
  projectType: string;
  budget?: string;
  message: string;
}

export function useSubmitContactInquiry() {
  return useMutation({
    mutationFn: (payload: ContactPayload) => apiClient.post("/contact", payload),
  });
}