import React from 'react';
import { Link } from 'react-router-dom';

function FacultyDashboard() {
  return (
    <div className="page">
      <h1>Faculty Dashboard</h1>
      <p className="muted">
        Manage and view attendance for your classes.
      </p>
      <div className="cards-grid">
        <article className="card">
          <h3>Mark Attendance</h3>
          <p>Record attendance for your scheduled classes.</p>
          <Link to="/faculty/attendance" className="btn btn-primary">
            Go to Attendance
          </Link>
        </article>
        <article className="card">
          <h3>Attendance History</h3>
          <p>Review attendance records across date ranges.</p>
          <Link to="/faculty/attendance/history" className="btn btn-outline">
            View History
          </Link>
        </article>
      </div>
    </div>
  );
}

export default FacultyDashboard;
