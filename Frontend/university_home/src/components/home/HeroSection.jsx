import React from 'react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Smart University Portal</h1>
        <p>
          Centralized platform for students and faculty to manage attendance and assignments efficiently.
        </p>
        <div className="hero-actions">
          <Link to="/login?role=STUDENT" className="btn btn-primary">
            Student Portal
          </Link>
          <Link to="/login?role=FACULTY" className="btn btn-outline">
            Faculty Portal
          </Link>
        </div>
      </div>
      <div className="hero-side">
        <p>Track attendance, submit assignments, and receive AI-powered feedback in one modern interface.</p>
      </div>
    </section>
  );
}

export default HeroSection;
