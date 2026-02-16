import { apiRequest } from './apiClient';

export async function loginRequest({ username, password, role }) {
  // 🚀 DEVELOPMENT MODE: Instant login with 123/123
  if (username === '123' && password === '1234567') {
    await new Promise(resolve => setTimeout(resolve, 1200)); // Real API feel
    
    return {
      token: `mock-jwt-${role.toLowerCase()}-${Date.now()}`,
      role: role,
      user: {
        id: role === 'STUDENT' ? 1001 : role === 'FACULTY' ? 2001 : 9999,
        name: role === 'STUDENT' ? 'Student User' : 
              role === 'FACULTY' ? 'Prof. Smith' : 'System Admin',
        email: `${role.toLowerCase()}@smartuniv.edu`
      }
    };
  }
  
  // 🎯 PRODUCTION MODE: Real backend (uncomment when ready)
  /*
  try {
    return await apiRequest('/api/auth/login', {
      method: 'POST',
      body: { username: username.trim(), password, role }
    });
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
  */
  
  // Simulate occasional network errors
  if (Math.random() < 0.02) {
    throw new Error('Network error - please check connection');
  }
  
  throw new Error('Invalid credentials');
}
