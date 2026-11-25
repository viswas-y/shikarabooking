import React from 'react';
import { Check, ShieldCheck, HeartHandshake, AlertCircle } from 'lucide-react';
import { shikaraConfig } from '../config/shikaraConfig';

export default function WhatIsIncluded() {
  return (
    <section id="inclusions" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-[1360px] mx-auto scroll-mt-20">

      {/* Container Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-card border border-slate-200/90">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase mb-4">
            TRANSPARENT PRICING & INCLUSIONS
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-sans">
            What is Included in Every Booking
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl mx-auto">
            Everything you need for a comfortable, safe, and memorable backwaters journey is included in your boat fare.
          </p>
        </div>

        {/* 6 Inclusions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shikaraConfig.inclusions.map((item) => (
            <div key={item.title} className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 font-sans">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Optional Add-ons banner */}
        <div className="mt-8 pt-8 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-50/70 border border-emerald-200/80 p-5 rounded-2xl">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-800 block">
                Optional Stops on Request
              </span>
              <p className="text-xs sm:text-sm text-slate-700 font-medium mt-0.5">
                Tell your captain anytime during the ride: stop for lakeside hot tea & banana fritters, authentic Kerala banana leaf lunch, or visit a local coconut toddy stall.
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-900 bg-white px-3 py-1.5 rounded-full border border-emerald-200 flex-shrink-0 text-center">
              Food & drinks paid at stalls
            </span>
          </div>
        </div>

      </div>

    </section>
  );
}
