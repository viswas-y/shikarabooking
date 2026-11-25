import React from 'react';
import { ArrowLeft, Clock, Sun, Sunrise, Sunset, ShieldCheck, ArrowRight } from 'lucide-react';
import { shikaraConfig } from '../config/shikaraConfig';

export default function TimingsPage({ onNavigate }) {
  const whatsappUrl = `https://wa.me/${shikaraConfig.whatsappNumber}?text=${encodeURIComponent(
    'Hello BookShikara! I would like to check availability for a specific timing slot.'
  )}`;

  return (
    <div className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-slate-900">
      
      {/* Back button */}
      <button
        type="button"
        onClick={() => onNavigate('/')}
        className="inline-flex items-center gap-2 text-xs font-bold text-[#163b2f] hover:text-emerald-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Main Page</span>
      </button>

      {/* Page Title & H1 */}
      <div className="mb-10">
        <div className="inline-block px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
          DAILY CRUISE SCHEDULE
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-sans text-slate-900 tracking-tight leading-tight">
          Shikara Ride Timings in Alleppey
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
          Choosing the right departure time transforms your backwater experience. Here is an honest breakdown of our 4 daily departure slots.
        </p>
      </div>

      {/* 4 Timings Cards */}
      <div className="space-y-6 mb-12">
        {shikaraConfig.timeSlots.map((slot) => (
          <div key={slot.id} className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-xl sm:text-2xl font-extrabold text-[#163b2f] font-sans">
                  {slot.time}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {slot.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {slot.label}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                {slot.desc}
              </p>
            </div>

            <div className="flex-shrink-0">
              <a
                href={`https://wa.me/${shikaraConfig.whatsappNumber}?text=${encodeURIComponent(
                  `Hello BookShikara! I would like to book the ${slot.label} slot. Please let me know if it is open.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#163b2f] hover:bg-[#0f2921] text-white text-xs font-bold transition-all shadow-sm"
              >
                <span>Reserve {slot.time}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Tips section */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-7 sm:p-9 text-slate-700">
        <h2 className="text-xl font-bold font-sans text-slate-900 mb-3">
          Local Boatman Tips for Best Timings:
        </h2>
        <ul className="space-y-3 text-xs sm:text-sm leading-relaxed">
          <li>• <strong>Sunrise (6:00 AM):</strong> Best for peace, morning mist, glassy calm waters, and rare migratory kingfishers and cormorants. Zero boat traffic.</li>
          <li>• <strong>Sunset (3:30 PM):</strong> Most romantic slot. Cool afternoon breeze picking up across Vembanad Lake, with orange and violet sunset reflections. Highly recommended to book at least 2 days ahead.</li>
          <li>• <strong>Midday (12:00 PM):</strong> Best paired with an authentic Kerala village lunch stop or toddy shop visit. All Shikaras have thick UV-protective canopies to keep you cool and shaded.</li>
        </ul>
      </div>

    </div>
  );
}
