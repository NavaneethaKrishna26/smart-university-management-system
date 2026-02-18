const BASE_URL = 'http://localhost:9090';

export async function  apiRequest(path, { method = 'GET', body, token, isForm } = {}) {
  const headers = {};
  if (!isForm) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Request failed');
    throw new Error(errorText || 'Request failed');
  }

  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return res.json();
  }
  return null;
}
