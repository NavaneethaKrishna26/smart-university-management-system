import React, { useState, useEffect } from "react";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom"; // ✅ Added NavLink import
import { useAuth } from "../context/AuthContext";

function AssignmentUploadPage() {
  const { assignmentId } = useParams();
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [courseId, setCourseId] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const studentName = user?.fullName || "John Doe";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseId || !file) {
      setError("Please fill all fields and select a file");
      return;
    }
    setUploading(true);
    setError("");
    setTimeout(() => {
      setSuccessMsg("✅ Assignment submitted successfully!");
      setUploading(false);
      setTimeout(() => navigate("/student/dashboard"), 2000);
    }, 2000);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError("");
    }
  };

  return (
    <div className="layout">
      {/* ✅ SIDEBAR with NavLink (active states work!) */}
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

      <div className="main">
        <header className="topbar">
          <div>
            <h1 className="topbar-title">Upload Assignment</h1>
            <p className="topbar-subtitle">
              Assignment ID: <strong>{assignmentId}</strong>
            </p>
          </div>
          <div className="topbar-right">
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
          <section className="grid-2col">
            {/* Left: Upload Form */}
            <div className="grid-col">
              <div className="card">
                <div className="section-header">
                  <h2>📤 Submit Assignment</h2>
                  <span className="badge badge-neutral">
                    Max 10MB • PDF/DOC/DOCX
                  </span>
                </div>

                {error && (
                  <div
                    className="alert alert-danger"
                    style={{
                      padding: "1rem",
                      marginBottom: "1rem",
                      background: "#fee2e2",
                      borderRadius: "8px",
                      borderLeft: "4px solid #dc2626",
                    }}
                  >
                    {error}
                  </div>
                )}
                {successMsg && (
                  <div
                    className="alert alert-success"
                    style={{
                      padding: "1rem",
                      marginBottom: "1rem",
                      background: "#d1fae5",
                      borderRadius: "8px",
                      borderLeft: "4px solid #10b981",
                    }}
                  >
                    {successMsg}
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        fontWeight: "600",
                        marginBottom: "0.5rem",
                        color: "#374151",
                      }}
                    >
                      Course ID *
                    </label>
                    <input
                      type="text"
                      value={courseId}
                      onChange={(e) => setCourseId(e.target.value)}
                      placeholder="e.g., CS345-DBMS"
                      style={{
                        padding: "12px 16px",
                        border: "2px solid #e2e8f0",
                        borderRadius: "12px",
                        fontSize: "1rem",
                        transition: "all 0.2s",
                      }}
                      required
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        fontWeight: "600",
                        marginBottom: "0.5rem",
                        color: "#374151",
                      }}
                    >
                      Assignment File *
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      style={{
                        padding: "12px",
                        border: "2px dashed #cbd5e1",
                        borderRadius: "12px",
                        background: "#f8fafc",
                      }}
                      required
                    />
                    {file && (
                      <div
                        style={{
                          marginTop: "0.75rem",
                          padding: "0.75rem",
                          background: "#f0fdf4",
                          borderRadius: "8px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span>✅ {file.name}</span>
                        <span style={{ color: "#059669", fontWeight: "500" }}>
                          {(file.size / 1024).toFixed(1)} KB
                        </span>
                      </div>
                    )}
                  </div>

                  <div
                    style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}
                  >
                    <Link
                      to="/student/dashboard"
                      style={{
                        padding: "12px 24px",
                        border: "2px solid #64748b",
                        borderRadius: "12px",
                        color: "#64748b",
                        textDecoration: "none",
                        fontWeight: "600",
                        transition: "all 0.2s",
                      }}
                    >
                      ← Back to Dashboard
                    </Link>
                    <button
                      type="submit"
                      style={{
                        flex: 1,
                        padding: "12px 24px",
                        background: "linear-gradient(135deg, #2563eb, #1e40af)",
                        color: "white",
                        border: "none",
                        borderRadius: "12px",
                        fontWeight: "600",
                        cursor: uploading ? "not-allowed" : "pointer",
                        opacity: uploading ? 0.7 : 1,
                      }}
                      disabled={uploading}
                    >
                      {uploading ? "⏳ Uploading..." : "🚀 Submit Assignment"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right: Info */}
            <div className="grid-col">
              <div className="card" style={{ padding: "2rem" }}>
                <h3
                  style={{
                    marginBottom: "1.5rem",
                    color: "#1e293b",
                    fontSize: "1.25rem",
                  }}
                >
                  📋 Assignment Details
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ color: "#64748b", fontWeight: "500" }}>
                      Title:
                    </span>
                    <span>
                      Database Normalization (Assignment #{assignmentId})
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ color: "#64748b", fontWeight: "500" }}>
                      Course:
                    </span>
                    <span>Database Management Systems</span>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ color: "#64748b", fontWeight: "500" }}>
                      Due Date:
                    </span>
                    <span style={{ color: "#dc2626", fontWeight: "600" }}>
                      Feb 20, 2026 • 11:59 PM
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ color: "#64748b", fontWeight: "500" }}>
                      Max Marks:
                    </span>
                    <span style={{ fontWeight: "700", color: "#1e293b" }}>
                      20
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ color: "#64748b", fontWeight: "500" }}>
                      Instructor:
                    </span>
                    <span>Prof. Meena R.</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AssignmentUploadPage;
