import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { resolveImageUrl } from '../api';

// ============================================================================
// 1. TUNEABLE CONFIGURATION OBJECT
// Adjust autoplay interval, 3D rotation angles, side blur, perspective and sizing here.
// ============================================================================
export const CURVED_CAROUSEL_CONFIG = {
  // Motion Timings
  autoplayInterval: 2800, // Auto-advance every 2.8s
  transitionDuration: 850, // 0.85s smooth interpolation
  transitionEase: 'cubic-bezier(0.25, 1, 0.5, 1)', // Snappy yet ultra-smooth ease
  resumeDelayAfterInteraction: 2000, // Resume autoplay 2s after user interaction

  // Mobile parameters (< 768px): Matches desktop 5-card curved arc
  mobile: {
    perspective: 1000,
    centerWidthVw: 58,
    maxCenterWidthPx: 240,
    aspectRatio: '3 / 4',
    stageHeight: '360px',
  },

  // Desktop parameters (>= 768px)
  desktop: {
    perspective: 1400,
    centerWidthVw: 22,
    maxCenterWidthPx: 340,
    aspectRatio: '3 / 4',
    stageHeight: '520px',
  },
};

// ============================================================================
// 2. EDITABLE PHOTOS LIST (src, alt)
// STRICT: NO TEXT ON OR AROUND THE PHOTOS - PHOTOS ONLY.
// ============================================================================
export const CAROUSEL_PHOTOS = [
  {
    id: 'photo-1',
    src: '/images/gallery/gallery-aerial-backwaters.jpg',
    alt: 'Aerial panorama of emerald backwaters and winding village canals in Alleppey',
  },
  {
    id: 'photo-2',
    src: '/images/gallery/gallery-crimson-sunset.jpg',
    alt: 'Golden crimson sunset reflections across the open waters of Vembanad Lake',
  },
  {
    id: 'photo-3',
    src: '/images/gallery/gallery-village-morning.jpg',
    alt: 'Quiet riverside morning in a traditional Kerala village with coconut palms',
  },
  {
    id: 'photo-4',
    src: '/images/gallery/gallery-narrow-canal-canopy.jpg',
    alt: 'Covered wooden shikara boat gliding smoothly under lush bamboo tree canopy',
  },
  {
    id: 'photo-5',
    src: '/images/gallery/gallery-lake-shikara.jpg',
    alt: 'Traditional handcrafted wooden shikara boat anchored along calm mirror waters',
  },
  {
    id: 'photo-6',
    src: '/images/gallery/gallery-canoe-reflections.jpg',
    alt: 'Local boatman punting a country canoe through tranquil backwater channels',
  },
  {
    id: 'photo-7',
    src: '/images/gallery/gallery-hyacinth-waterway.jpg',
    alt: 'Floating purple water hyacinth blooms along traditional houseboat banks',
  },
  {
    id: 'photo-8',
    src: '/images/gallery/gallery-tropical-canal.jpg',
    alt: 'Tropical waterway with lush ferns and rustic wooden village footbridge',
  },
  {
    id: 'photo-9',
    src: '/images/gallery/gallery-village-jetty.jpg',
    alt: 'Peaceful boat jetty stand at Punnamada with moored country craft',
  },
  {
    id: 'photo-10',
    src: '/images/gallery/gallery-sunset-canoe.jpg',
    alt: 'Solitary country canoe sailing across glowing golden horizon at twilight',
  },
  {
    id: 'photo-11',
    src: '/images/hero-shikara.jpg',
    alt: 'Shikara cruise underway along palm-shaded canal banks in Alleppey',
  },
  {
    id: 'photo-12',
    src: '/images/shikara-card1-cover.jpg',
    alt: 'Authentic Kerala shikara with cushioned cane seating and open canal view',
  },
];

export default function Gallery({ gallery }) {
  // Normalize photo list from prop or default array so src is ALWAYS valid and photos render
  const rawPhotos = (gallery && gallery.length > 0) ? gallery : CAROUSEL_PHOTOS;
  const photos = rawPhotos.map((p, i) => {
    const rawSrc = p.src || p.imageUrl || p.url || (typeof p === 'string' ? p : '');
    return {
      id: p.id || `photo-${i}`,
      src: rawSrc || CAROUSEL_PHOTOS[i % CAROUSEL_PHOTOS.length].src,
      alt: p.alt || p.title || 'Alleppey backwaters private shikara boat cruise moment',
    };
  });
  const totalPhotos = photos.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Check prefers-reduced-motion
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Interaction timers & gesture coordinates
  const resumeTimerRef = useRef(null);
  const dragStartX = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  // Screen resize tracking (breakpoint 768px)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation handlers
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalPhotos);
  }, [totalPhotos]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalPhotos - 1 : prev - 1));
  }, [totalPhotos]);

  // Pause and resume helpers
  const pauseAutoPlay = useCallback(() => {
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, []);

  const scheduleResume = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, CURVED_CAROUSEL_CONFIG.resumeDelayAfterInteraction);
  }, []);

  // Auto-advance loop (every 2.8s when not paused & motion allowed)
  useEffect(() => {
    if (isPaused || prefersReducedMotion || totalPhotos <= 1) return;

    const timer = setInterval(() => {
      goToNext();
    }, CURVED_CAROUSEL_CONFIG.autoplayInterval);

    return () => clearInterval(timer);
  }, [isPaused, prefersReducedMotion, totalPhotos, goToNext]);

  // Keyboard navigation (Left / Right arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        pauseAutoPlay();
        goToPrev();
        scheduleResume();
      } else if (e.key === 'ArrowRight') {
        pauseAutoPlay();
        goToNext();
        scheduleResume();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrev, goToNext, pauseAutoPlay, scheduleResume]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    pauseAutoPlay();
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current !== null && touchStartY.current !== null) {
      const diffX = touchStartX.current - e.changedTouches[0].clientX;
      const diffY = touchStartY.current - e.changedTouches[0].clientY;

      // Only trigger if horizontal swipe is dominant and exceeds threshold
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
        if (diffX > 0) {
          goToNext();
        } else {
          goToPrev();
        }
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
    scheduleResume();
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e) => {
    pauseAutoPlay();
    setIsDragging(true);
    dragStartX.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    if (isDragging && dragStartX.current !== null) {
      const diffX = dragStartX.current - e.clientX;
      if (Math.abs(diffX) > 40) {
        if (diffX > 0) {
          goToNext();
        } else {
          goToPrev();
        }
      }
    }
    setIsDragging(false);
    dragStartX.current = null;
    scheduleResume();
  };

  // Clicking any visible panel shifts it to center
  const handlePanelClick = (offset) => {
    if (offset === 0) return;
    pauseAutoPlay();
    setCurrentIndex((prev) => (prev + offset + totalPhotos) % totalPhotos);
    scheduleResume();
  };

  const config = isMobile ? CURVED_CAROUSEL_CONFIG.mobile : CURVED_CAROUSEL_CONFIG.desktop;

  return (
    <section 
      id="gallery" 
      className="relative w-full pt-2 sm:pt-4 pb-8 sm:pb-12 bg-[#fcfbf8] scroll-mt-20 overflow-x-clip select-none"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={scheduleResume}
      aria-roledescription="carousel"
      aria-label="Alleppey Backwaters Photos"
    >
      
      {/* Accessible Live Region (Announces current slide for screen readers) */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Photo {currentIndex + 1} of {totalPhotos}
      </div>

      {/* =========================================================================
          NORMAL SECTION HEADING ABOVE CAROUSEL
          (Design system fonts, colors, spacing preserved. Only photos move below)
          ========================================================================= */}
      <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 px-4">
        <div className="inline-block px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#163b2f] uppercase mb-2">
          MOMENTS ON WATER
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans leading-tight">
          Backwaters in Pictures
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1.5 max-w-md mx-auto leading-relaxed">
          Glimpses of tranquil village canals, wide open lakes, and daily backwater life.
        </p>
      </div>

      {/* =========================================================================
          3D INVISIBLE CYLINDER CAROUSEL STAGE
          - transform-style: preserve-3d
          - Responsive perspective: 900px (mobile) / 1400px (desktop)
          - Container overflow: hidden so no sideways scrolling occurs
          ========================================================================= */}
      <div 
        className="relative w-full max-w-[1400px] mx-auto flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        style={{
          height: config.stageHeight,
          perspective: `${config.perspective}px`,
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        
        {/* Stage Center Anchor with preserve-3d */}
        <div 
          className="relative w-full h-full flex items-center justify-center pointer-events-none"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {photos.map((photo, idx) => {
            // Shortest modular circular offset relative to currentIndex
            let offset = (idx - currentIndex + totalPhotos) % totalPhotos;
            if (offset > totalPhotos / 2) offset -= totalPhotos;

            const isPreloaded = idx < 3;

            // -----------------------------------------------------------------
            // 3D CYLINDRICAL GEOMETRY COMPUTATION
            // Panel faces inward on the cylinder:
            // - Left panels (offset < 0): rotateY is positive, facing inward to right
            // - Center panel (offset = 0): flat, scale 1, sharp, full opacity
            // - Right panels (offset > 0): rotateY is negative, facing inward to left
            // -----------------------------------------------------------------
            let transform = '';
            let filter = 'none';
            let opacity = 0;
            let zIndex = 0;
            let isClickable = false;

            if (isMobile) {
              // --- MOBILE (under 768px): Matches desktop 5-card curved arc ---
              if (offset === 0) {
                // Center photo: flat, prominent, scale 1, sharp
                transform = 'translate3d(0, 0, 0px) rotateY(0deg) scale(1)';
                filter = 'blur(0px)';
                opacity = 1;
                zIndex = 30;
                isClickable = true;
              } else if (offset === -1) {
                // Immediate left card: gentle 22deg angle, sharp, clearly visible
                transform = 'translate3d(calc(-82% - 10px), 0, -40px) rotateY(22deg) scale(0.92)';
                filter = 'blur(0px)';
                opacity = 0.92;
                zIndex = 25;
                isClickable = true;
              } else if (offset === 1) {
                // Immediate right card: gentle -22deg angle, sharp, clearly visible
                transform = 'translate3d(calc(82% + 10px), 0, -40px) rotateY(-22deg) scale(0.92)';
                filter = 'blur(0px)';
                opacity = 0.92;
                zIndex = 25;
                isClickable = true;
              } else if (offset === -2) {
                // Outer left peek: visible entering the 3D curve
                transform = 'translate3d(calc(-156% - 16px), 0, -90px) rotateY(36deg) scale(0.82)';
                filter = 'blur(0.5px)';
                opacity = 0.45;
                zIndex = 15;
                isClickable = true;
              } else if (offset === 2) {
                // Outer right peek: visible entering the 3D curve
                transform = 'translate3d(calc(156% + 16px), 0, -90px) rotateY(-36deg) scale(0.82)';
                filter = 'blur(0.5px)';
                opacity = 0.45;
                zIndex = 15;
                isClickable = true;
              } else {
                // Photos in rear of 3D cylinder
                const dir = offset > 0 ? 1 : -1;
                transform = `translate3d(${dir * 220}%, 0, -160px) rotateY(${dir * -55}deg) scale(0.7)`;
                filter = 'blur(2px)';
                opacity = 0;
                zIndex = 0;
              }
            } else {
              // --- DESKTOP (768px and up) ---
              // 3 photos visible in center + 2 side peeks
              if (offset === 0) {
                // Center photo: flat, 22vw wide (max 340px), scale 1
                transform = 'translate3d(0, 0, 0px) rotateY(0deg) scale(1)';
                filter = 'blur(0px)';
                opacity = 1;
                zIndex = 30;
                isClickable = true;
              } else if (offset === -1) {
                // Immediate left: rotateY +25deg, scale 0.94, sharp
                transform = 'translate3d(calc(-100% - 16px), 0, -45px) rotateY(25deg) scale(0.94)';
                filter = 'blur(0px)';
                opacity = 0.95;
                zIndex = 25;
                isClickable = true;
              } else if (offset === 1) {
                // Immediate right: rotateY -25deg, scale 0.94, sharp
                transform = 'translate3d(calc(100% + 16px), 0, -45px) rotateY(-25deg) scale(0.94)';
                filter = 'blur(0px)';
                opacity = 0.95;
                zIndex = 25;
                isClickable = true;
              } else if (offset === -2) {
                // Far left peek: rotateY +42deg, scale 0.86, blur 1px, opacity 0.6
                transform = 'translate3d(calc(-195% - 32px), 0, -120px) rotateY(42deg) scale(0.86)';
                filter = 'blur(1px)';
                opacity = 0.6;
                zIndex = 15;
                isClickable = true;
              } else if (offset === 2) {
                // Far right peek: rotateY -42deg, scale 0.86, blur 1px, opacity 0.6
                transform = 'translate3d(calc(195% + 32px), 0, -120px) rotateY(-42deg) scale(0.86)';
                filter = 'blur(1px)';
                opacity = 0.6;
                zIndex = 15;
                isClickable = true;
              } else {
                // Non-visible photos on back of cylinder
                const dir = offset > 0 ? 1 : -1;
                transform = `translate3d(${dir * 280}%, 0, -220px) rotateY(${dir * -60}deg) scale(0.7)`;
                filter = 'blur(3px)';
                opacity = 0;
                zIndex = 0;
              }
            }

            return (
              <div
                key={photo.id}
                onClick={() => isClickable && handlePanelClick(offset)}
                style={{
                  transform,
                  filter,
                  opacity,
                  zIndex,
                  width: isMobile ? 'min(58vw, 240px)' : 'min(22vw, 340px)',
                  aspectRatio: '3 / 4',
                  transition: prefersReducedMotion 
                    ? 'none' 
                    : `transform ${CURVED_CAROUSEL_CONFIG.transitionDuration}ms ${CURVED_CAROUSEL_CONFIG.transitionEase}, opacity ${CURVED_CAROUSEL_CONFIG.transitionDuration}ms ${CURVED_CAROUSEL_CONFIG.transitionEase}, filter ${CURVED_CAROUSEL_CONFIG.transitionDuration}ms ${CURVED_CAROUSEL_CONFIG.transitionEase}`,
                  willChange: 'transform, opacity, filter',
                  pointerEvents: isClickable ? 'auto' : 'none',
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden',
                }}
                className={`absolute rounded-[20px] sm:rounded-[24px] overflow-hidden bg-slate-900 border border-slate-200/80 shadow-2xl ${
                  isClickable ? 'cursor-pointer' : ''
                }`}
              >
                {/* STRICT: PHOTOS ONLY - NO TEXT, NO CAPTIONS, NO OVERLAYS */}
                <img
                  src={resolveImageUrl(photo.src)}
                  alt={photo.alt}
                  loading={isPreloaded ? 'eager' : 'lazy'}
                  width={450}
                  height={600}
                  className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700"
                />
              </div>
            );
          })}
        </div>

      </div>

      {/* =========================================================================
          CONTROLS: PREV/NEXT ARROW BUTTONS + PROGRESS DOTS (VISIBLE ON ALL SCREENS)
          ========================================================================= */}
      <div className="flex items-center justify-center gap-2.5 sm:gap-3 mt-4 sm:mt-6 px-4">
        <button
          type="button"
          onClick={() => {
            pauseAutoPlay();
            goToPrev();
            scheduleResume();
          }}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-200/90 shadow-xs flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer focus:outline-hidden"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
        </button>

        {/* Progress dots indicating slide position */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200/60 shadow-2xs">
          {photos.slice(0, Math.min(photos.length, 6)).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                pauseAutoPlay();
                setCurrentIndex(i);
                scheduleResume();
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                (currentIndex % 6) === i ? 'w-5 bg-[#163b2f]' : 'w-1.5 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            pauseAutoPlay();
            goToNext();
            scheduleResume();
          }}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-200/90 shadow-xs flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer focus:outline-hidden"
          aria-label="Next photo"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
        </button>
      </div>

    </section>
  );
}
