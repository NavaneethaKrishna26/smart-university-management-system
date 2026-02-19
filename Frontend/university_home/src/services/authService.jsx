import { apiRequest } from './apiClient';

export async function loginRequest({ username, password, role }) {
  const response = await apiRequest('/api/auth/login', {
    method: 'POST',
    body: { username: username.trim(), password, role }
  });

  console.log("Full API Response:", response);

  if (!response.success) {
    throw new Error(response.message || "Login failed");
  }

  const loginData = response.data;

  return {
    token: loginData.token,
    role: loginData.role,
    user: {
      username: loginData.username,
      name: loginData.fullName
    }
  };
}
