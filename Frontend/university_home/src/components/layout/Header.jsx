import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.jpeg";

function Header() {
  const { role, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-inner">
        {/* Logo + College Name */}
        <div className="logo">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Smart University" className="logo-image" />
            <span className="college-name">Veltech University</span>
          </Link>
        </div>

        {/* Navigation */}
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
          <NavLink to="/contactpage" className="nav-link">
            Contact us
          </NavLink>
          <NavLink to="/courses" className="nav-link">
            Placement
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

        {/* Login / Logout */}
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
