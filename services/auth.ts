import { api } from "./api";
import type { LoginRequest, LoginResponse } from "@/types/auth";

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const res = await api.post<LoginResponse>("/login", data);
    return res.data;
  },
};
