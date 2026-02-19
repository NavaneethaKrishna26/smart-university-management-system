import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function AttendancePage() {
  const { token, user } = useAuth();
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSemester, setSelectedSemester] = useState("2026-Spring");
  const [error, setError] = useState("");

  const studentName = user?.fullName || "John Doe";

  useEffect(() => {
    fetchAttendanceData();
  }, [selectedSemester]);

  const fetchAttendanceData = async () => {
    setLoading(true);
    setError("");

    try {
      /*
      const response = await axios.get(
        `/api/students/${user.id}/attendance?semester=${selectedSemester}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAttendanceData(response.data);
      */

      setAttendanceData([
        {
          courseCode: "CS345",
          courseName: "Database Management Systems",
          instructor: "Prof. Meena R.",
          totalClasses: 45,
          attended: 38,
        },
        {
          courseCode: "CS346",
          courseName: "Operating Systems",
          instructor: "Prof. Kumar S.",
          totalClasses: 42,
          attended: 35,
        },
        {
          courseCode: "CS347",
          courseName: "Algorithms",
          instructor: "Prof. Priya N.",
          totalClasses: 40,
          attended: 28,
        },
        {
          courseCode: "MA301",
          courseName: "Discrete Mathematics",
          instructor: "Prof. Rajesh K.",
          totalClasses: 48,
          attended: 32,
        },
      ]);
    } catch {
      setError("Failed to fetch attendance data");
    } finally {
      setLoading(false);
    }
  };

  const calculatePercentage = (attended, total) =>
    ((attended / total) * 100).toFixed(1);

  const getStatus = (percentage) => {
    if (percentage >= 90) return "Excellent";
    if (percentage >= 80) return "Good";
    if (percentage >= 75) return "Average";
    return "Low";
  };

  const getStatusClass = (percentage) => {
    if (percentage >= 90) return "badge-success";
    if (percentage >= 80) return "badge-primary";
    if (percentage >= 75) return "badge-warning";
    return "badge-danger";
  };

  const overallAttendance =
    attendanceData.length > 0
      ? (
          (attendanceData.reduce(
            (sum, c) => sum + c.attended / c.totalClasses,
            0,
          ) /
            attendanceData.length) *
          100
        ).toFixed(1)
      : 0;

  if (loading) {
    return <div className="page-center">Loading attendance...</div>;
  }

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-mark">🎓</span>
          <span className="logo-text">Campus Portal</span>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/student/" className="nav-item">
            📊 Dashboard
          </NavLink>

          <NavLink to="/student/assignments" className="nav-item">
            📝 Assignments
          </NavLink>

          <NavLink
            to="/student/attendance"
            className={({ isActive }) =>
              isActive ? "nav-item nav-item-active" : "nav-item"
            }
          >
            📅 Attendance
          </NavLink>

          <NavLink to="/student/grades" className="nav-item">
            📈 Grades
          </NavLink>

          <NavLink to="/student/courses" className="nav-item">
            📚 Courses
          </NavLink>

          <NavLink to="/student/profile" className="nav-item">
            👤 Profile
          </NavLink>

          <NavLink to="/logout" className="nav-item">
            🚪 Logout
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main">
        <header className="topbar">
          <h1 className="topbar-title">Attendance Overview</h1>
        </header>

        <main className="content">
          {/* Header Section */}
          <div className="section-header">
            <div>
              <h2>Attendance Summary</h2>
              <p className="muted">
                Student: {studentName} • Semester: {selectedSemester}
              </p>
            </div>

            <select
              className="form-input semester-select"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <option value="2026-Spring">2026 - Spring</option>
              <option value="2025-Fall">2025 - Fall</option>
            </select>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          {/* Overall Card */}
          <div className="stat-card attendance-summary">
            <div className="stat-label">Overall Attendance</div>
            <div className="stat-number">{overallAttendance}%</div>
            <div className="stat-sub">Minimum Required: 75%</div>
          </div>

          {/* Table */}
          <div className="card">
            <table className="table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Instructor</th>
                  <th>Attended</th>
                  <th>Total</th>
                  <th>Percentage</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((course, index) => {
                  const percentage = calculatePercentage(
                    course.attended,
                    course.totalClasses,
                  );
                  const status = getStatus(percentage);

                  return (
                    <tr key={index}>
                      <td>
                        <strong>{course.courseCode}</strong>
                        <div className="muted">{course.courseName}</div>
                      </td>
                      <td>{course.instructor}</td>
                      <td>{course.attended}</td>
                      <td>{course.totalClasses}</td>
                      <td>{percentage}%</td>
                      <td>
                        <span className={`badge ${getStatusClass(percentage)}`}>
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Note */}
          <div className="card attendance-note">
            <h3>Important Note</h3>
            <p>
              Students must maintain at least <strong>75% attendance</strong> in
              every course to be eligible for semester examinations.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AttendancePage;
