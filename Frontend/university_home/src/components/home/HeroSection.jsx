import React from "react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to Smart University Management System</h1>
        <p>
          A modern digital ecosystem designed to streamline academic workflows,
          enhance collaboration, and empower students and faculty with
          intelligent tools.
        </p>

        <div className="hero-actions">
          <Link to="/courses" className="btn btn-primary">
            Explore Courses
          </Link>

          <Link to="/about" className="btn btn-outline">
            Learn More
          </Link>
        </div>

        <div className="hero-stats">
          <div>
            <h3>10K+</h3>
            <p>Students Enrolled</p>
          </div>
          <div>
            <h3>500+</h3>
            <p>Faculty Members</p>
          </div>
          <div>
            <h3>120+</h3>
            <p>Courses Offered</p>
          </div>
        </div>
      </div>

      <div className="hero-side">
        <h3>Why Choose Our Portal?</h3>
        <ul>
          <li>✔ Real-time attendance tracking</li>
          <li>✔ Seamless assignment submissions</li>
          <li>✔ AI-powered feedback system</li>
          <li>✔ Secure role-based access</li>
        </ul>
      </div>
    </section>
  );
}

export default HeroSection;
