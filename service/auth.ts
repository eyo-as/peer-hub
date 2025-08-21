import request from "./api";

interface register {
  username: string;
  first_name: string;
  last_name: string;
  role?: string;
  class_id?: number;
  email: string;
  password: string;
}

interface login {
  email: string;
  password: string;
}

export const authService = {
  register: (data: register) =>
    request("/register", { method: "POST", body: JSON.stringify(data) }),

  login: (data: login) =>
    request("/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
