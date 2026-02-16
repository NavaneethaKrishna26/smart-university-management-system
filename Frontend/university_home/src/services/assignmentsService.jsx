import { apiRequest } from './apiClient';

export function fetchStudentAssignments(token) {
  // GET /api/student/assignments[file:2]
  return apiRequest('/api/student/assignments', { method: 'GET', token });
}

export async function uploadAssignment({ courseId, assignmentId, file }, token) {
  // POST /api/submissions (FormData)[file:2]
  const formData = new FormData();
  formData.append('courseId', courseId);
  formData.append('assignmentId', assignmentId);
  formData.append('file', file);

  return apiRequest('/api/submissions', {
    method: 'POST',
    token,
    body: formData,
    isForm: true,
  });
}

export function fetchAssignmentFeedback(submissionId, token) {
  // GET /api/submissions/{id}/feedback[file:2]
  return apiRequest(`/api/submissions/${submissionId}/feedback`, {
    method: 'GET',
    token,
  });
}
