import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../../services/publicService';
import Loader from '../ui/Loader';
import ErrorAlert from '../ui/ErrorAlert';

function EventsSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await fetchEvents(); // GET /api/public/events[file:2]
        if (mounted) setEvents(data || []);
      } catch (e) {
        if (mounted) setError('Failed to load events');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="section">
      <h2>Upcoming Events & News</h2>
      {loading && <Loader />}
      <ErrorAlert message={error} />
      <div className="cards-grid">
        {events.map((ev) => (
          <article key={ev.id} className="card">
            <h3>{ev.title}</h3>
            <p>{ev.description}</p>
            <p className="card-meta">
              Event Date: <strong>{ev.eventDate}</strong>
            </p>
          </article>
        ))}
        {!loading && !error && events.length === 0 && (
          <p className="muted">No events available right now.</p>
        )}
      </div>
    </section>
  );
}

export default EventsSection;
