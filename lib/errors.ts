import axios from "axios";

export type AppErrorKind =
  | "TIMEOUT"
  | "NETWORK"
  | "UNAUTHORIZED"
  | "VALIDATION"
  | "SERVER"
  | "UNKNOWN";

export class AppError extends Error {
  kind: AppErrorKind;
  status?: number;

  constructor(kind: AppErrorKind, message: string, status?: number) {
    super(message);
    this.kind = kind;
    this.status = status;
    this.name = "AppError";
  }
}

export function normalizeAxiosError(error: unknown): AppError {
  if (axios.isAxiosError(error)) {
    if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
      return new AppError(
        "TIMEOUT",
        "The server is taking too long to respond. Please check your connection and try again."
      );
    }
    if (!error.response) {
      return new AppError(
        "NETWORK",
        "Unable to reach the server. Please check your internet connection."
      );
    }
    const status = error.response.status;
    const apiMessage = (error.response.data as { error?: string })?.error;
    if (status === 401 || status === 400) {
      return new AppError(
        "UNAUTHORIZED",
        apiMessage || "Invalid email or password.",
        status
      );
    }
    if (status >= 500) {
      return new AppError(
        "SERVER",
        "The server encountered an error. Please try again shortly.",
        status
      );
    }
    return new AppError("UNKNOWN", apiMessage || "Something went wrong.", status);
  }
  return new AppError("UNKNOWN", "An unexpected error occurred.");
}
