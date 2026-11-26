import React, { useState, useEffect, useRef } from 'react';
import { Star, ArrowUpRight, Lock, UserCheck, Fuel, LifeBuoy } from 'lucide-react';
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
          Modelled on the user reference card (media_1795659981574_24818916.png):
          - Full-bleed Shikara boat photo background with top rounded corners
          - Top floating badges: [🔒 Private] and [⭐ 4.9]
          - Bottom floating dark green sheet (#1a3d33) with full details:
            • Category / Boat name ("Royal Backwater Shikara")
            • Title ("4 Hours Cruise")
            • "Up to 6 guests included"
            • 3 Feature pills: Captain, Fuel, Life jackets
            • Price ("₹4,000 / ride") & per person ("about ₹667 per person")
            • White pill button: "Book now ↗"
          ========================================================================= */}
      <div 
        className="relative w-full max-w-5xl mx-auto h-[470px] xs:h-[490px] sm:h-[520px] flex items-center justify-center overflow-visible"
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

          const perPersonRate = Math.round(ride.basePrice / (shikaraConfig.pricing?.baseGuestLimit || 6));
          const displayName = ride.boatName
            ? (ride.boatName.toLowerCase().includes('shikara') ? ride.boatName : `${ride.boatName} Shikara`)
            : 'Royal Backwater Shikara';

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
              className={`absolute w-[295px] xs:w-[320px] sm:w-[350px] md:w-[370px] h-[465px] xs:h-[485px] sm:h-[515px] rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-2xl cursor-pointer flex flex-col justify-between bg-slate-950 transition-shadow duration-300 ${
                isCenter ? 'ring-2 sm:ring-3 ring-emerald-500/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)]' : 'hover:opacity-75'
              }`}
            >
              
              {/* 1. Full-Bleed Boat Photo Background */}
              <img
                src={ride.imageUrl}
                alt={ride.name}
                loading={isCenter ? 'eager' : 'lazy'}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none transition-transform duration-700 hover:scale-105"
              />

              {/* Gradient overlay for contrast: subtle dark at top, clear center, smooth dark at bottom */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/75 pointer-events-none" />

              {/* 2. Top Floating Badges: [🔒 Private] and [⭐ 4.9] */}
              <div className="relative z-10 p-3.5 sm:p-4 flex items-center justify-between select-none pointer-events-none">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/65 backdrop-blur-md text-white text-xs font-semibold border border-white/15 shadow-sm">
                  <Lock className="w-3.5 h-3.5 text-white/90" />
                  <span>Private</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/65 backdrop-blur-md text-white text-xs font-semibold border border-white/15 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{ride.rating || '4.9'}</span>
                </div>
              </div>

              {/* 3. Center Area shows the Boat photo unobstructed */}
              <div className="flex-grow pointer-events-none" />

              {/* 4. Bottom Floating Dark Forest Green Details Card matching media_1795659981574_24818916.png */}
              <div className="relative z-10 m-2.5 sm:m-3 p-4 sm:p-5 rounded-[22px] sm:rounded-[24px] bg-[#1a3d33]/95 backdrop-blur-md border border-white/15 shadow-2xl text-white flex flex-col justify-between select-none">
                <div>
                  {/* Category / Boat Name */}
                  <div className="text-emerald-300/90 text-xs sm:text-[13px] font-medium tracking-wide">
                    {displayName}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight mt-0.5">
                    {ride.durationLabel} Cruise
                  </h3>

                  {/* Subtitle */}
                  <p className="text-xs sm:text-[13px] text-slate-300 font-normal mt-0.5 mb-3">
                    Up to 6 guests included
                  </p>

                  {/* 3 Pills: Captain, Fuel, Life jackets */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3.5 sm:mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/10 text-white/95 text-[11px] sm:text-xs font-medium border border-white/10 backdrop-blur-xs">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-300 flex-shrink-0" />
                      <span>Captain</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/10 text-white/95 text-[11px] sm:text-xs font-medium border border-white/10 backdrop-blur-xs">
                      <Fuel className="w-3.5 h-3.5 text-emerald-300 flex-shrink-0" />
                      <span>Fuel</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/10 text-white/95 text-[11px] sm:text-xs font-medium border border-white/10 backdrop-blur-xs">
                      <LifeBuoy className="w-3.5 h-3.5 text-emerald-300 flex-shrink-0" />
                      <span>Life jackets</span>
                    </span>
                  </div>
                </div>

                {/* Bottom Row: Price & Book Now Button */}
                <div className="flex items-center justify-between gap-3 pt-2 sm:pt-2.5 border-t border-white/10">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-[27px] font-black text-white font-sans tracking-tight leading-none">
                        ₹{ride.basePrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-300/80 font-normal">
                        / ride
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-slate-300/80 font-normal mt-1 leading-none">
                      about ₹{perPersonRate.toLocaleString('en-IN')} per person
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(ride, true);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0"
                  >
                    <span>Book now</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
