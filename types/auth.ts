export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface ApiErrorResponse {
  error: string;
}
