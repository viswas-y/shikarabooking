import React from 'react';
import { UserCheck, Lock, Compass } from 'lucide-react';
import { shikaraConfig } from '../config/shikaraConfig';

export default function WhyChooseUs() {
  const icons = [UserCheck, Lock, Compass];

  return (
    <section id="why-us" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-[1360px] mx-auto scroll-mt-20">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
        <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase mb-4">
          THE BOOKSHIKARA PROMISE
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight font-sans leading-tight">
          Why Choose Our <span className="font-serif italic font-normal text-slate-800">Private Shikara?</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-normal mt-3 max-w-2xl mx-auto leading-relaxed">
          Three fundamental reasons why travelers choose us over crowded tour boats and commercial houseboats.
        </p>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {shikaraConfig.whyChooseUs.map((pillar, idx) => {
          const IconComponent = icons[idx];
          return (
            <div
              key={pillar.title}
              className="bg-white rounded-3xl p-7 sm:p-8 shadow-card border border-slate-200/90 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#163b2f]/10 text-[#163b2f] flex items-center justify-center mb-6">
                  <IconComponent className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                  {pillar.subtitle}
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-sans tracking-tight mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-[#163b2f]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#163b2f]" />
                <span>Verified Alleppey Standard</span>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
