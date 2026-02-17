import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import Loader from "../components/ui/Loader";
import ErrorAlert from "../components/ui/ErrorAlert";

function LoginPage() {
  const { login } = useAuth();
  const toast = useToast();
  const [searchParams] = useSearchParams();

  const [role, setRole] = useState("STUDENT");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const queryRole = searchParams.get("role");
    if (["STUDENT", "FACULTY", "ADMIN"].includes(queryRole)) {
      setRole(queryRole);
    }
  }, [searchParams]);

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setError("");
    setLoading(true);

    try {
      await login({ username: username.trim(), password, role });
      toast.addToast(`Welcome ${role.toLowerCase()}!`, "success");
    } catch (err) {
      const errorMessage = err?.message || "Login failed. Please try again.";
      setError(errorMessage);
      toast.addToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="logo-small">
              <div className="logo-mark-small">SU</div>
            </div>
            <h1>Welcome back</h1>
            <p className="login-subtitle">
              Sign in to your Smart University account
            </p>
          </div>

          <div className="role-selector">
            <button
              type="button"
              className={`role-btn ${role === "STUDENT" ? "active" : ""}`}
              onClick={() => setRole("STUDENT")}
              disabled={loading}
            >
              <div className="role-icon">👨‍🎓</div>
              <span>Student</span>
              <div className="role-subtitle">Submit assignments</div>
            </button>

            <button
              type="button"
              className={`role-btn ${role === "FACULTY" ? "active" : ""}`}
              onClick={() => setRole("FACULTY")}
              disabled={loading}
            >
              <div className="role-icon">👨‍🏫</div>
              <span>Faculty</span>
              <div className="role-subtitle">Mark attendance</div>
            </button>

            <button
              type="button"
              className={`role-btn ${role === "ADMIN" ? "active" : ""}`}
              onClick={() => setRole("ADMIN")}
              disabled={loading}
            >
              <div className="role-icon">⚙️</div>
              <span>Admin</span>
              <div className="role-subtitle">View reports</div>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <ErrorAlert message={error} />

            <div className="form-group">
              <label className="form-label">Username or Email</label>
              <input
                type="text"
                className={`form-input ${errors.username ? "error" : ""}`}
                placeholder="Enter your username or email"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username)
                    setErrors((prev) => ({ ...prev, username: undefined }));
                }}
                disabled={loading}
                autoComplete="username"
              />
              {errors.username && (
                <span className="error-message">{errors.username}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className={`form-input ${errors.password ? "error" : ""}`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password)
                    setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                disabled={loading}
                autoComplete="current-password"
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading || !username || !password}
            >
              {loading ? (
                <>
                  <Loader size="sm" />
                  Signing in...
                </>
              ) : (
                `Sign in as ${role}`
              )}
            </button>
          </form>

          <div className="login-footer">
            <p className="forgot-password">
              <button type="button" className="link-button" disabled={loading}>
                Forgot password?
              </button>
            </p>
            <p className="need-help">
              Need help?{" "}
              <a href="mailto:support@smartuniv.edu" className="link">
                Contact support
              </a>
            </p>
          </div>
        </div>

        <div className="login-illustration">
          <div className="illustration-circle"></div>
          <div className="illustration-content">
            <h2>Smart workflows for smarter learning</h2>
            <p>Everything you need in one beautiful interface</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
