import React, { useEffect, useState } from "react";
import { fetchEvents } from "../../services/publicService";
import Loader from "../ui/Loader";
import ErrorAlert from "../ui/ErrorAlert";

function EventsSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        if (isMounted) {
          setEvents(Array.isArray(data) ? data : []);
        }
      } catch {
        if (isMounted) {
          setError("Unable to fetch events. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  const formatDate = (date) => {
    if (!date) return "TBA";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="section events-section">
      <div className="section-header">
        <h2>Upcoming Events & Announcements</h2>
        <p className="section-subtitle">
          Stay updated with the latest university activities and important
          dates.
        </p>
      </div>

      {loading && <Loader />}
      {!loading && error && <ErrorAlert message={error} />}

      {!loading && !error && (
        <div className="cards-grid">
          {events.length > 0 ? (
            events.map((ev) => (
              <article key={ev.id} className="card event-card">
                <div className="event-date-badge">
                  {formatDate(ev.eventDate)}
                </div>

                <h3>{ev.title}</h3>
                <p className="event-description">{ev.description}</p>

                <div className="card-footer">
                  <span className="event-tag">University Event</span>
                </div>
              </article>
            ))
          ) : (
            <p className="muted">No upcoming events at the moment.</p>
          )}
        </div>
      )}
    </section>
  );
}

export default EventsSection;
