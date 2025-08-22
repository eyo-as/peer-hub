import { apiFetch } from "./api";

export interface LoginResponse {
  message?: string;
  error?: string;
  success: boolean;
  token: string;
}

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    const res = await apiFetch("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data: LoginResponse = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Unexpected error occurred");
  }
}
