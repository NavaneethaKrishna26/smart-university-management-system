import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchEvents } from '../services/publicService';
import Loader from '../components/ui/Loader';
import ErrorAlert from '../components/ui/ErrorAlert';
import EmptyState from '../components/ui/EmptyState';

function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await fetchEvents();
        setEvents(data || []);
      } catch (e) {
        setError('Failed to load upcoming events');
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  return (
    <div className="page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Smart University Portal</h1>
          <p className="hero-subtitle">
            Centralized platform for seamless attendance tracking, assignment 
            submissions, and instant AI-powered feedback.
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
        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Students</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">500+</div>
            <div className="stat-label">Courses</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">98%</div>
            <div className="stat-label">Satisfaction</div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="section">
        <div className="section-header">
          <h2>Upcoming Events & News</h2>
          <Link to="/events" className="btn btn-ghost">View All</Link>
        </div>
        
        {loading && (
          <div className="skeleton-grid">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
        )}
        
        <ErrorAlert message={error} />
        
        {events.length === 0 && !loading && !error && (
          <EmptyState 
            title="No upcoming events"
            message="Check back later for university updates and events."
          />
        )}
        
        <div className="cards-grid">
          {events.map((event) => (
            <article key={event.id} className="card event-card">
              <div className="event-date">
                {new Date(event.eventDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div className="event-footer">
                <span className="event-time">
                  {new Date(event.eventDate).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
