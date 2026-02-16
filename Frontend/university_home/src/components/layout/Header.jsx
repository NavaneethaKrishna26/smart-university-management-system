import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const { role, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          <span className="logo-mark">SU</span>
          <div className="logo-text">
            <div className="logo-title">Smart University</div>
            <div className="logo-motto">Learn. Innovate. Lead.</div>
          </div>
        </Link>
      </div>
      <nav className="nav">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/about" className="nav-link">
          About Us
        </NavLink>
        <NavLink to="/courses" className="nav-link">
          Courses
        </NavLink>
        {role === 'STUDENT' && (
          <NavLink to="/student" className="nav-link">
            Student Portal
          </NavLink>
        )}
        {role === 'FACULTY' && (
          <NavLink to="/faculty" className="nav-link">
            Faculty Portal
          </NavLink>
        )}
        {role === 'ADMIN' && (
          <NavLink to="/admin" className="nav-link">
            Admin
          </NavLink>
        )}
      </nav>
      <div className="header-right">
        {role ? (
          <>
            <span className="role-badge">{role}</span>
            <button className="btn btn-outline" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          !location.pathname.startsWith('/login') && (
            <>
              <Link to="/login?role=STUDENT" className="btn btn-ghost">
                Student Login
              </Link>
              <Link to="/login?role=FACULTY" className="btn btn-primary">
                Faculty Login
              </Link>
            </>
          )
        )}
      </div>
    </header>
  );
}

export default Header;
