import { apiRequest } from './apiClient';

export function loginRequest({ username, password, role }) {
  // POST /api/auth/login -> { token, role }[file:2]
  return apiRequest('/api/auth/login', {
    method: 'POST',
    body: { username, password, role },
  });
}
