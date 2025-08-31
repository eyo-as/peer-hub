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

export interface User {
  class_id: string | number;
  created_at: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  role: string;
  user_id: string | number;
  username: string;
}

export interface SingleUserResponse {
  message: string;
  success: boolean;
  data: User;
}

export interface UserListResponse {
  message: string;
  success: boolean;
  data: User[];
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

export async function getAllUser(): Promise<User[]> {
  try {
    const token = localStorage.getItem("token");
    const res = await apiFetch("/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data: UserListResponse = await res.json();

    return data.data;
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message);
    throw new Error("Unexpected error occurred");
  }
}

export async function getSingleUser(
  user_id: string | number,
  token: string
): Promise<User> {
  try {
    const res = await apiFetch(`/user/${user_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data: SingleUserResponse = await res.json();
    return data.data;
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message);
    throw new Error("Unexpected error occurred");
  }
}
