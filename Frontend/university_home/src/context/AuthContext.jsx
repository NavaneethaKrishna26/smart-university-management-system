import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (storedToken && storedRole) {
      setToken(storedToken);
      setRole(storedRole);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const data = await loginRequest(credentials); // POST /api/auth/login[file:2]
    setToken(data.token);
    setRole(data.role);
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
    if (data.role === 'STUDENT') navigate('/student');
    else if (data.role === 'FACULTY') navigate('/faculty');
    else if (data.role === 'ADMIN') navigate('/admin');
    else navigate('/');
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  const value = { token, role, login, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
