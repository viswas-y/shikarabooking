import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight, X, Sparkles, ShieldCheck } from 'lucide-react';
import { shikaraConfig } from '../config/shikaraConfig';

export default function StickyBookingBar({ selectedRide, onOpenBookingWidget, onNavigate }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const ride = selectedRide || shikaraConfig.rides[1];

  // Animated step-by-step messages from Chikku
  const CHIKKU_MESSAGES = [
    {
      badge: "CHIKKU",
      badgeColor: "bg-amber-400 text-slate-950",
      text: "Hi, I'm Chikku!",
      icon: "👋",
    },
    {
      badge: "OFFER",
      badgeColor: "bg-emerald-500 text-white",
      text: "Pay ₹1,000 to hold boat!",
      icon: "🚤",
    },
    {
      badge: "DIRECT DEAL",
      badgeColor: "bg-emerald-500 text-white",
      text: `Private ride ₹${ride.basePrice.toLocaleString('en-IN')}`,
      icon: "✨",
    },
    {
      badge: "NO RISK",
      badgeColor: "bg-sky-500 text-white",
      text: "Balance at jetty check-in!",
      icon: "🛡️",
    }
  ];

  const [msgIndex, setMsgIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Cycle messages smoothly one after another
  useEffect(() => {
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setMsgIndex((prev) => (prev + 1) % CHIKKU_MESSAGES.length);
        setIsFading(false);
      }, 220);
    }, 2800);

    return () => clearInterval(timer);
  }, [ride.basePrice]);

  // Show only after scrolling down past the hero (or after 2s)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setIsVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Also trigger if user stays on page
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible || isDismissed) return null;

  const whatsappUrl = `https://wa.me/${shikaraConfig.whatsappNumber}?text=${encodeURIComponent(
    `Hello BookShikara! I saw your direct offer for the *${ride.durationLabel} (${ride.name})* at ₹${ride.basePrice}. Please confirm availability.`
  )}`;

  const handleDetailsClick = () => {
    if (onNavigate) {
      onNavigate(`/shikara-ride-${ride.durationHours}-hours`);
    } else if (onOpenBookingWidget) {
      onOpenBookingWidget();
    }
  };

  return (
    <aside 
      aria-label="Direct booking offer"
      className="fixed bottom-3 sm:bottom-5 left-3 sm:left-6 right-3 sm:right-6 max-w-4xl mx-auto z-40 animate-slide-up"
    >
      <div className="relative bg-white rounded-[28px] sm:rounded-[36px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.28)] p-3 sm:p-4 text-slate-900 flex items-center justify-between gap-3 sm:gap-5 border-0">
        
        {/* Dismiss Button */}
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="absolute -top-2.5 -right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900 text-white hover:bg-slate-800 flex items-center justify-center shadow-lg transition-transform hover:scale-110 focus:outline-none z-30"
          aria-label="Dismiss offer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Side: Cartoon Character Mascot (Transparent Cutout, No Border, Stands on Card) */}
        <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
          
          {/* Cartoon Character Cutout with Clear Head Space & Animated Step-by-Step Speech Bubble */}
          <div 
            className="relative z-20 -mt-10 sm:-mt-14 -mb-2 sm:-mb-3 flex-shrink-0 cursor-pointer group" 
            onClick={handleDetailsClick}
          >
            {/* Sleek Single-Line Speech Bubble Floating Well ABOVE Chikku's Head (Zero Face Overlap) */}
            <div className="absolute -top-10 sm:-top-12 left-0 sm:left-1 z-30 pointer-events-none select-none">
              <div className={`relative flex items-center gap-1.5 bg-slate-950/95 text-white pl-2 sm:pl-2.5 pr-2.5 sm:pr-3 py-1 sm:py-1.5 rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.4)] border border-emerald-400 whitespace-nowrap transition-all duration-300 transform ${
                isFading ? 'opacity-0 -translate-y-1 scale-95' : 'opacity-100 translate-y-0 scale-100'
              }`}>
                
                {/* Micro Badge */}
                <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full leading-none ${CHIKKU_MESSAGES[msgIndex].badgeColor}`}>
                  {CHIKKU_MESSAGES[msgIndex].badge}
                </span>

                {/* Animated Message Text */}
                <span className="text-[10px] sm:text-[12px] font-bold text-white flex items-center gap-1 leading-none">
                  <span>{CHIKKU_MESSAGES[msgIndex].text}</span>
                  <span className={CHIKKU_MESSAGES[msgIndex].icon === '👋' ? 'animate-hand-wave inline-block origin-bottom-right' : ''}>
                    {CHIKKU_MESSAGES[msgIndex].icon}
                  </span>
                </span>

                {/* Little Pointer Tail pointing DOWN to Chikku's hair without touching his face */}
                <div className="absolute -bottom-1 left-5 sm:left-7 w-2 h-2 bg-slate-950 border-r border-b border-emerald-400 rotate-45" />
              </div>
            </div>

            {/* Mascot Character Cutout with live video animation (No background) */}
            <div className="relative group-hover:scale-105 transition-transform select-none">
              <picture>
                <source srcSet="/images/character-animated.webp" type="image/webp" />
                <img
                  src="/images/character.png"
                  alt="BookShikara Animated Mascot"
                  className="w-14 sm:w-20 h-auto object-contain drop-shadow-2xl select-none"
                  width="155"
                  height="360"
                  loading="eager"
                />
              </picture>
            </div>
          </div>

          {/* Offer & Speech Message */}
          <div className="min-w-0">
            {/* Offer Tag Badge */}
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wide">
                <Sparkles className="w-3 h-3 text-emerald-700" />
                <span>CHIKKU'S DIRECT DEAL</span>
              </span>
              <span className="hidden sm:inline-block text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Pay ₹1,000 to hold
              </span>
            </div>

            {/* Selected Ride info */}
            <p className="text-xs sm:text-sm font-bold text-slate-900 truncate leading-snug">
              {ride.durationLabel} • {ride.name}
            </p>

            <div className="flex items-baseline gap-1.5 text-[11px] sm:text-xs text-slate-600 mt-0.5">
              <span className="text-sm sm:text-base font-extrabold text-[#163b2f] font-sans">
                ₹{ride.basePrice.toLocaleString('en-IN')}
              </span>
              <span>/ private boat</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline text-slate-500">Up to 6 guests</span>
              <span className="hidden lg:inline">•</span>
              <span className="hidden lg:inline text-emerald-700 font-medium">Balance at jetty</span>
            </div>
          </div>

        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0 z-20">
          
          {/* Call Captain Button */}
          <a
            href={`tel:${shikaraConfig.phoneNumberClean}`}
            className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition-all shadow-xs"
            aria-label="Call captain"
          >
            <Phone className="w-3.5 h-3.5 text-slate-900 fill-current" />
            <span className="hidden sm:inline">Call</span>
          </a>

          {/* Book on WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-emerald-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.41a8.16 8.16 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.81-.37-4.04-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.15 8.15 0 0 1-1.25-4.47c0-4.54 3.7-8.25 8.24-8.25zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.41 1.01 2.58c.13.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.59.21-1.09.15-1.19-.06-.1-.23-.17-.48-.29z" />
            </svg>
            <span className="truncate">Book Now</span>
          </a>

          {/* View Details Link */}
          <button
            type="button"
            onClick={handleDetailsClick}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors pl-1"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </aside>
  );
}
