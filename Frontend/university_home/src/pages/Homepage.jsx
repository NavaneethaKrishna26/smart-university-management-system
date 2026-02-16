import React from 'react';
import HeroSection from '../components/home/HeroSection';
import EventsSection from '../components/home/EventsSection';

function HomePage() {
  return (
    <div className="page">
      <HeroSection />
      <EventsSection />
    </div>
  );
}

export default HomePage;
