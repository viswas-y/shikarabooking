import React from 'react';
import { ArrowLeft, MapPin, Check, ArrowRight } from 'lucide-react';
import { shikaraConfig } from '../config/shikaraConfig';

export default function RoutePage({ onNavigate }) {
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
        <div className="inline-block px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
          CANAL NAVIGATION GUIDE
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-sans text-slate-900 tracking-tight leading-tight">
          Alleppey Shikara Routes &amp; Canal Map
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
          All our rides depart from Jetty No. 4, Punnamada. All rides share the same classic starting route, and each extra hour ventures deeper into secluded waterways.
        </p>
      </div>

      {/* Master 13 Stops Overview Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200/90 mb-10">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
              CANAL ITINERARY
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-sans text-slate-900 mt-0.5">
              Route
            </h2>
          </div>
          <span className="text-xs sm:text-sm font-extrabold text-[#163b2f] bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full">
            13 stops
          </span>
        </div>

        {/* Key Inclusions & Booking Notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-7 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#163b2f] flex-shrink-0" />
            <span className="font-semibold">Private boat · the price covers up to 6 guests</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#163b2f] flex-shrink-0" />
            <span className="font-semibold">Departs from Punnamada Finishing Point</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 flex-shrink-0" />
            <span className="font-semibold">Included: captain, fuel, life jackets</span>
          </div>
          <div className="flex items-start gap-2 sm:col-span-2 text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-600 flex-shrink-0 mt-1" />
            <span><strong>On request:</strong> Tea &amp; snacks · Kerala lunch · Toddy shop (karimeen, kappa, duck roast). Food paid at the stop.</span>
          </div>
        </div>

        {/* 13 Stops List */}
        <div className="relative pl-6 sm:pl-8 space-y-4 before:content-[''] before:absolute before:left-3 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {shikaraConfig.masterRouteStops.map((stop, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full bg-white border-2 border-[#163b2f] flex items-center justify-center shadow-xs">
                <div className="w-2 h-2 rounded-full bg-[#163b2f]" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                  Stop {idx < 9 ? `0${idx + 1}` : idx + 1}
                </span>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 mt-0.5">
                  {stop.title}
                </h3>
                {stop.desc && (
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {stop.desc}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
