import { apiFetch } from "./api";

export interface RegisterResponse {
  message?: string;
  error?: string;
  success: boolean;
}

export interface LoginResponse {
  message?: string;
  error?: string;
  success: boolean;
  token: string;
}

export async function registerUser(
  username: string,
  first_name: string,
  last_name: string,
  role: string,
  class_id: number | string,
  email: string,
  password: string
): Promise<RegisterResponse> {
  try {
    const res = await apiFetch("/register", {
      method: "POST",
      body: JSON.stringify({
        username,
        first_name,
        last_name,
        role,
        class_id,
        email,
        password,
      }),
    });

    const data: RegisterResponse = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Unexpected error occurred");
  }
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
    if (err instanceof Error) throw new Error(err.message);
    throw new Error("Unexpected error occurred");
  }
}
