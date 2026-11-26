import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StickyBookingBar from './components/StickyBookingBar';
import ExperienceSection from './components/ExperienceSection';
import RideSelector from './components/RideSelector';
import Gallery from './components/Gallery';
import BookingWidget from './components/BookingWidget';
import WhyChooseUs from './components/WhyChooseUs';
import HowBookingWorks from './components/HowBookingWorks';
import WhatIsIncluded from './components/WhatIsIncluded';
import SeoTextSection from './components/SeoTextSection';
import RelatedPagesSection from './components/RelatedPagesSection';
import FaqAccordion from './components/FaqAccordion';
import Footer from './components/Footer';

// Supporting Pages
import PricePage from './pages/PricePage';
import TimingsPage from './pages/TimingsPage';
import SunsetRidePage from './pages/SunsetRidePage';
import RoutePage from './pages/RoutePage';
import FromKochiPage from './pages/FromKochiPage';
import ShikaraVsHouseboatPage from './pages/ShikaraVsHouseboatPage';
import PolicyPages from './pages/PolicyPages';
import RideDetailPage from './pages/RideDetailPage';

import { shikaraConfig } from './config/shikaraConfig';
import { fetchContent, FALLBACK_CONTENT } from './api';

export default function App() {
  const [content, setContent] = useState(FALLBACK_CONTENT);
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [selectedDuration, setSelectedDuration] = useState(3); // 3h default

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchContent();
        if (data) setContent(data);
      } catch (err) {
        console.error('Failed to load content:', err);
      }
    }
    loadData();
  }, []);

  // Listen for browser back / forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const selectedRide = shikaraConfig.rides.find(r => r.durationHours === selectedDuration) || shikaraConfig.rides[1];

  const handleScrollToBooking = () => {
    if (currentPath !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector('#booking-widget');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.querySelector('#booking-widget');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Render supporting page if matched
  const renderPage = () => {
    switch (currentPath) {
      case '/shikara-ride-price':
        return <PricePage onNavigate={navigate} />;
      case '/shikara-ride-timings':
        return <TimingsPage onNavigate={navigate} />;
      case '/sunset-shikara-ride':
        return <SunsetRidePage onNavigate={navigate} />;
      case '/shikara-routes':
        return <RoutePage onNavigate={navigate} />;
      case '/shikara-ride-from-kochi':
        return <FromKochiPage onNavigate={navigate} />;
      case '/shikara-vs-houseboat':
        return <ShikaraVsHouseboatPage onNavigate={navigate} />;
      case '/booking-policy':
        return <PolicyPages type="booking-policy" onNavigate={navigate} />;
      case '/refund-policy':
        return <PolicyPages type="refund-policy" onNavigate={navigate} />;
      case '/privacy-policy':
        return <PolicyPages type="privacy-policy" onNavigate={navigate} />;
      case '/terms':
        return <PolicyPages type="terms" onNavigate={navigate} />;
      case '/contact':
        return <PolicyPages type="contact" onNavigate={navigate} />;
      case '/shikara-ride-2-hours':
        return <RideDetailPage initialDuration={2} onNavigate={navigate} />;
      case '/shikara-ride-3-hours':
        return <RideDetailPage initialDuration={3} onNavigate={navigate} />;
      case '/shikara-ride-4-hours':
        return <RideDetailPage initialDuration={4} onNavigate={navigate} />;
      case '/shikara-ride-details':
        return <RideDetailPage initialDuration={selectedDuration} onNavigate={navigate} />;
      default:
        // Main Single Page
        return (
          <main className="flex-grow">
            {/* a & b. Hero Section with clear H1 & one-line description */}
            <Hero hero={content?.hero} />

            {/* e & f. Ride Selector ("Select Your Ride Duration") */}
            <RideSelector onNavigate={navigate} onSelectDuration={(d) => setSelectedDuration(d)} />

            {/* Photo Gallery Section placed right under Ride section */}
            <Gallery gallery={content?.gallery} />

            {/* d. Experience Section ("What is a Shikara & What Will You See?") placed under Ride & Gallery */}
            <ExperienceSection />

            {/* Interactive Booking Widget / Calculator */}
            <section className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
              <BookingWidget 
                selectedDuration={selectedDuration} 
                onDurationChange={(d) => setSelectedDuration(d)} 
              />
            </section>

            {/* g. Why Choose Us (3 Points) */}
            <WhyChooseUs />

            {/* h. How Booking Works (4 Steps) */}
            <HowBookingWorks onBookNowClick={handleScrollToBooking} />

            {/* i. What is Included List */}
            <WhatIsIncluded />

            {/* j. Helpful SEO Text Section */}
            <SeoTextSection onNavigate={navigate} />

            {/* k. Related Pages Links Section */}
            <RelatedPagesSection onNavigate={navigate} />

            {/* l. FAQ Accordion */}
            <FaqAccordion />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-sand-50 text-slate-800 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* a. Header with Call & WhatsApp buttons */}
      <Navbar onNavigate={navigate} currentPath={currentPath} />

      {/* Dynamic Page Render */}
      <div className="flex-grow flex flex-col">
        {renderPage()}
      </div>

      {/* c. Sticky Booking Bar with Mascot Offer - ONLY on Home Page */}
      {currentPath === '/' && (
        <StickyBookingBar 
          selectedRide={selectedRide} 
          onOpenBookingWidget={handleScrollToBooking}
          onNavigate={navigate}
        />
      )}

      {/* m. Footer with Contact & Policies */}
      <Footer onNavigate={navigate} />

    </div>
  );
}
