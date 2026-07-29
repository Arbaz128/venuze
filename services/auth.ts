import apiClient from "@/services/api";
import type { LoginRequest, LoginResponse } from "@/types/auth";

export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>("/login", data);
  return response.data;
}
