import React from "react";
import { Link } from "react-router-dom";
import EventsSection from "../components/home/EventsSection";

function Homepage() {
  return (
    <div className="homepage">
      {/* ================= HERO SECTION ================= */}
      <section className="hero">
        <div className="hero-content">
          <h1>Smart University Management System</h1>
          <p>
            A modern platform designed to streamline academic processes, improve
            communication, and enhance student success.
          </p>

          <div className="hero-buttons">
            <Link to="/login" className="btn btn-primary">
              Login to Portal
            </Link>

            <Link to="/courses" className="btn btn-outline">
              Explore Courses
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="section">
        <div className="cards-grid">
          <div className="card">
            <h3>Assignment Management</h3>
            <p>Submit, review, and track assignments with real-time updates.</p>
          </div>

          <div className="card">
            <h3>Attendance Tracking</h3>
            <p>Monitor attendance with automated calculations and reports.</p>
          </div>

          <div className="card">
            <h3>Secure Authentication</h3>
            <p>Role-based access for students, faculty, and administrators.</p>
          </div>

          <div className="card">
            <h3>Event & News Updates</h3>
            <p>Stay informed about campus activities and academic events.</p>
          </div>

          <div className="card">
            <h3>Performance Analytics</h3>
            <p>Visual dashboards to analyze academic performance and trends.</p>
          </div>

          <div className="card">
            <h3>Role-Based Dashboards</h3>
            <p>
              Customized dashboards for students, faculty, and administrators.
            </p>
          </div>
        </div>
      </section>

      {/* ================= STATISTICS SECTION ================= */}
      <section className="section stats-section">
        <div className="section-header">
          <h2>Our Impact in Numbers</h2>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-number">12,500+</div>
            <div className="stat-label">Active Users</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">3,200+</div>
            <div className="stat-label">Assignments Submitted</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">1,800+</div>
            <div className="stat-label">Events Hosted</div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="section testimonials">
        <div className="section-header">
          <h2>What Our Students Say</h2>
        </div>

        <div className="testimonial-scroll">
          <div className="testimonial-track">
            <div className="testimonial-card">
              <p>“The portal made assignment submissions extremely easy.”</p>
              <h4>- Final Year Student</h4>
            </div>

            <div className="testimonial-card">
              <p>“Attendance tracking is very accurate and transparent.”</p>
              <h4>- B.Tech Student</h4>
            </div>

            <div className="testimonial-card">
              <p>“Faculty dashboard simplifies grading process.”</p>
              <h4>- Professor</h4>
            </div>

            <div className="testimonial-card">
              <p>“Real-time notifications helped me never miss deadlines.”</p>
              <h4>- 3rd Year Student</h4>
            </div>

            <div className="testimonial-card">
              <p>“User interface is clean and very easy to use.”</p>
              <h4>- MBA Student</h4>
            </div>

            <div className="testimonial-card">
              <p>“Centralized platform improved academic communication.”</p>
              <h4>- Faculty Member</h4>
            </div>

            <div className="testimonial-card">
              <p>“Secure login system gives confidence in data safety.”</p>
              <h4>- IT Student</h4>
            </div>

            <div className="testimonial-card">
              <p>“Events and announcements are well organized.”</p>
              <h4>- Undergraduate Student</h4>
            </div>
          </div>
        </div>
      </section>

      {/* ================= EVENTS SECTION (Your Existing Component) ================= */}
      <EventsSection />

      {/* ================= CONTACT SECTION ================= */}
      <section className="section contact-section">
        <div className="section-header">
          <h2>Need Assistance?</h2>
        </div>

        <div className="contact-box">
          <p>
            Have questions about admissions, academics, or portal access? Our
            support team is here to help you.
          </p>

          <Link to="/contact" className="btn btn-primary">
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Homepage;
