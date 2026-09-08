import { apiClient } from "./client";

interface LoginResponse {
  access_token: string;
  token_type: string;
}

export async function login(
  username: string,
  password: string
): Promise<string> {
  const formData = new URLSearchParams();

  formData.append("username", username);
  formData.append("password", password);

  const { data } = await apiClient.post<LoginResponse>(
    "/auth/login",
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return data.access_token;
}
