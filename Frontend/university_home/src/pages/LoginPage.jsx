import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ErrorAlert from '../components/ui/ErrorAlert';
import Loader from '../components/ui/Loader';

function LoginPage() {
  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState('STUDENT');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const queryRole = searchParams.get('role');
    if (queryRole === 'FACULTY' || queryRole === 'STUDENT' || queryRole === 'ADMIN') {
      setRole(queryRole);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login({ username, password, role }); // POST /api/auth/login[file:2]
    } catch (e) {
      setError('Invalid credentials or server error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page page-center">
      <div className="card card-wide">
        <h1>Login</h1>
        <p className="muted">Sign in to your Smart University account.</p>
        <div className="role-toggle">
          <button
            type="button"
            className={`toggle-btn ${role === 'STUDENT' ? 'active' : ''}`}
            onClick={() => setRole('STUDENT')}
          >
            Student
          </button>
          <button
            type="button"
            className={`toggle-btn ${role === 'FACULTY' ? 'active' : ''}`}
            onClick={() => setRole('FACULTY')}
          >
            Faculty
          </button>
          <button
            type="button"
            className={`toggle-btn ${role === 'ADMIN' ? 'active' : ''}`}
            onClick={() => setRole('ADMIN')}
          >
            Admin
          </button>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <ErrorAlert message={error} />
          <label className="form-control">
            <span className="form-label">Username</span>
            <input
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </label>
          <label className="form-control">
            <span className="form-label">Password</span>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </label>
          <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
            {submitting ? <Loader /> : `Login as ${role}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
