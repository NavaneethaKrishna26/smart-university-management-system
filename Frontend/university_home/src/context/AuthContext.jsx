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
  const data = await loginRequest(credentials);

  console.log("Login response:", data); // DEBUG

  // Extract role properly (important!)
  const userRole =
    typeof data.role === "string"
      ? data.role
      : data.role?.name;

  setToken(data.token);
  setRole(userRole);

  localStorage.setItem("token", data.token);
  localStorage.setItem("role", userRole);

  // Redirect
  if (userRole === "STUDENT") navigate("/student");
  else if (userRole === "FACULTY") navigate("/faculty");
  else if (userRole === "ADMIN") navigate("/admin");
  else navigate("/");
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
