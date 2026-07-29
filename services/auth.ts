// TODO: replace with real API call when ReqRes API key is available
// Current endpoint https://reqres.in/api/login now requires x-api-key header
import type { LoginRequest, LoginResponse } from "@/types/auth";

const MOCK_EMAIL = "eve.holt@reqres.in";
const MOCK_PASSWORD = "cityslicka";

export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (data.email === MOCK_EMAIL && data.password === MOCK_PASSWORD) {
    return { token: "QpwL5tke4Pnpja7X4" };
  }

  return Promise.reject({
    status: 400,
    message: "Invalid email or password. Please check your credentials.",
  });
}
