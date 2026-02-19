import React, { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";

const initialCourses = [
  {
    id: 1,
    title: "Web Development",
    code: "CS101",
    instructor: "Dr. Smith",
    credits: 3,
    semester: "2026-Spring",
  },
  {
    id: 2,
    title: "Data Structures",
    code: "CS201",
    instructor: "Prof. Johnson",
    credits: 4,
    semester: "2026-Spring",
  },
  {
    id: 3,
    title: "Machine Learning",
    code: "AI301",
    instructor: "Dr. Lee",
    credits: 3,
    semester: "2026-Fall",
  },
  {
    id: 4,
    title: "Operating Systems",
    code: "CS301",
    instructor: "Dr. Kumar",
    credits: 4,
    semester: "2026-Spring",
  },
  {
    id: 5,
    title: "Database Systems",
    code: "CS302",
    instructor: "Dr. Meena",
    credits: 3,
    semester: "2026-Fall",
  },
];

function CoursesPage() {
  const [search, setSearch] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const filteredCourses = useMemo(() => {
    return initialCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.code.toLowerCase().includes(search.toLowerCase());

      const matchesSemester =
        selectedSemester === "All" || course.semester === selectedSemester;

      return matchesSearch && matchesSemester;
    });
  }, [search, selectedSemester]);

  const totalCredits = filteredCourses.reduce((sum, c) => sum + c.credits, 0);

  const handleEnroll = (id) => {
    if (enrolledCourses.includes(id)) {
      setEnrolledCourses(enrolledCourses.filter((courseId) => courseId !== id));
    } else {
      setEnrolledCourses([...enrolledCourses, id]);
    }
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-mark">🎓</span>
          <span className="logo-text">Campus Portal</span>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/student/"
            className={({ isActive }) =>
              isActive ? "nav-item nav-item-active" : "nav-item"
            }
          >
            📊 Dashboard
          </NavLink>
          <NavLink to="/student/assignments" className="nav-item">
            📝 Assignments
          </NavLink>
          <NavLink to="/student/attendance" className="nav-item">
            📅 Attendance
          </NavLink>
          <NavLink to="/student/grades" className="nav-item">
            📈 Grades
          </NavLink>
          <NavLink to="/student/courses" className="nav-item nav-item-active">
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
          <h1 className="topbar-title">All Courses</h1>
        </header>

        <main className="content">
          {/* Summary Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Courses</h3>
              <p>{filteredCourses.length}</p>
            </div>
            <div className="stat-card">
              <h3>Total Credits</h3>
              <p>{totalCredits}</p>
            </div>
            <div className="stat-card">
              <h3>Enrolled</h3>
              <p>{enrolledCourses.length}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="page-header">
            <input
              type="text"
              placeholder="Search courses..."
              className="form-input search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="form-input"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <option value="All">All Semesters</option>
              <option value="2026-Spring">2026-Spring</option>
              <option value="2026-Fall">2026-Fall</option>
            </select>
          </div>

          {/* Course Cards */}
          <div className="cards-grid">
            {filteredCourses.map((course) => (
              <div key={course.id} className="card course-card">
                <div className="course-header">
                  <div className="course-code">{course.code}</div>
                  <div className="course-credits">{course.credits} credits</div>
                </div>

                <h3>{course.title}</h3>

                <div className="course-instructor">👨‍🏫 {course.instructor}</div>

                <div className="course-semester">📅 {course.semester}</div>

                <div className="course-actions">
                  <button className="btn btn-primary">View Details</button>

                  <button
                    className={`btn ${enrolledCourses.includes(course.id) ? "btn-success" : "btn-ghost"}`}
                    onClick={() => handleEnroll(course.id)}
                  >
                    {enrolledCourses.includes(course.id)
                      ? "Enrolled ✓"
                      : "Enroll"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default CoursesPage;
