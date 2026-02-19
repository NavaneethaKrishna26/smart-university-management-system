// Replace your StudentDashboard JSX with this FIXED version:

import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/ui/Loader";

function StudentDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="page page-center">
        <Loader />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const studentName = user?.fullName || "John Doe";
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="layout">
      {/* ✅ FIXED SIDEBAR - Proper Link paths */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-mark">🎓</span>
          <span className="logo-text">Campus Portal</span>
        </div>
        <nav className="sidebar-nav">
          <NavLink
            to="/student"
            end
            className={({ isActive }) =>
              isActive ? "nav-item nav-item-active" : "nav-item"
            }
          >
            <span>📊</span> Dashboard
          </NavLink>

          <NavLink
            to="/student/assignments"
            className={({ isActive }) =>
              isActive ? "nav-item nav-item-active" : "nav-item"
            }
          >
            <span>📝</span> Assignments
          </NavLink>

          <NavLink
            to="/student/attendance"
            className={({ isActive }) =>
              isActive ? "nav-item nav-item-active" : "nav-item"
            }
          >
            <span>📊</span> Attendance
          </NavLink>

          <NavLink
            to="/student/grades"
            className={({ isActive }) =>
              isActive ? "nav-item nav-item-active" : "nav-item"
            }
          >
            <span>📈</span> Grades
          </NavLink>

          <NavLink
            to="/student/courses"
            className={({ isActive }) =>
              isActive ? "nav-item nav-item-active" : "nav-item"
            }
          >
            <span>📚</span> Courses
          </NavLink>

          <NavLink
            to="/student/profile"
            className={({ isActive }) =>
              isActive ? "nav-item nav-item-active" : "nav-item"
            }
          >
            <span>👤</span> Profile
          </NavLink>

          <NavLink
            to="/student/settings"
            className={({ isActive }) =>
              isActive ? "nav-item nav-item-active" : "nav-item"
            }
          >
            <span>⚙️</span> Settings
          </NavLink>
        </nav>
      </aside>

      {/* Main area */}
      <div className="main">
        {/* Top bar */}
        <header className="topbar">
          <div>
            <h1 className="topbar-title">Student Dashboard</h1>
            <p className="topbar-subtitle">{today}</p>
          </div>
          <div className="topbar-right">
            <button
              className="icon-btn"
              aria-label="Notifications"
              title="Notifications"
            >
              🔔
            </button>
            <div className="profile-chip">
              <div className="avatar-circle">
                {studentName.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="profile-name">{studentName}</div>
                <div className="profile-meta">B.Tech • Semester 5</div>
              </div>
            </div>
          </div>
        </header>

        <main className="content">
          {/* Welcome + quick info */}
          <section className="welcome-section">
            <div className="welcome-card">
              <h2>Welcome back, {studentName} 👋</h2>
              <p>
                Here is an overview of your academics, upcoming classes, and
                assignments.
              </p>
              <div className="welcome-meta-row">
                <div>
                  <div className="welcome-meta-label">Program</div>
                  <div className="welcome-meta-value">
                    B.Tech Computer Science
                  </div>
                </div>
                <div>
                  <div className="welcome-meta-label">Current Semester</div>
                  <div className="welcome-meta-value">5th Semester</div>
                </div>
                <div>
                  <div className="welcome-meta-label">Advisor</div>
                  <div className="welcome-meta-value">Dr. Anitha</div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats row */}
          <section className="stats-row">
            <div className="stat-card">
              <div className="stat-label">Overall GPA</div>
              <div className="stat-number">8.4</div>
              <div className="stat-sub">Last updated: This semester</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Credits Completed</div>
              <div className="stat-number">92</div>
              <div className="stat-sub">Out of 160 credits</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Active Courses</div>
              <div className="stat-number">6</div>
              <div className="stat-sub">For current semester</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Assignments Due</div>
              <div className="stat-number stat-number-warning">3</div>
              <div className="stat-sub">Next 7 days</div>
            </div>
          </section>

          {/* Main grid: left + right */}
          <section className="grid-2col">
            {/* Left column */}
            <div className="grid-col">
              {/* Upcoming deadlines */}
              <div className="card">
                <div className="section-header">
                  <h2>Upcoming Deadlines</h2>
                  <Link to="/student/assignments" className="link-small">
                    View all →
                  </Link>
                </div>
                <ul className="list">
                  <li className="list-item">
                    <div>
                      <div className="list-title">DBMS Assignment 2</div>
                      <div className="list-sub">
                        Course: Database Management Systems
                      </div>
                    </div>
                    <div className="badge badge-danger">
                      Due today • 11:59 PM
                    </div>
                  </li>
                  <li className="list-item">
                    <div>
                      <div className="list-title">OS Lab Report</div>
                      <div className="list-sub">
                        Course: Operating Systems Lab
                      </div>
                    </div>
                    <div className="badge badge-warning">Due in 2 days</div>
                  </li>
                  <li className="list-item">
                    <div>
                      <div className="list-title">Mini Project Proposal</div>
                      <div className="list-sub">
                        Course: Software Engineering
                      </div>
                    </div>
                    <div className="badge badge-neutral">Due in 5 days</div>
                  </li>
                </ul>
              </div>

              {/* Recent grades */}
              <div className="card">
                <div className="section-header">
                  <h2>Recent Grades</h2>
                  <Link to="/student/grades" className="link-small">
                    View gradebook →
                  </Link>
                </div>
                <ul className="list">
                  <li className="list-item">
                    <div>
                      <div className="list-title">Algorithms Quiz 3</div>
                      <div className="list-sub">
                        Course: Design & Analysis of Algorithms
                      </div>
                    </div>
                    <div className="grade-chip grade-good">18 / 20</div>
                  </li>
                  <li className="list-item">
                    <div>
                      <div className="list-title">DBMS Midterm</div>
                      <div className="list-sub">
                        Course: Database Management Systems
                      </div>
                    </div>
                    <div className="grade-chip grade-average">72 / 100</div>
                  </li>
                  <li className="list-item">
                    <div>
                      <div className="list-title">OS Lab Internal</div>
                      <div className="list-sub">
                        Course: Operating Systems Lab
                      </div>
                    </div>
                    <div className="grade-chip grade-good">19 / 20</div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right column */}
            <div className="grid-col">
              {/* Today's schedule */}
              <div className="card">
                <div className="section-header">
                  <h2>Today's Schedule</h2>
                  <span className="badge badge-neutral">Chennai Campus</span>
                </div>
                <ul className="timeline">
                  <li className="timeline-item">
                    <div className="timeline-time">09:00 – 10:00</div>
                    <div>
                      <div className="timeline-title">
                        Design & Analysis of Algorithms
                      </div>
                      <div className="timeline-sub">
                        Room C-305 • Prof. Kumar
                      </div>
                    </div>
                  </li>
                  <li className="timeline-item">
                    <div className="timeline-time">11:00 – 12:00</div>
                    <div>
                      <div className="timeline-title">DBMS</div>
                      <div className="timeline-sub">
                        Room C-210 • Prof. Meena
                      </div>
                    </div>
                  </li>
                  <li className="timeline-item">
                    <div className="timeline-time">02:00 – 04:00</div>
                    <div>
                      <div className="timeline-title">OS Lab</div>
                      <div className="timeline-sub">
                        Lab L-108 • Lab In-charge: Naveen
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Announcements */}
              <div className="card">
                <div className="section-header">
                  <h2>Announcements</h2>
                  <button className="link-small" type="button">
                    View all →
                  </button>
                </div>
                <ul className="list">
                  <li className="list-item">
                    <div>
                      <div className="list-title">
                        Midterm Exam Schedule Published
                      </div>
                      <div className="list-sub">
                        Check Examination → Timetable for details.
                      </div>
                    </div>
                    <span className="tag">Academics</span>
                  </li>
                  <li className="list-item">
                    <div>
                      <div className="list-title">
                        Placement Training Registration
                      </div>
                      <div className="list-sub">
                        Last date to register: 25 Feb 2026.
                      </div>
                    </div>
                    <span className="tag">Placement</span>
                  </li>
                  <li className="list-item">
                    <div>
                      <div className="list-title">No Classes on Friday</div>
                      <div className="list-sub">
                        Holiday declared due to college fest.
                      </div>
                    </div>
                    <span className="tag">General</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quick actions */}
          <section className="quick-actions-section">
            <div className="section-header">
              <h2>Quick Actions</h2>
            </div>
            <div className="actions-grid">
              <Link to="/student/assignments" className="action-card">
                <div className="action-icon">📝</div>
                <h3>My Assignments</h3>
                <p>View, upload, and track all assignments</p>
              </Link>
              <Link to="/student/attendance" className="action-card">
                <div className="action-icon">📊</div>
                <h3>Attendance</h3>
                <p>Check subject-wise attendance report</p>
              </Link>
              <Link to="/student/grades" className="action-card">
                <div className="action-icon">📈</div>
                <h3>Grade Report</h3>
                <p>Download detailed marksheets</p>
              </Link>
              <Link to="/student/support" className="action-card">
                <div className="action-icon">💬</div>
                <h3>Help & Support</h3>
                <p>Raise queries to department / admin</p>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;
