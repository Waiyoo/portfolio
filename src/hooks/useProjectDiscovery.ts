"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import { apiClient } from "@/services/api.client";

export function useProjectDiscovery() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const category = searchParams.get("category") || "ALL";
  const technology = searchParams.get("technology") || "ALL";
  const search = searchParams.get("search") || "";
  const sort = (searchParams.get("sort") as any) || "newest";
  const page = Number(searchParams.get("page")) || 1;

  const updateFilters = useCallback(
    (updates: Record<string, string | number | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "" || value === "ALL") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      // Reset page to 1 when filters change
      if (!updates.page && params.has("page")) {
        params.set("page", "1");
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const query = useQuery({
    queryKey: ["projects", "discovery", { category, technology, search, sort, page }],
    queryFn: () =>
      apiClient.get<any>("/projects/discovery", {
        params: { category, technology, search, sort, page },
      }),
    staleTime: 1000 * 60 * 2,
  });

  return {
    ...query,
    filters: { category, technology, search, sort, page },
    updateFilters,
  };
}