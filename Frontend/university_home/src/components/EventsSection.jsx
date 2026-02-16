import { useEffect, useState } from "react";
import { fetchEvents } from "../services/publicService";

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  const loadEvents = async () => {
    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch {
      setError("Unable to load events.");
    } finally {
      setLoading(false);
    }
  };
    useEffect(() => {
    loadEvents();
  }, []);

  return (
    <section className="events">
      <h2>Upcoming Events</h2>

      {loading && <p>Loading events...</p>}
      {error && <p className="error">{error}</p>}

      <div className="event-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <span>{event.eventDate}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsSection;
