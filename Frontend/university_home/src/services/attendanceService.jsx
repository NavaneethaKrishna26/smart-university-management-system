import { apiRequest } from './apiClient';

export function fetchFacultyClasses(token) {
  // GET /api/faculty/classes[file:2]
  return apiRequest('/api/faculty/classes', { method: 'GET', token });
}

export function fetchStudentsByClass(classId, token) {
  // GET /api/classes/{classId}/students[file:2]
  return apiRequest(`/api/classes/${classId}/students`, { method: 'GET', token });
}

export function markAttendance({ classId, date, records }, token) {
  // POST /api/attendance[file:2]
  return apiRequest('/api/attendance', {
    method: 'POST',
    token,
    body: { classId, date, records },
  });
}

export function fetchAttendanceByRange({ classId, from, to }, token) {
  // GET /api/attendance?classId=1&from=...&to=...[file:2]
  const params = new URLSearchParams({ classId, from, to });
  return apiRequest(`/api/attendance?${params.toString()}`, {
    method: 'GET',
    token,
  });
}

export function fetchAttendanceReport({ classId, from, to }, token) {
  // GET /api/admin/attendance/report?classId=1&from=...&to=...[file:2]
  const params = new URLSearchParams({ classId, from, to });
  return apiRequest(`/api/admin/attendance/report?${params.toString()}`, {
    method: 'GET',
    token,
  });
}
