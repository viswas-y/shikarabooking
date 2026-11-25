import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Compass, HelpCircle, Anchor, ArrowRight, DollarSign, Clock, ShieldCheck, Map } from 'lucide-react';
import { shikaraConfig } from '../config/shikaraConfig';

export default function Navbar({ onNavigate, currentPath = '/' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const isHomePage = currentPath === '/';
  // On home page, transparent over hero video until scrolled.
  // On all other routes (or when scrolled), solid white pill with high-contrast dark text.
  const isSolid = !isHomePage || isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const navLinks = [
    { name: 'Rides', href: '#rides', path: '/', isSection: true },
    { name: 'Gallery', href: '#gallery', path: '/', isSection: true },
    { name: 'Experience', href: '#experience', path: '/', isSection: true },
    { name: 'Why Us', href: '#why-us', path: '/', isSection: true },
    { name: 'How It Works', href: '#how-it-works', path: '/', isSection: true },
    { name: 'Pricing', href: '/shikara-ride-price', path: '/shikara-ride-price', isSection: false },
    { name: 'FAQ', href: '#faqs', path: '/', isSection: true },
  ];

  const handleLinkClick = (e, item) => {
    setMenuOpen(false);
    if (!item.isSection) {
      e.preventDefault();
      onNavigate(item.path);
    } else {
      if (currentPath !== '/') {
        e.preventDefault();
        onNavigate('/');
        setTimeout(() => {
          const el = document.querySelector(item.href);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  };

  const whatsappUrl = `https://wa.me/${shikaraConfig.whatsappNumber}?text=${encodeURIComponent(
    'Hello BookShikara! I would like to check availability for a private Shikara ride in Alleppey.'
  )}`;

  return (
    <>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity animate-fade-in"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 pointer-events-none flex flex-col items-center px-3 sm:px-4 ${
          isSolid
            ? 'top-2.5 sm:top-4'
            : 'top-0 pt-3 sm:pt-5 bg-transparent'
        }`}
      >
        <div
          ref={menuRef}
          className={`w-full transition-all duration-300 pointer-events-auto ${
            isSolid
              ? 'max-w-4xl sm:max-w-5xl mx-auto'
              : 'max-w-[1360px] mx-auto'
          }`}
        >

          <nav
            className={`transition-all duration-300 flex items-center justify-between ${
              isSolid
                ? 'bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-full shadow-[0_12px_36px_rgba(0,0,0,0.12)] px-4 sm:px-7 py-2 sm:py-2.5'
                : 'bg-transparent border-0 shadow-none px-3 sm:px-6 py-2.5 sm:py-3'
            }`}
          >

            {/* Brand Logo & Name (Left) */}
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); onNavigate('/'); }}
              className="flex items-center group focus:outline-none py-1"
            >
              <span className={`font-sans font-extrabold text-xl sm:text-2xl md:text-[26px] tracking-tight leading-none transition-colors ${
                isSolid ? 'text-slate-900' : 'text-white drop-shadow-md'
              }`}>
                {shikaraConfig.brandName}
              </span>
            </a>

            {/* Simple Desktop Nav Links */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item)}
                  className={`text-xs font-semibold tracking-wide transition-colors ${
                    isSolid ? 'text-slate-700 hover:text-slate-950 font-bold' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Right Controls: WhatsApp Button + Proper 3-Line Menu */}
            <div className="flex items-center gap-2 sm:gap-3">

              {/* WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-md shadow-emerald-950/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0" aria-hidden="true">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.41a8.16 8.16 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.81-.37-4.04-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.15 8.15 0 0 1-1.25-4.47c0-4.54 3.7-8.25 8.24-8.25zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.41 1.01 2.58c.13.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.59.21-1.09.15-1.19-.06-.1-.23-.17-.48-.29z" />
                </svg>
                <span>WhatsApp</span>
              </a>

              {/* Proper 3-Line Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none border cursor-pointer ${
                  menuOpen
                    ? 'bg-[#163b2f] text-white border-[#163b2f] shadow-md'
                    : isSolid
                      ? 'bg-slate-50 hover:bg-slate-100 text-slate-900 border-slate-200 shadow-xs'
                      : 'bg-white/20 hover:bg-white/30 text-white border-white/40 backdrop-blur-md'
                }`}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
              >
                {menuOpen ? (
                  <X className="w-5 h-5 text-current stroke-[2.2]" />
                ) : (
                  <Menu className="w-5 h-5 text-current stroke-[2.2]" />
                )}
              </button>
            </div>

          </nav>

          {/* Drawer Menu */}
          {menuOpen && (
            <div className="mt-2.5 sm:mt-3 bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] animate-fade-in text-slate-900 max-w-xl mx-auto">

              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <span className="text-[11px] font-extrabold tracking-widest text-slate-400 uppercase">
                  BOOKSHIKARA MENU
                </span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Main Links */}
              <div className="divide-y divide-slate-100">
                {navLinks.map((item, idx) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item)}
                    className="group px-3 py-3 rounded-2xl hover:bg-emerald-50/70 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-emerald-600">
                        0{idx + 1}
                      </span>
                      <span className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-emerald-700">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-slate-400 group-hover:text-emerald-700 text-sm font-bold transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                ))}
              </div>

              {/* Supporting Guide Pages in Drawer */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2 px-2">
                  Backwaters Guides
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a
                    href="/shikara-ride-timings"
                    onClick={(e) => { e.preventDefault(); setMenuOpen(false); onNavigate('/shikara-ride-timings'); }}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold"
                  >
                    Ride Timings
                  </a>
                  <a
                    href="/sunset-shikara-ride"
                    onClick={(e) => { e.preventDefault(); setMenuOpen(false); onNavigate('/sunset-shikara-ride'); }}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold"
                  >
                    Sunset Cruise
                  </a>
                  <a
                    href="/shikara-routes"
                    onClick={(e) => { e.preventDefault(); setMenuOpen(false); onNavigate('/shikara-routes'); }}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold"
                  >
                    Canal Routes
                  </a>
                  <a
                    href="/shikara-vs-houseboat"
                    onClick={(e) => { e.preventDefault(); setMenuOpen(false); onNavigate('/shikara-vs-houseboat'); }}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold"
                  >
                    Shikara vs Houseboat
                  </a>
                </div>
              </div>

              {/* Direct Booking CTA */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <a
                  href="#booking-widget"
                  onClick={(e) => {
                    setMenuOpen(false);
                    if (currentPath !== '/') {
                      e.preventDefault();
                      onNavigate('/');
                      setTimeout(() => {
                        const el = document.querySelector('#booking-widget');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 150);
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-[#163b2f] hover:bg-[#0f2921] text-white font-bold text-sm shadow-md transition-all"
                >
                  <span>Book Private Shikara Now</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Direct Contact Phone */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span>Call / WhatsApp: <a href={`tel:${shikaraConfig.phoneNumberClean}`} className="font-bold text-slate-900">{shikaraConfig.phoneFormatted}</a></span>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">Punnamada Jetty</span>
              </div>

            </div>
          )}

        </div>
      </header>
    </>
  );
}
