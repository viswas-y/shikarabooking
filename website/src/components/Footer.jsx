import React from 'react';
import { Phone, Mail, MessageCircle, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';
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
    <footer className="relative text-white mt-16 sm:mt-24 overflow-hidden select-none">
      
      {/* 1. Background Landscape Image (Responsive: Ultra-Quality Ghibli Paddy House on Mobile, Widescreen Hills on Desktop) */}
      <div className="absolute inset-0 z-0">
        <picture className="w-full h-full block">
          {/* Desktop & Tablet (>= 640px): Widescreen Rolling Hills */}
          <source
            media="(min-width: 640px)"
            srcSet="/images/footer-landscape-hills.webp"
            type="image/webp"
          />
          <source
            media="(min-width: 640px)"
            srcSet="/images/footer-landscape-hills.jpg"
          />

          {/* Mobile (< 640px): High Quality Kerala Village Paddy Field & House */}
          <source
            srcSet="/images/footer-mobile-paddy.webp"
            type="image/webp"
          />
          <img
            src="/images/footer-mobile-paddy.jpg"
            alt="Kerala Village Paddy Field & Traditional House"
            loading="lazy"
            className="w-full h-full object-cover object-[center_55%] sm:object-[center_50%]"
          />
        </picture>

        {/* Soft natural ambient gradient for crisp white text legibility while keeping the green landscape bright & photographic */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10" />
      </div>

      {/* 2. Torn Paper Top Transition (Organic Ripped Paper Edge matching page sand/white background) */}
      <div className="relative z-10 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          className="w-full h-10 sm:h-16 md:h-20 text-[#fcfbf8] fill-current"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 0 L 1440 0 L 1440 73.9 L 1440.0 73.9 L 1428.2 72.1 L 1418.4 80.0 L 1408.7 73.0 L 1396.9 73.9 L 1387.1 65.1 L 1377.3 73.0 L 1365.6 79.1 L 1355.8 63.3 L 1346.0 58.1 L 1336.2 61.6 L 1324.4 64.2 L 1314.6 72.1 L 1304.8 73.9 L 1293.1 70.4 L 1283.3 66.8 L 1273.5 68.6 L 1263.7 66.8 L 1251.9 56.3 L 1242.1 55.4 L 1232.3 61.6 L 1220.6 60.7 L 1210.8 61.6 L 1201.0 64.2 L 1191.2 59.8 L 1179.4 64.2 L 1169.6 61.6 L 1159.8 64.2 L 1148.1 64.2 L 1138.3 66.0 L 1128.5 66.0 L 1118.7 65.1 L 1106.9 66.8 L 1097.1 56.3 L 1087.3 57.2 L 1075.6 68.6 L 1065.8 66.8 L 1056.0 72.1 L 1046.2 67.7 L 1034.4 60.7 L 1024.7 70.4 L 1014.9 51.1 L 1003.1 66.8 L 993.3 64.2 L 983.5 65.1 L 973.7 62.5 L 962.0 61.6 L 952.2 60.7 L 942.4 58.1 L 930.6 59.8 L 920.8 63.3 L 911.0 63.3 L 901.2 68.6 L 889.5 69.5 L 879.7 67.7 L 869.9 68.6 L 858.1 65.1 L 848.3 65.1 L 838.5 66.0 L 828.7 59.8 L 817.0 63.3 L 807.2 61.6 L 797.4 58.9 L 785.6 58.9 L 775.8 59.8 L 766.0 63.3 L 756.2 65.1 L 744.5 64.2 L 734.7 66.0 L 724.9 66.8 L 713.1 64.2 L 703.3 64.2 L 693.6 60.7 L 681.8 59.8 L 672.0 57.2 L 662.2 57.2 L 652.4 38.8 L 640.7 61.6 L 630.9 37.0 L 621.1 51.1 L 609.3 58.9 L 599.5 51.9 L 589.7 44.9 L 579.9 53.7 L 568.2 51.1 L 558.4 45.8 L 548.6 30.0 L 536.8 30.0 L 527.0 30.0 L 517.2 30.0 L 507.4 40.5 L 495.7 40.5 L 485.9 35.3 L 476.1 36.1 L 464.3 41.4 L 454.5 37.0 L 444.7 39.6 L 434.9 34.4 L 423.2 37.9 L 413.4 36.1 L 403.6 37.9 L 391.8 37.9 L 382.0 37.0 L 372.2 38.8 L 362.4 39.6 L 350.7 41.4 L 340.9 40.5 L 331.1 43.2 L 319.3 48.4 L 309.6 53.7 L 299.8 54.6 L 290.0 54.6 L 278.2 54.6 L 268.4 51.9 L 258.6 56.3 L 246.9 60.7 L 237.1 58.1 L 227.3 58.1 L 217.5 58.9 L 205.7 56.3 L 195.9 56.3 L 186.1 58.1 L 174.4 53.7 L 164.6 51.9 L 154.8 56.3 L 145.0 53.7 L 133.2 51.9 L 123.4 51.1 L 113.6 51.9 L 101.9 51.1 L 92.1 52.8 L 82.3 51.1 L 72.5 53.7 L 60.7 55.4 L 50.9 55.4 L 41.1 50.2 L 29.4 54.6 L 19.6 47.5 L 9.8 51.1 L 0.0 55.4 Z"
          />
        </svg>
      </div>

      {/* 3. Main Content Area (Directly positioned on top of the green landscape) */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-16 sm:pb-20">
        
        {/* Upper Layout: Brand Block (Left) + 4 Columns (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 sm:pb-16 border-b border-white/20">
          
          {/* Left Column: Brand Logo, Tagline & Direct Contact Actions */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Logo Emblem + Brand Name */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-md">
                <Compass className="w-5 h-5 text-emerald-200" />
              </div>
              <span className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                {shikaraConfig.brandName}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-200 bg-white/15 backdrop-blur-sm border border-white/30 px-2 py-0.5 rounded-full ml-1 drop-shadow-sm">
                Alleppey
              </span>
            </div>

            {/* Tagline */}
            <p className="text-white/95 text-xs sm:text-sm leading-relaxed max-w-md drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)] font-medium">
              Authentic private Shikara boat cruises through Alleppey backwaters. Transparent pricing, verified local captains, and instant jetty boarding.
            </p>

            {/* Direct Contact Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href={`https://wa.me/${whatsapp}?text=Hello%20BookShikara,%20I%20would%20like%20to%20book%20a%20private%20shikara%20ride.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white hover:text-slate-900 border border-white/40 backdrop-blur-md text-xs font-bold text-white transition-all transform hover:scale-105 shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current text-emerald-300" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${shikaraConfig.phoneNumberClean}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white hover:text-slate-900 border border-white/40 backdrop-blur-md text-xs font-bold text-white transition-all transform hover:scale-105 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 fill-current text-amber-300" />
                <span>{phone}</span>
              </a>

              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white hover:text-slate-900 border border-white/40 backdrop-blur-md text-xs font-bold text-white transition-all transform hover:scale-105 shadow-sm"
              >
                <Mail className="w-3.5 h-3.5 text-sky-300" />
                <span>Email</span>
              </a>
            </div>

            <p className="text-[11px] text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] flex items-center gap-1">
              <span>Jetty: {address}</span>
            </p>

          </div>

          {/* Right Columns: 4 Clean Columns (2x2 on Mobile, 4 Cols on Desktop) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            
            {/* Column 1: Rides */}
            <div>
              <div className="text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase pb-1.5 border-b border-white/30 mb-3 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                Rides
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] font-medium">
                <li>
                  <a
                    href="/shikara-ride-2-hours"
                    onClick={(e) => handleLink(e, '/shikara-ride-2-hours')}
                    className="hover:text-emerald-200 transition-colors"
                  >
                    2h Village Canals
                  </a>
                </li>
                <li>
                  <a
                    href="/shikara-ride-3-hours"
                    onClick={(e) => handleLink(e, '/shikara-ride-3-hours')}
                    className="hover:text-emerald-200 transition-colors"
                  >
                    3h Lake &amp; Canals
                  </a>
                </li>
                <li>
                  <a
                    href="/shikara-ride-4-hours"
                    onClick={(e) => handleLink(e, '/shikara-ride-4-hours')}
                    className="hover:text-emerald-200 transition-colors"
                  >
                    4h Deep Explorer
                  </a>
                </li>
                <li>
                  <a
                    href="/sunset-shikara-ride"
                    onClick={(e) => handleLink(e, '/sunset-shikara-ride')}
                    className="hover:text-emerald-200 transition-colors"
                  >
                    Sunset Cruise
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Explore */}
            <div>
              <div className="text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase pb-1.5 border-b border-white/30 mb-3 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                Explore
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] font-medium">
                <li>
                  <a
                    href="/shikara-routes"
                    onClick={(e) => handleLink(e, '/shikara-routes')}
                    className="hover:text-emerald-200 transition-colors"
                  >
                    Route (13 Stops)
                  </a>
                </li>
                <li>
                  <a
                    href="/shikara-ride-price"
                    onClick={(e) => handleLink(e, '/shikara-ride-price')}
                    className="hover:text-emerald-200 transition-colors"
                  >
                    Prices &amp; Rates
                  </a>
                </li>
                <li>
                  <a
                    href="/shikara-ride-timings"
                    onClick={(e) => handleLink(e, '/shikara-ride-timings')}
                    className="hover:text-emerald-200 transition-colors"
                  >
                    Departure Times
                  </a>
                </li>
                <li>
                  <a
                    href="/shikara-vs-houseboat"
                    onClick={(e) => handleLink(e, '/shikara-vs-houseboat')}
                    className="hover:text-emerald-200 transition-colors"
                  >
                    Shikara vs Houseboat
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Policies */}
            <div>
              <div className="text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase pb-1.5 border-b border-white/30 mb-3 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                Policies
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] font-medium">
                <li>
                  <a
                    href="/booking-policy"
                    onClick={(e) => handleLink(e, '/booking-policy')}
                    className="hover:text-emerald-200 transition-colors"
                  >
                    Booking Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/refund-policy"
                    onClick={(e) => handleLink(e, '/refund-policy')}
                    className="hover:text-emerald-200 transition-colors"
                  >
                    Refund &amp; Cancel
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy-policy"
                    onClick={(e) => handleLink(e, '/privacy-policy')}
                    className="hover:text-emerald-200 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    onClick={(e) => handleLink(e, '/terms')}
                    className="hover:text-emerald-200 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <div className="text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase pb-1.5 border-b border-white/30 mb-3 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                Contact
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] font-medium">
                <li>
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-emerald-200 transition-colors flex items-center gap-1"
                  >
                    <span>Direct WhatsApp</span>
                    <ArrowUpRight className="w-3 h-3 text-emerald-300" />
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${shikaraConfig.phoneNumberClean}`}
                    className="hover:text-emerald-200 transition-colors"
                  >
                    Call Captain
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-emerald-200 transition-colors"
                  >
                    Email Support
                  </a>
                </li>
                <li>
                  <span className="text-[11px] text-white/70 block pt-1">
                    Punnamada Jetty #4
                  </span>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Sub-Footer Bar (Acme Style: Minimalist & Clean) */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
          
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white text-sm">
              {shikaraConfig.brandName}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-200 bg-white/15 px-2 py-0.5 rounded-full border border-white/30">
              Government Licensed
            </span>
          </div>

          <div className="text-[11px] sm:text-xs text-center sm:text-right text-white/85">
            &copy; {new Date().getFullYear()} {shikaraConfig.brandName}. All rights reserved. Made for Alleppey Backwaters.
          </div>

        </div>

      </div>

    </footer>
  );
}
