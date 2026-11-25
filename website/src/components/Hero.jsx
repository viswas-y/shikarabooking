import React from 'react';
import { Star, Phone, ShieldCheck } from 'lucide-react';
import { shikaraConfig } from '../config/shikaraConfig';
import { resolveImageUrl } from '../api';

export default function Hero({ hero }) {
  const bgImage = resolveImageUrl(hero?.backgroundImage) || '/images/hero-shikara.jpg';

  const whatsappUrl = `https://wa.me/${shikaraConfig.whatsappNumber}?text=${encodeURIComponent(
    'Hello BookShikara! I would like to book a private Shikara ride in Alleppey. Please confirm available slots.'
  )}`;

  return (
    <section id="hero" className="relative min-h-[100svh] sm:min-h-screen h-[100svh] sm:h-screen w-full flex flex-col justify-between overflow-hidden bg-slate-950 text-white">

      {/* Responsive Background Images (No green arch, clear photo visibility):
          - Mobile View (< 640px): hero-mobile.jpg
          - Desktop View (>= 640px): hero-desktop.jpg
      */}
      <picture className="absolute inset-0 w-full h-full select-none pointer-events-none">
        <source
          media="(min-width: 640px)"
          srcSet="/images/hero-desktop.jpg"
        />
        <img
          src="/images/hero-mobile.jpg"
          alt="Private Shikara boat ride in Alleppey backwaters"
          className="w-full h-full object-cover object-center select-none"
        />
      </picture>

      {/* Crystal-clear Cinematic Dark Overlay so the photos shine bright and vivid */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/60 pointer-events-none" />

      {/* Ambient Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.35)_100%)] pointer-events-none" />

      {/* Subtle bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/65 to-transparent pointer-events-none" />

      {/* Center Hero Content matching Wanderway template layout & typography */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 sm:pt-48 md:pt-56 pb-20 sm:pb-28 flex-grow flex flex-col items-center justify-center text-center">

        {/* 1. Label with flanking lines matching Wanderway template */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4 select-none">
          <div className="w-8 sm:w-16 h-[1px] bg-white/40" />
          <span className="font-raleway text-xs sm:text-[15px] font-medium tracking-[0.05em] uppercase text-white drop-shadow-md">
            Your Dream Backwater Escape
          </span>
          <div className="w-8 sm:w-16 h-[1px] bg-white/40" />
        </div>

        {/* 2. Main Heading: Libre Baskerville serif matching Wanderway */}
        <h1 className="font-baskerville font-normal text-white text-[32px] sm:text-[48px] lg:text-[62px] leading-[1.18] sm:leading-[1.2] tracking-[-0.1px] max-w-4xl mx-auto text-center select-none drop-shadow-xl capitalize">
          Escape to the Backwaters: Shikara Rides You Can’t Miss!
        </h1>

        {/* 3. Subheading */}
        <p className="text-xs sm:text-sm md:text-base text-slate-100/90 font-medium max-w-2xl mx-auto mt-4 sm:mt-5 leading-relaxed font-sans drop-shadow-sm">
          Private village canals &amp; Vembanad Lake cruise • 2, 3 or 4 hours • Captain included
        </p>

        {/* 4. Two Buttons - Both Pure White as requested */}
        <div className="mt-7 sm:mt-9 flex flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto px-2">

          {/* Button 1: WhatsApp Now (White Pill) */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 sm:py-4 px-5 sm:px-7 rounded-full text-xs sm:text-sm md:text-base font-bold bg-white hover:bg-slate-50 text-slate-900 shadow-xl shadow-black/25 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 backdrop-blur-md"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366] fill-current flex-shrink-0" aria-hidden="true">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.41a8.16 8.16 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.81-.37-4.04-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.15 8.15 0 0 1-1.25-4.47c0-4.54 3.7-8.25 8.24-8.25zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.41 1.01 2.58c.13.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.59.21-1.09.15-1.19-.06-.1-.23-.17-.48-.29z" />
            </svg>
            <span className="truncate">WhatsApp Now</span>
          </a>

          {/* Button 2: Call Now (White Pill) */}
          <a
            href={`tel:${shikaraConfig.phoneNumberClean}`}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 sm:py-4 px-5 sm:px-7 rounded-full text-xs sm:text-sm md:text-base font-bold bg-white hover:bg-slate-50 text-slate-900 shadow-xl shadow-black/25 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 backdrop-blur-md"
          >
            <Phone className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-900 fill-current flex-shrink-0" />
            <span className="truncate">Call Now</span>
          </a>

        </div>

        {/* 5. Short Line on Advance Payment */}
        <p className="text-xs sm:text-sm text-amber-300 font-semibold mt-5 sm:mt-6 drop-shadow-sm flex items-center justify-center gap-1.5 select-none">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Pay ₹1,000 advance to hold boat • Balance at jetty</span>
        </p>

      </div>

    </section>
  );
}
