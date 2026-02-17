import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { role, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <div className="logo-mark">VU</div>
          <div>
            <div className="logo-title">Veltech University</div>
            <div className="logo-subtitle">Learn Innovate Lead</div>
          </div>
        </Link>

        <nav className="nav">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
          <NavLink to="/courses" className="nav-link">
            Courses
          </NavLink>

          {role === "STUDENT" && (
            <NavLink to="/student" className="nav-link">
              Dashboard
            </NavLink>
          )}

          {role === "FACULTY" && (
            <NavLink to="/faculty" className="nav-link">
              Dashboard
            </NavLink>
          )}

          {role === "ADMIN" && (
            <NavLink to="/admin" className="nav-link">
              Admin
            </NavLink>
          )}
        </nav>

        <div className="header-actions">
          {role ? (
            <>
              <span className="role-badge">{role}</span>
              <button className="btn btn-outline" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
