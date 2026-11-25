import React from 'react';
import { ArrowRight, DollarSign, Clock, Sun, Map, Navigation, Split } from 'lucide-react';

export default function RelatedPagesSection({ onNavigate }) {
  const pages = [
    {
      title: 'Shikara Ride Prices',
      path: '/shikara-ride-price',
      desc: 'Per-boat pricing, group splits for 2 to 6 guests, extra guest fees, and advance payment terms.',
      icon: DollarSign,
      color: 'text-emerald-700 bg-emerald-50'
    },
    {
      title: 'Cruise Timings & Slots',
      path: '/shikara-ride-timings',
      desc: 'Sunrise (6:00 AM), morning, afternoon, and sunset departure schedules compared.',
      icon: Clock,
      color: 'text-blue-700 bg-blue-50'
    },
    {
      title: 'Sunset Shikara Cruise',
      path: '/sunset-shikara-ride',
      desc: 'Golden hour sailing across Vembanad Lake, dusk village scenery, and evening breezes.',
      icon: Sun,
      color: 'text-amber-700 bg-amber-50'
    },
    {
      title: 'Detailed Canal Routes',
      path: '/shikara-routes',
      desc: 'Stop-by-stop canal maps for 2-hour, 3-hour, and 4-hour backwater expeditions.',
      icon: Map,
      color: 'text-[#163b2f] bg-emerald-50'
    },
    {
      title: 'Day Trip from Kochi',
      path: '/shikara-ride-from-kochi',
      desc: 'Practical guide for taking a day trip from Cochin/Kochi to Alleppey for a private Shikara ride.',
      icon: Navigation,
      color: 'text-indigo-700 bg-indigo-50'
    },
    {
      title: 'Shikara vs Houseboat',
      path: '/shikara-vs-houseboat',
      desc: 'Cost, canal depth, privacy, and noise comparison to help you choose the right boat.',
      icon: Split,
      color: 'text-emerald-700 bg-emerald-50'
    }
  ];

  return (
    <section id="related-pages" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-[1360px] mx-auto scroll-mt-20">

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase mb-4">
          EXPLORE RELATED TOPICS
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight font-sans leading-tight">
          Helpful Alleppey Backwaters Guides
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-normal mt-3 max-w-xl mx-auto leading-relaxed">
          Read our in-depth guides on pricing, sunrise vs sunset slots, day trips from Kochi, and detailed canal maps.
        </p>
      </div>

      {/* 6 Related Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((p) => {
          const IconComponent = p.icon;
          return (
            <div
              key={p.path}
              onClick={() => onNavigate(p.path)}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-slate-200/90 hover:border-[#163b2f] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className={`w-11 h-11 rounded-2xl ${p.color} flex items-center justify-center mb-5 transition-transform group-hover:scale-105`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 font-sans tracking-tight mb-2 group-hover:text-[#163b2f] transition-colors flex items-center justify-between">
                  <span>{p.title}</span>
                  <span className="text-slate-400 group-hover:text-[#163b2f] group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {p.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#163b2f]">
                <span>Read Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
