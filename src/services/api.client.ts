import { AppError } from "@/lib/errors/AppError";

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl;
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`, window.location.origin);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    return url.toString();
  }

  async request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { params, headers, ...customConfig } = options;
    const config: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...customConfig,
    };

    try {
      const response = await fetch(this.buildUrl(endpoint, params), config);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new AppError(
          data.error?.message || "An unexpected network error occurred",
          response.status,
          data.error?.code || "HTTP_ERROR",
          data.error?.details
        );
      }

      return data.data as T;
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new AppError(error.message || "Network offline or server unreachable", 500, "NETWORK_ERROR");
    }
  }

  get<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  post<T>(endpoint: string, body: unknown, options?: FetchOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  put<T>(endpoint: string, body: unknown, options?: FetchOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  delete<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export const apiClient = new ApiClient();