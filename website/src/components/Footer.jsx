import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { shikaraConfig } from '../config/shikaraConfig';

export default function Footer({ onNavigate }) {
  const phone = shikaraConfig.phoneFormatted;
  const email = shikaraConfig.email;
  const address = shikaraConfig.jettyAddress;
  const whatsapp = shikaraConfig.whatsappNumber;

  const handleLink = (e, path) => {
    e.preventDefault();
    if (onNavigate) onNavigate(path);
  };

  return (
    <footer className="relative text-white mt-16 sm:mt-24 overflow-hidden bg-[#071c14]">
      
      {/* Background Image: Kerala Paddy Fields, House & Misty Mountains (Inside the footer section) */}
      <div className="absolute inset-0 z-0">
        <picture className="w-full h-full block">
          <source srcSet="/images/footer-kerala-paddy.webp" type="image/webp" />
          <img
            src="/images/footer-kerala-paddy.jpg"
            alt="Kerala Paddy Fields & Misty Mountains"
            loading="lazy"
            className="w-full h-full object-cover object-[center_35%]"
          />
        </picture>

        {/* Evergreen overlay & gradient for rich contrast and perfect text readability */}
        <div className="absolute inset-0 bg-[#071c14]/80 sm:bg-[#071c14]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04120c] via-[#071c14]/70 to-[#071c14]/85" />
      </div>

      {/* Top Wave Transition from website sand/white background into footer */}
      <svg
        className="absolute top-0 left-0 right-0 w-full h-6 sm:h-10 text-[#fcfbf8] fill-current z-10 pointer-events-none"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <path d="M0,0 L1440,0 L1440,25 C1200,60 1040,15 720,40 C440,70 240,15 0,45 Z" />
      </svg>

      {/* Main Content Area (Modelled on reference layout) */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-20 sm:pb-12">
        
        {/* Upper Grid: 3 Link Columns + Circular Icons + Brand Contact Block */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-10 pb-10 sm:pb-14">
          
          {/* Column 1: Links */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-white font-bold text-sm sm:text-base tracking-wide pb-2 border-b border-white/30 mb-3 sm:mb-4">
              Links
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-100/80">
              <li>
                <a
                  href="/shikara-ride-2-hours"
                  onClick={(e) => handleLink(e, '/shikara-ride-2-hours')}
                  className="hover:text-white transition-colors"
                >
                  2h Village Canals
                </a>
              </li>
              <li>
                <a
                  href="/shikara-ride-3-hours"
                  onClick={(e) => handleLink(e, '/shikara-ride-3-hours')}
                  className="hover:text-white transition-colors"
                >
                  3h Lake &amp; Canals
                </a>
              </li>
              <li>
                <a
                  href="/shikara-ride-4-hours"
                  onClick={(e) => handleLink(e, '/shikara-ride-4-hours')}
                  className="hover:text-white transition-colors"
                >
                  4h Deep Explorer
                </a>
              </li>
              <li>
                <a
                  href="/sunset-shikara-ride"
                  onClick={(e) => handleLink(e, '/sunset-shikara-ride')}
                  className="hover:text-white transition-colors"
                >
                  Sunset Cruise
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Links */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-white font-bold text-sm sm:text-base tracking-wide pb-2 border-b border-white/30 mb-3 sm:mb-4">
              Links
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-100/80">
              <li>
                <a
                  href="/shikara-routes"
                  onClick={(e) => handleLink(e, '/shikara-routes')}
                  className="hover:text-white transition-colors"
                >
                  Route (13 Stops)
                </a>
              </li>
              <li>
                <a
                  href="/shikara-ride-price"
                  onClick={(e) => handleLink(e, '/shikara-ride-price')}
                  className="hover:text-white transition-colors"
                >
                  Prices &amp; Rates
                </a>
              </li>
              <li>
                <a
                  href="/shikara-ride-timings"
                  onClick={(e) => handleLink(e, '/shikara-ride-timings')}
                  className="hover:text-white transition-colors"
                >
                  Departure Timings
                </a>
              </li>
              <li>
                <a
                  href="/shikara-vs-houseboat"
                  onClick={(e) => handleLink(e, '/shikara-vs-houseboat')}
                  className="hover:text-white transition-colors"
                >
                  Shikara vs Houseboat
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Links */}
          <div className="col-span-2 sm:col-span-1 md:col-span-2">
            <div className="text-white font-bold text-sm sm:text-base tracking-wide pb-2 border-b border-white/30 mb-3 sm:mb-4">
              Links
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-100/80">
              <li>
                <a
                  href="/booking-policy"
                  onClick={(e) => handleLink(e, '/booking-policy')}
                  className="hover:text-white transition-colors"
                >
                  Booking Policy
                </a>
              </li>
              <li>
                <a
                  href="/refund-policy"
                  onClick={(e) => handleLink(e, '/refund-policy')}
                  className="hover:text-white transition-colors"
                >
                  Refund &amp; Cancellation
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  onClick={(e) => handleLink(e, '/privacy-policy')}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => handleLink(e, '/terms')}
                  className="hover:text-white transition-colors"
                >
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Circular Icons (WhatsApp, Phone, Email) */}
          <div className="col-span-2 sm:col-span-1 md:col-span-2 flex items-center md:justify-center gap-3 py-2 md:py-0">
            {/* WhatsApp Circle */}
            <a
              href={`https://wa.me/${whatsapp}?text=Hello%20BookShikara,%20I%20would%20like%20to%20book%20a%20private%20shikara%20ride.`}
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 rounded-full border border-white/80 flex items-center justify-center text-white hover:bg-white hover:text-[#0f291e] transition-all transform hover:scale-105 shadow-sm"
              aria-label="WhatsApp"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
            </a>

            {/* Phone Circle */}
            <a
              href={`tel:${shikaraConfig.phoneNumberClean}`}
              className="w-11 h-11 rounded-full border border-white/80 flex items-center justify-center text-white hover:bg-white hover:text-[#0f291e] transition-all transform hover:scale-105 shadow-sm"
              aria-label="Call"
              title="Call Captain"
            >
              <Phone className="w-5 h-5 fill-current" />
            </a>

            {/* Email Circle */}
            <a
              href={`mailto:${email}`}
              className="w-11 h-11 rounded-full border border-white/80 flex items-center justify-center text-white hover:bg-white hover:text-[#0f291e] transition-all transform hover:scale-105 shadow-sm"
              aria-label="Email"
              title="Send Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Column 5: Right Side Brand & Contact Info */}
          <div className="col-span-2 md:col-span-4 md:text-right space-y-2 text-xs sm:text-sm text-emerald-100/90">
            <h3 className="text-xl sm:text-2xl font-bold font-sans text-white tracking-tight">
              {shikaraConfig.brandName}.com
            </h3>
            <p className="flex items-center md:justify-end gap-1.5 text-emerald-100/80">
              <span>{address}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            </p>
            <p className="flex items-center md:justify-end gap-1.5 text-emerald-100/80">
              <span>tel: {phone}</span>
              <Phone className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            </p>
            <p className="flex items-center md:justify-end gap-1.5 text-emerald-100/80">
              <span>email: {email}</span>
              <Mail className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            </p>
          </div>

        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-emerald-100/70">
          
          {/* Left: Brand Name */}
          <div className="flex items-center gap-2">
            <span className="font-sans font-extrabold text-base sm:text-lg text-white tracking-tight">
              {shikaraConfig.brandName}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              Licensed
            </span>
          </div>

          {/* Center: Inline Policy Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs text-emerald-100/80">
            <a
              href="/booking-policy"
              onClick={(e) => handleLink(e, '/booking-policy')}
              className="hover:text-white transition-colors"
            >
              Booking Policy
            </a>
            <a
              href="/refund-policy"
              onClick={(e) => handleLink(e, '/refund-policy')}
              className="hover:text-white transition-colors"
            >
              Refund Policy
            </a>
            <a
              href="/privacy-policy"
              onClick={(e) => handleLink(e, '/privacy-policy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              onClick={(e) => handleLink(e, '/terms')}
              className="hover:text-white transition-colors"
            >
              Terms &amp; Conditions
            </a>
          </div>

          {/* Right: Copyright */}
          <div className="text-[11px] sm:text-xs text-emerald-200/60 text-center md:text-right">
            &copy; {new Date().getFullYear()} {shikaraConfig.brandName}. All rights reserved. Made for Alleppey Backwaters.
          </div>

        </div>

      </div>

    </footer>
  );
}
