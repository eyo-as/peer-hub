import { apiFetch } from "./api";

export interface LoginResponse {
  message: string;
  sucess: boolean;
  token: string;
}

export async function loginUser(email: string, password: string) {
  return apiFetch<LoginResponse>("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
