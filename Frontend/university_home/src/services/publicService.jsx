import { apiRequest } from './apiClient';

export function fetchEvents() {
  // GET /api/public/events[file:2]
  return apiRequest('/api/public/events', { method: 'GET' });
}
