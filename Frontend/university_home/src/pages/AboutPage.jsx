import React from 'react';

function AboutPage() {
  return (
    <div className="page">
      <div className="hero hero-compact">
        <div>
          <h1>About Smart University</h1>
          <p className="hero-subtitle">
            Transforming education through technology-driven workflows and 
            intelligent automation.
          </p>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Real-time Attendance</h3>
          <p>Faculty mark attendance with one click. Students see their records instantly with detailed analytics.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🤖</div>
          <h3>AI Assignment Grading</h3>
          <p>Instant feedback on content quality, grammar, and originality. Comprehensive scores and improvement suggestions.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📱</div>
          <h3>Mobile First Design</h3>
          <p>Perfectly responsive on phones, tablets, and desktops. Progressive Web App ready for offline use.</p>
        </div>
      </div>

      <section className="section">
        <h2>Our Mission</h2>
        <p className="mission-text">
          To create a seamless educational ecosystem where technology enhances 
          learning without complicating workflows. Every interaction should feel 
          effortless, intuitive, and valuable for both students and faculty.
        </p>
        <div className="cta-section">
          <h3>Ready to experience the future of education?</h3>
          <div className="cta-buttons">
            <a href="/login?role=STUDENT" className="btn btn-primary">Student Portal</a>
            <a href="/login?role=FACULTY" className="btn btn-outline">Faculty Portal</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
