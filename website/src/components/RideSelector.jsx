import React, { useState, useEffect, useRef } from 'react';
import { Star, ArrowRight, ArrowUpRight } from 'lucide-react';
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
          Private Shikara rides from 2 to 5 hours. Tap any card to explore full route stops &amp; booking.
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
          Modelled on the user reference video:
          - Active card in center (scale 1.0, opacity 1.0, z-index 20)
          - Left card peeking (scale 0.85, opacity 0.45, z-index 10)
          - Right card peeking (scale 0.85, opacity 0.45, z-index 10)
          - Two-tone split card: photo top half, clean white bottom with stats
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
            // keep non-adjacent cards invisible
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
              className={`absolute w-[285px] xs:w-[310px] sm:w-[340px] md:w-[360px] h-[440px] xs:h-[460px] sm:h-[490px] rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-2xl cursor-pointer flex flex-col justify-between bg-white border border-slate-200/80 transition-shadow duration-300 ${
                isCenter ? 'ring-2 sm:ring-3 ring-[#163b2f]/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)]' : 'hover:opacity-75'
              }`}
            >
              
              {/* =========================================================================
                  FIRST MODEL CARD DESIGN (media_1795618062988_a67556bc.png):
                  - TOP (~45%): Clean white card info
                    • Hours ("3 Hours Cruise") + Top rated badge
                    • "Up to 6 guests included"
                    • Rate ("₹3,000 / ride") + "Book Now ↗" button
                  - BOTTOM (~55%): Boat photo with rounded inner corners
                    • Boat name pill badge
                    • "★ 4.9" Review rating pill badge
                  - Strictly no clutter. Rest of details seen on tap / Book Now.
                  ========================================================================= */}
              
              {/* TOP PORTION (~45%): White Header Info */}
              <div className="w-full h-[45%] p-4 sm:p-5 flex flex-col justify-between bg-white select-none">
                
                {/* Row 1: Duration Title + Top Rated Badge */}
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-extrabold text-slate-900 font-sans tracking-tight text-xl sm:text-2xl leading-none">
                      {ride.durationLabel} Cruise
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold border border-slate-200 text-slate-600 bg-slate-50/80">
                      {ride.isPopular ? 'Top rated' : 'Private'}
                    </span>
                  </div>

                  {/* Row 2: Guests info (Upto 6 guest) */}
                  <p className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1.5 leading-snug">
                    Up to 6 guests included
                  </p>
                </div>

                {/* Row 3: Rate & Book Now Button */}
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100/80">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl sm:text-2xl font-black text-slate-950 font-sans tracking-tight leading-none">
                        ₹{ride.basePrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-slate-400 font-semibold lowercase">
                        / ride
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(ride, true);
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-slate-950 hover:bg-[#163b2f] text-white shadow-md transition-all transform active:scale-95 cursor-pointer"
                  >
                    <span>Book Now</span>
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </button>
                </div>

              </div>

              {/* BOTTOM PORTION (~55%): Photo Container with Rounded Inner Corners */}
              <div className="w-full h-[55%] p-2 sm:p-2.5 pt-0">
                <div className="relative w-full h-full rounded-[20px] sm:rounded-[24px] overflow-hidden bg-slate-950 shadow-inner">
                  <img
                    src={ride.imageUrl}
                    alt={ride.name}
                    loading={isCenter ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover transition-transform duration-700 pointer-events-none group-hover:scale-105"
                  />

                  {/* Subtle dark gradient overlay on bottom of photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

                  {/* Bottom Row on Photo: Boat Name & 4.9 Rating Badge */}
                  <div className="absolute bottom-2.5 inset-x-2.5 sm:bottom-3 sm:inset-x-3 flex items-center justify-between gap-2 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md text-white font-bold text-[11px] border border-white/20 shadow-xs truncate max-w-[170px]">
                      {ride.boatName || 'Private Shikara'}
                    </span>

                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md text-white text-[11px] font-bold border border-white/20 shadow-xs flex-shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{ride.rating || '4.9'}</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
