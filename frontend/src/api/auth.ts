import { apiClient } from "./client";

interface LoginResponse {
  access_token: string;
  token_type: string;
}

export async function login(username: string, password: string): Promise<string> {
  const { data } = await apiClient.post<LoginResponse>("/auth/login", { username, password });
  return data.access_token;
}
