export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface AuthUser {
  email: string;
  token: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  hydrate: () => void;
}
