import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/ui/Loader';
import ErrorAlert from '../components/ui/ErrorAlert';

function StudentDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500); // Loading state
  }, []);

  if (loading) {
    return (
      <div className="page page-center">
        <Loader />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="page">
      {/* Clean Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <h1>Student Dashboard</h1>
          <p className="header-subtitle">Manage your assignments and track progress</p>
        </div>
      </div>

      {/* Stats Row - Perfectly aligned */}
      <div className="stats-row">
        <div className="stat-item">
          <div className="stat-number">4</div>
          <div className="stat-label">Total Assignments</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">1</div>
          <div className="stat-label">Due Soon</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">2</div>
          <div className="stat-label">Submitted</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">1</div>
          <div className="stat-label">Graded</div>
        </div>
      </div>

      {/* Quick Actions - Clean grid */}
      <section className="quick-actions-section">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/student/assignments" className="action-card">
            <div className="action-icon">📝</div>
            <h3>My Assignments</h3>
            <p>View, upload, and track all assignments</p>
          </Link>
          <div className="action-card disabled">
            <div className="action-icon">📊</div>
            <h3>Attendance</h3>
            <p>View attendance records</p>
            <span>Coming soon</span>
          </div>
          <div className="action-card disabled">
            <div className="action-icon">📈</div>
            <h3>Grades</h3>
            <p>Track academic performance</p>
            <span>Coming soon</span>
          </div>
        </div>
      </section>

      {/* Recent Assignments */}
      <section className="assignments-section">
        <div className="section-header">
          <h2>Recent Assignments</h2>
          <Link to="/student/assignments" className="btn btn-primary">
            View All
          </Link>
        </div>
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h3>No assignments yet</h3>
          <p>Your assignments will appear here. Check with instructors.</p>
          <Link to="/student/assignments" className="btn btn-primary">
            Browse Assignments
          </Link>
        </div>
      </section>
    </div>
  );
}

export default StudentDashboard;
