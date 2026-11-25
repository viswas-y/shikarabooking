import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, MapPin, Check, Phone, ShieldCheck, Star, Users, Calendar, Sparkles, ArrowRight, Zap, Car, Accessibility, Compass, Maximize2, X, Coffee, Utensils, ChevronLeft, ChevronRight } from 'lucide-react';
import { shikaraConfig, calculateRidePrice } from '../config/shikaraConfig';

export default function RideDetailPage({ initialDuration = 3, onNavigate }) {
  const [duration, setDuration] = useState(initialDuration);
  const todayStr = new Date().toISOString().split('T')[0];
  const [cruiseDate, setCruiseDate] = useState(todayStr);
  const [selectedTimeId, setSelectedTimeId] = useState('sunset'); // Sunset 3:30 PM default
  const [guestCount, setGuestCount] = useState(2);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  // Sync if prop changes
  useEffect(() => {
    setDuration(initialDuration);
    setPhotoIndex(0);
  }, [initialDuration]);

  // Scroll to top & reset photo on duration switch
  useEffect(() => {
    window.scrollTo(0, 0);
    setPhotoIndex(0);
  }, [duration]);

  const ride = shikaraConfig.rides.find((r) => r.durationHours === duration) || shikaraConfig.rides[1];
  const calculation = calculateRidePrice(duration, guestCount);
  const selectedTime = shikaraConfig.timeSlots.find(t => t.id === selectedTimeId) || shikaraConfig.timeSlots[3];

  const photos = ride.boatPhotos && ride.boatPhotos.length > 0
    ? ride.boatPhotos
    : [{ url: ride.imageUrl, title: ride.boatName || ride.name, caption: ride.highlight }];
  const currentPhoto = photos[photoIndex] || photos[0];

  const handleNextPhoto = (e) => {
    if (e) e.stopPropagation();
    setPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrevPhoto = (e) => {
    if (e) e.stopPropagation();
    setPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleDurationSwitch = (newDuration) => {
    setDuration(newDuration);
    window.history.replaceState({}, '', `/shikara-ride-${newDuration}-hours`);
  };

  const whatsappUrl = `https://wa.me/${shikaraConfig.whatsappNumber}?text=${encodeURIComponent(
    `*Private Shikara Booking Request - Alleppey*\n` +
    `• *Ride:* ${ride.durationLabel} (${ride.name})\n` +
    `• *Date:* ${cruiseDate}\n` +
    `• *Time Slot:* ${selectedTime.label}\n` +
    `• *Guests:* ${guestCount} persons\n` +
    `• *Total Boat Fare:* ₹${calculation.totalPrice.toLocaleString('en-IN')}\n` +
    `• *Advance to Hold:* ₹${calculation.advanceAmount.toLocaleString('en-IN')}\n` +
    `• *Balance at Jetty:* ₹${calculation.balanceAtJetty.toLocaleString('en-IN')}\n\n` +
    `Please confirm boat availability for this slot. Thank you!`
  )}`;

  return (
    <div className="pt-24 sm:pt-32 pb-24 px-3 sm:px-6 lg:px-8 max-w-5xl mx-auto text-slate-900">
      
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#163b2f] hover:text-emerald-700 transition-colors group bg-white px-3.5 sm:px-4 py-2 rounded-full border border-slate-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Rides</span>
        </button>

        <div className="text-xs text-slate-400 font-medium">
          <span>Home</span>
          <span className="mx-1.5">•</span>
          <span>Shikara Rides</span>
          <span className="mx-1.5">•</span>
          <span className="text-slate-800 font-bold">{ride.durationLabel} Cruise</span>
        </div>
      </div>

      {/* Duration Switcher Tabs */}
      <div className="bg-slate-100 p-1.5 rounded-2xl sm:rounded-full flex items-center justify-between gap-1 mb-6 max-w-xl mx-auto border border-slate-200/80">
        {shikaraConfig.rides.map((r) => {
          const isActive = r.durationHours === duration;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => handleDurationSwitch(r.durationHours)}
              className={`flex-1 py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-xl sm:rounded-full text-xs font-bold transition-all text-center ${
                isActive
                  ? 'bg-white text-slate-900 shadow-md scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{r.durationLabel}</span>
              <span className="hidden sm:inline text-[11px] text-slate-400 font-normal ml-1">
                (₹{r.basePrice.toLocaleString('en-IN')})
              </span>
              {r.isPopular && (
                <span className="hidden md:inline-block ml-1.5 text-[9px] uppercase tracking-wider bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.2 rounded-md">
                  Popular
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          1. SINGLE COMPACT PHOTO VIEWER (Takes minimal space, in-frame controls)
          ========================================================================= */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 aspect-[16/10] sm:aspect-[21/9] max-h-[420px] shadow-card border border-slate-200/90 mb-5 group select-none">
        
        {/* Main Photo */}
        <img
          src={currentPhoto.url}
          alt={currentPhoto.title || ride.name}
          className="w-full h-full object-cover transition-all duration-300 cursor-pointer"
          onClick={() => setLightboxPhoto(currentPhoto)}
        />

        {/* Prev & Next In-Frame Arrows (Only if more than 1 photo) */}
        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevPhoto}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/55 hover:bg-black/85 backdrop-blur-md text-white flex items-center justify-center transition-all shadow-md z-10"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNextPhoto}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/55 hover:bg-black/85 backdrop-blur-md text-white flex items-center justify-center transition-all shadow-md z-10"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Top-Right Enlarge Button */}
        <button
          type="button"
          onClick={() => setLightboxPhoto(currentPhoto)}
          className="absolute top-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md text-white flex items-center justify-center transition-all shadow-md z-10"
          title="Tap to enlarge"
          aria-label="Enlarge photo"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        {/* Bottom-Left Boat Name & Caption Badge */}
        <div className="absolute bottom-2.5 left-2.5 max-w-[65%] px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-white text-[11px] font-bold border border-white/20 flex items-center gap-1.5 shadow-md truncate z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse" />
          <span className="truncate">{ride.boatName || ride.name}</span>
          {currentPhoto.title && currentPhoto.title !== ride.boatName && (
            <span className="hidden sm:inline text-slate-300 font-normal truncate">• {currentPhoto.title}</span>
          )}
        </div>

        {/* Bottom-Right In-Frame Dots Indicator & Counter */}
        {photos.length > 1 && (
          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/20 z-10">
            {photos.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPhotoIndex(idx);
                }}
                className={`rounded-full transition-all ${
                  photoIndex === idx
                    ? 'w-3.5 h-1.5 bg-amber-400'
                    : 'w-1.5 h-1.5 bg-white/50 hover:bg-white'
                }`}
                aria-label={`Go to photo ${idx + 1}`}
              />
            ))}
            <span className="text-[10px] font-bold text-white pl-1 border-l border-white/25">
              {photoIndex + 1}/{photos.length}
            </span>
          </div>
        )}

      </div>

      {/* =========================================================================
          2. RIDE NAME & DETAILS CARD (Cleanly placed below the image)
          ========================================================================= */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-card border border-slate-200/90 mb-6">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-[#163b2f] text-white text-xs font-bold">
            {ride.durationLabel} Private Cruise
          </span>
          {ride.boatName && (
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-xs font-bold">
              ⛵ {ride.boatName}
            </span>
          )}
          {ride.isPopular && (
            <span className="text-xs uppercase font-bold tracking-wider text-amber-800 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Most Popular Choice</span>
            </span>
          )}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{ride.rating}</span>
            <span className="text-slate-500 font-normal">({ride.reviewsCount} reviews)</span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-2xl sm:text-4xl font-bold font-sans text-slate-900 tracking-tight leading-tight">
          {ride.name}
        </h1>

        {/* Description / Highlight */}
        <p className="text-xs sm:text-sm text-slate-600 font-normal mt-2 leading-relaxed max-w-3xl">
          {ride.highlight}
        </p>

        {/* Quick Stats Pill Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5 pt-5 border-t border-slate-100">
          <div className="bg-slate-50 border border-slate-200/80 px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#163b2f] flex-shrink-0" />
            <span className="truncate">{ride.durationLabel} Duration</span>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
            <span className="truncate">13 Route Stops</span>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-[#163b2f] flex-shrink-0" />
            <span className="truncate">Up to 6 Guests</span>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span className="truncate">100% Private Boat</span>
          </div>
        </div>

      </div>

      {/* =========================================================================
          MAIN TWO-COLUMN GRID:
          - On mobile: order-1 (Price & Booking) comes FIRST!
          - On mobile: order-2 (Route 13 Stops Itinerary) comes directly BELOW the price!
          - On desktop: Route is on the left (7 cols), Price is on the right (5 cols)
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-12">
        
        {/* =====================================================================
            RIGHT COLUMN: Price & Interactive Booking Card
            On mobile, this has order-1 (appears right under the photo/details!)
            ===================================================================== */}
        <div className="order-1 lg:order-2 lg:col-span-5 space-y-6">
          
          {/* Price & Interactive Booking Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-card border-2 border-[#163b2f]/20">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
              TOTAL FARE FOR ENTIRE BOAT
            </span>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl sm:text-5xl font-extrabold text-[#163b2f] font-sans">
                ₹{calculation.totalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-500 font-semibold uppercase">
                / private boat
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Covers up to 6 guests included • ₹1,000 advance to hold the boat
            </p>

            {/* Interactive Booking Selectors: Date, Time & Guests */}
            <div className="space-y-4 pt-4 border-t border-slate-100 mb-5">
              
              {/* 1. Date Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#163b2f]" />
                  <span>Choose Cruise Date</span>
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={cruiseDate}
                  onChange={(e) => setCruiseDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#163b2f] transition-all cursor-pointer"
                />
              </div>

              {/* 2. Start Time Slot Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#163b2f]" />
                  <span>Departure Time Slot</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {shikaraConfig.timeSlots.map((slot) => {
                    const isSelected = selectedTimeId === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setSelectedTimeId(slot.id)}
                        className={`p-2.5 rounded-xl text-left border transition-all text-xs ${
                          isSelected
                            ? 'border-[#163b2f] bg-[#163b2f]/5 text-[#163b2f] font-bold shadow-xs'
                            : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <span className="block font-bold">{slot.time}</span>
                        <span className="block text-[10px] text-slate-500 font-normal">{slot.tag}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Number of Guests */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#163b2f]" />
                  <span>Number of Guests</span>
                </label>
                <div className="flex items-center gap-2">
                  {[2, 4, 6, 8].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setGuestCount(count)}
                      className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                        guestCount === count
                          ? 'border-[#163b2f] bg-[#163b2f] text-white shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {count} Guests
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Price Split & Advance Summary */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 mb-5">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5">
                <span>Per Person Cost ({guestCount} guests):</span>
                <strong className="text-slate-900 font-bold">₹{calculation.perPersonActual} / person</strong>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600 pt-1.5 border-t border-slate-200/80">
                <span>Advance to hold now:</span>
                <strong className="text-emerald-700 font-bold">₹1,000</strong>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                <span>Balance payable at jetty:</span>
                <strong className="text-slate-900 font-bold">₹{calculation.balanceAtJetty}</strong>
              </div>
            </div>

            {/* Conversion Action Buttons */}
            <div className="space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 sm:py-4 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-base shadow-lg shadow-emerald-950/20 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.41a8.16 8.16 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.81-.37-4.04-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.15 8.15 0 0 1-1.25-4.47c0-4.54 3.7-8.25 8.24-8.25zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.41 1.01 2.58c.13.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.59.21-1.09.15-1.19-.06-.1-.23-.17-.48-.29z" />
                </svg>
                <span>Book {ride.durationLabel} Ride on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`tel:${shikaraConfig.phoneNumberClean}`}
                className="w-full py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-[#163b2f]" />
                <span>Call Captain {shikaraConfig.phoneFormatted}</span>
              </a>
            </div>

            <p className="text-center text-[11px] text-amber-800 font-medium mt-3 flex items-center justify-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>Sunset &amp; weekend slots sell out fast. ₹1,000 holds the boat.</span>
            </p>
          </div>

          {/* Daily Departure Times */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-card border border-slate-200/90">
            <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider mb-3 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#163b2f]" />
              <span>Available Daily Departure Times</span>
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              {shikaraConfig.timeSlots.map((slot) => (
                <div key={slot.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="block font-bold text-xs text-slate-900">
                    {slot.label}
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-0.5 leading-tight">
                    {slot.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* What is Included Checklist */}
          <div className="bg-emerald-50/70 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-emerald-200/80 text-xs text-emerald-950 shadow-card">
            <span className="font-bold uppercase tracking-wider text-emerald-900 block mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Included in Your Cruise:</span>
            </span>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>100% Private wooden boat (no strangers)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Licensed native captain &amp; guide</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Boat fuel &amp; backwater entry permits</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Approved marine life jackets (adult &amp; kids)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* =====================================================================
            LEFT COLUMN: Route Stops Timeline (13 Stops)
            On mobile, this has order-2 (appears directly below the price!)
            ===================================================================== */}
        <div className="order-2 lg:order-1 lg:col-span-7 space-y-6">
          
          {/* Route Section */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-card border border-slate-200/90">
            
            {/* Header: "CANAL ITINERARY" / "Route" with "13 stops" */}
            <div className="flex items-center justify-between mb-4 pb-3 sm:pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 block">
                  CANAL ITINERARY
                </span>
                <h2 className="text-xl sm:text-3xl font-bold font-sans text-slate-900 mt-0.5">
                  Route
                </h2>
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-[#163b2f] bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full">
                13 stops
              </span>
            </div>

            {/* Key Information Badges Box (Clean and perfectly styled for mobile) */}
            <div className="space-y-2 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="w-2 h-2 rounded-full bg-[#163b2f] flex-shrink-0" />
                  <span className="font-semibold text-slate-800">Private boat · the price covers up to 6 guests</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                  <span className="font-semibold text-slate-800">Departs from Punnamada Finishing Point</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 sm:col-span-2">
                  <Check className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                  <span className="font-semibold text-emerald-900">Included: captain, fuel, life jackets</span>
                </div>
              </div>

              {/* On Request Food Card */}
              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                <Utensils className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong>On request:</strong> Tea &amp; snacks · Kerala lunch · Toddy shop (karimeen, kappa, duck roast). Food paid at the stop.
                </span>
              </div>
            </div>

            {/* 13 Stops Vertical Timeline (Modern, clean, mobile-perfect) */}
            <div className="border-l-2 border-emerald-300 ml-3.5 sm:ml-4 pl-4 sm:pl-6 space-y-3.5">
              {shikaraConfig.masterRouteStops.map((stop, idx) => {
                const stopNum = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;
                return (
                  <div key={idx} className="relative group">
                    {/* Circle Stop Number on the Timeline */}
                    <div className="absolute -left-[27px] sm:-left-[35px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#163b2f] text-white flex items-center justify-center text-[10px] sm:text-[11px] font-bold shadow-xs">
                      {stopNum}
                    </div>

                    {/* Stop Details Card */}
                    <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/40 border border-slate-200/80 transition-colors">
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                        Stop {stopNum}
                      </span>
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 mt-0.5">
                        {stop.title}
                      </h3>
                      {stop.desc && (
                        <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">
                          {stop.desc}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Boarding Point & Useful Info */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-card border border-slate-200/90">
            <h3 className="text-lg sm:text-xl font-bold font-sans text-slate-900 mb-2.5 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-700" />
              <span>Boarding Location &amp; How to Reach</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              All BookShikara private rides depart from <strong>{shikaraConfig.boardingJetty}</strong>. It is located 3.5 km from the Alappuzha KSRTC Bus Stand and 6 km from Alappuzha Railway Station. Auto-rickshaws, taxis, and ride apps reach the jetty easily. Our captain will meet you right at the boat stand.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-[#163b2f]">
              <span className="inline-flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
                <Compass className="w-3.5 h-3.5 text-emerald-700" />
                <span>Landmark: Nehru Trophy Finishing Point</span>
              </span>
              <span className="inline-flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
                <Car className="w-3.5 h-3.5 text-emerald-700" />
                <span>Car &amp; Bus Parking Available</span>
              </span>
              <span className="inline-flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
                <Accessibility className="w-3.5 h-3.5 text-emerald-700" />
                <span>Step-free Jetty Boarding</span>
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Back Button */}
      <div className="text-center pt-6 border-t border-slate-200">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#163b2f] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage &amp; Explore Other Cruises</span>
        </button>
      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden p-2 sm:p-3 shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/75 text-white hover:bg-black flex items-center justify-center transition-all shadow-lg"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={lightboxPhoto.url}
              alt={lightboxPhoto.title}
              className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
            />
            <div className="p-3 text-white text-center">
              <h4 className="font-bold text-sm sm:text-base">{lightboxPhoto.title}</h4>
              <p className="text-xs text-slate-300 mt-0.5">{lightboxPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
