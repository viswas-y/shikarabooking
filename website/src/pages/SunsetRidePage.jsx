import React from 'react';
import { ArrowLeft, Sun, Check, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { shikaraConfig } from '../config/shikaraConfig';

export default function SunsetRidePage({ onNavigate }) {
  const whatsappUrl = `https://wa.me/${shikaraConfig.whatsappNumber}?text=${encodeURIComponent(
    'Hello BookShikara! I would like to book a Sunset Shikara Ride (3:30 PM departure) in Alleppey.'
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

      {/* Header */}
      <div className="mb-10">
        <div className="inline-block px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
          GOLDEN HOUR SPECIAL
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-sans text-slate-900 tracking-tight leading-tight">
          Sunset Shikara Ride in Alleppey
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
          The most breathtaking backwater journey of the day. Watch the tropical sun set over the vast, calm waters of Vembanad Lake from the cushioned comfort of your private wooden boat.
        </p>
      </div>

      {/* Highlights Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-9 shadow-card border border-slate-200/90 mb-10 space-y-6">
        <h2 className="text-xl font-bold font-sans text-slate-900">
          Why the Sunset Ride is Our Most Loved Experience:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600">
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
            <strong className="block font-bold text-slate-900 mb-1">Departure: 3:30 PM</strong>
            Depart while temperatures drop and a gentle lake breeze begins blowing across the waterways.
          </div>
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
            <strong className="block font-bold text-slate-900 mb-1">Golden Hour Lighting</strong>
            Ideal for couples, portraits, and landscape photography with warm orange backwater reflections.
          </div>
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
            <strong className="block font-bold text-slate-900 mb-1">Vembanad Lake Crossing</strong>
            Glide out onto the expansive open lake as evening fishing boats head back toward the shore.
          </div>
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
            <strong className="block font-bold text-slate-900 mb-1">100% Private Boat</strong>
            No noisy tourists or crowds. An intimate setting with just your loved ones and your skilled captain.
          </div>
        </div>

        {/* Pricing options */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold text-slate-400">Available Sunset Options:</span>
            <div className="text-base font-bold text-slate-900 mt-0.5">
              3 Hours (₹3,000) • 4 Hours (₹4,000)
            </div>
            <span className="text-xs text-slate-500">Includes private boat, captain, fuel &amp; life jackets</span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm shadow-md transition-all flex-shrink-0"
          >
            <span>Reserve Sunset Slot</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

    </div>
  );
}
