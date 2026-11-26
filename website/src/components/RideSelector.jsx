import React, { useState, useEffect, useRef } from 'react';
import { Star, ArrowUpRight } from 'lucide-react';
import { shikaraConfig } from '../config/shikaraConfig';

export default function RideSelector({ onSelectDuration, onNavigate }) {
  const rides = shikaraConfig.rides || [];
  
  const [currentIndex, setCurrentIndex] = useState(1); // 3 Hours default (Most Popular)
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Touch handling for mobile swipe
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  // Auto-play interval (every 3.5s when not paused)
  useEffect(() => {
    if (isPaused || isAnimating || rides.length === 0) return;
    const timer = setInterval(() => {
      goToNext();
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, isAnimating, currentIndex, rides.length]);

  const goToNext = () => {
    if (isAnimating || rides.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % rides.length);
    setTimeout(() => setIsAnimating(false), 550);
  };

  const goToPrev = () => {
    if (isAnimating || rides.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? rides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 550);
  };

  const handleCardClick = (ride, isCenter) => {
    if (!isCenter) {
      // If user clicks a peeking side card, bring it to center
      const targetIdx = rides.findIndex((r) => r.id === ride.id);
      if (targetIdx !== -1) setCurrentIndex(targetIdx);
      return;
    }

    if (onSelectDuration) onSelectDuration(ride.durationHours);
    if (onNavigate) {
      onNavigate(`/shikara-ride-${ride.durationHours}-hours`);
    }
  };

  // Touch swipe events for mobile
  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    setIsPaused(false);
    if (!touchStartX.current || !touchStartY.current) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 40) goToNext();
      else if (diffX < -40) goToPrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section 
      id="rides" 
      className="pt-6 sm:pt-8 md:pt-10 pb-2 sm:pb-4 px-3 sm:px-6 lg:px-8 max-w-[1360px] mx-auto scroll-mt-20 select-none overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      
      {/* Short & Clean Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
        <div className="inline-block px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#163b2f] uppercase mb-2">
          CRUISE DURATION
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans leading-tight">
          Choose Your Cruise
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1.5 max-w-md mx-auto leading-relaxed">
          Private Shikara rides from 2 to 4 hours. Tap any card to explore full route stops &amp; booking.
        </p>
      </div>

      {/* Quick Duration Tabs Row */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 overflow-x-auto no-scrollbar py-1 px-2">
        {rides.map((ride, idx) => {
          const isSelected = currentIndex === idx;
          return (
            <button
              key={ride.id}
              type="button"
              onClick={() => {
                if (currentIndex !== idx) {
                  setCurrentIndex(idx);
                  if (onSelectDuration) onSelectDuration(ride.durationHours);
                }
              }}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-[#163b2f] text-white shadow-md scale-105'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/90 shadow-2xs'
              }`}
            >
              <span>{ride.durationLabel}</span>
              {ride.isPopular && (
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full uppercase tracking-wider font-extrabold ${
                  isSelected ? 'bg-amber-400 text-slate-950' : 'bg-amber-100 text-amber-800'
                }`}>
                  Popular
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          STAGE: CENTER-STAGE CAROUSEL WITH LEFT & RIGHT PEEKING CARDS
          Modelled on the user reference card (media_1795661509920_da082ae0.jpg):
          - Full-bleed Shikara boat photo background with rounded corners
          - Top-Left: Duration Title ("2 Hour Ride", "3 Hour Ride", "4 Hour Ride")
          - Below Title: "PRIVATE" / "POPULAR" badge (replacing "BEST RATED")
          - Top-Right: "★ 4.9" Rating badge
          - Bottom: Single white pill button with Rate on left & "Book now ↗" on right
          ========================================================================= */}
      <div 
        className="relative w-full max-w-5xl mx-auto h-[445px] xs:h-[465px] sm:h-[495px] flex items-center justify-center overflow-visible"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {rides.map((ride, idx) => {
          const n = rides.length;
          let diff = (idx - currentIndex + n) % n;
          if (diff > n / 2) diff -= n;

          const isCenter = diff === 0;
          const isLeft = diff === -1;
          const isRight = diff === 1;
          const isVisible = isCenter || isLeft || isRight;

          // Compute transform offsets
          let transform = '';
          let opacity = 0;
          let zIndex = 0;
          let filter = 'none';

          if (isCenter) {
            transform = 'translate3d(0%, 0, 0) scale(1)';
            opacity = 1;
            zIndex = 20;
          } else if (isLeft) {
            transform = 'translate3d(-76%, 0, 0) scale(0.86)';
            opacity = 0.45;
            zIndex = 10;
            filter = 'brightness(0.9)';
          } else if (isRight) {
            transform = 'translate3d(76%, 0, 0) scale(0.86)';
            opacity = 0.45;
            zIndex = 10;
            filter = 'brightness(0.9)';
          } else {
            transform = diff > 1 
              ? 'translate3d(140%, 0, 0) scale(0.7)' 
              : 'translate3d(-140%, 0, 0) scale(0.7)';
            opacity = 0;
            zIndex = 0;
          }

          if (!isVisible && opacity === 0) {
            return null;
          }

          return (
            <div
              key={ride.id}
              onClick={() => handleCardClick(ride, isCenter)}
              style={{
                transform: transform,
                opacity: opacity,
                zIndex: zIndex,
                filter: filter,
                transition: 'transform 550ms cubic-bezier(0.25, 1, 0.5, 1), opacity 550ms ease, filter 550ms ease',
              }}
              className={`absolute w-[290px] xs:w-[315px] sm:w-[340px] md:w-[360px] h-[440px] xs:h-[460px] sm:h-[490px] rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-2xl cursor-pointer flex flex-col justify-between bg-slate-950 transition-shadow duration-300 ${
                isCenter ? 'ring-2 sm:ring-3 ring-emerald-500/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]' : 'hover:opacity-75'
              }`}
            >
              
              {/* 1. Full-Bleed Boat Photo Background */}
              <img
                src={ride.imageUrl}
                alt={ride.name}
                loading={isCenter ? 'eager' : 'lazy'}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none transition-transform duration-700 hover:scale-105"
              />

              {/* Gradient overlay for contrast: dark at top, clear center, smooth dark at bottom */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/15 to-black/70 pointer-events-none" />

              {/* 2. Top Portion: Left Title & Badge, Right 4.9 Rating */}
              <div className="relative z-10 p-5 sm:p-6 flex items-start justify-between w-full select-none pointer-events-none">
                
                {/* Left: Duration Title + Private Badge */}
                <div>
                  <h3 className="font-baskerville font-normal text-2xl sm:text-3xl text-white tracking-tight leading-none drop-shadow-lg">
                    {ride.durationHours} Hour Ride
                  </h3>
                  <div className="mt-2.5 inline-flex items-center px-2.5 py-0.5 rounded-md bg-black/45 backdrop-blur-md border border-white/20 text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase text-white/90 shadow-sm">
                    {ride.isPopular ? 'POPULAR' : 'PRIVATE'}
                  </div>
                </div>

                {/* Right: 4.9 Star Rating Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-sm flex-shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{ride.rating || '4.9'}</span>
                </div>

              </div>

              {/* 3. Center Area shows the Boat photo unobstructed */}
              <div className="flex-grow pointer-events-none" />

              {/* 4. Bottom Portion: Single Pill Button with Rate on Left & Book Now on Right */}
              <div className="relative z-10 p-4 sm:p-5 w-full select-none">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(ride, true);
                  }}
                  className="w-full flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-xl shadow-black/25 backdrop-blur-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer group/btn"
                >
                  {/* Left Side: Rate */}
                  <div className="flex items-baseline gap-1 text-left">
                    <span className="text-base sm:text-lg font-black tracking-tight font-sans text-slate-950">
                      ₹{ride.basePrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] sm:text-xs text-slate-500 font-medium">
                      / ride
                    </span>
                  </div>

                  {/* Right Side: Book now */}
                  <div className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-900 group-hover/btn:text-emerald-700 transition-colors">
                    <span>Book now</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5] text-slate-900 group-hover/btn:text-emerald-700 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </div>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
