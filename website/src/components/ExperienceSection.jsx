import React from 'react';
import { Anchor, Compass, Eye, ShieldCheck, Sun, Trees } from 'lucide-react';

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-[1360px] mx-auto scroll-mt-20">
      
      {/* Short & Clean Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
        <div className="inline-block px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#163b2f] uppercase mb-2">
          THE EXPERIENCE
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans leading-tight">
          The Shikara Experience
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1.5 max-w-md mx-auto leading-relaxed">
          Quiet village canals, cool lake breezes, and authentic backwater life.
        </p>
      </div>

      {/* Grid: 2 Main Cards (What is a Shikara + What You Experience) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Card 1: What is a Shikara */}
        <div className="bg-white rounded-3xl p-7 sm:p-9 shadow-card border border-slate-200/90 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#163b2f]/10 text-[#163b2f] flex items-center justify-center mb-6">
              <Anchor className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-sans tracking-tight mb-4">
              What is a Traditional Shikara Boat?
            </h3>
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed font-normal">
              <p>
                A <strong className="text-slate-900">Shikara</strong> is a handcrafted Kerala wooden boat, traditionally designed with an open-sided bamboo or wooden canopy and a low water draft. Inside, instead of rigid bus-like seats, you relax on a comfortable cushioned mattress lounge with plush bolster pillows.
              </p>
              <p>
                Unlike massive multi-deck houseboats that are restricted to wide, noisy commercial channels, a Shikara is compact and nimble. It can glide smoothly beneath low concrete footbridges and venture into shallow village canals where true local life happens.
              </p>
              <p>
                It produces minimal engine disturbance, creating a whisper-quiet, personal journey that lets you hear the breeze in the coconut palms and birds calling across the water.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-4 text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1.5 text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Shaded Canopy from Sun & Rain</span>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Plush Cushioned Seating</span>
            </span>
          </div>
        </div>

        {/* Card 2: What You Will See on the Water */}
        <div className="bg-white rounded-3xl p-7 sm:p-9 shadow-card border border-slate-200/90 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-6">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-sans tracking-tight mb-4">
              What Will You See Along the Route?
            </h3>
            <ul className="space-y-3.5 text-sm text-slate-600 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                <span>
                  <strong className="text-slate-900">Canal-side Village Homes:</strong> Glimpse daily morning routines, children walking across rustic bridges, and friendly locals waving from flower-filled riverbank gardens.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                <span>
                  <strong className="text-slate-900">Traditional Coir Weaving:</strong> Watch local village women spin natural coconut husks into golden coir yarn using wooden spinning wheels.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                <span>
                  <strong className="text-slate-900">Below-Sea-Level Paddy Fields:</strong> In Kuttanad, emerald rice fields stretch below sea level, protected by ancient earthen dikes—the only place in India with farming below ocean level.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                <span>
                  <strong className="text-slate-900">Open Vembanad Lake:</strong> Transition from narrow tree-canopied canals onto India’s longest freshwater lake, where refreshing breezes and golden sunlight unfold across the horizon.
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-4 text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1.5 text-emerald-800">
              <Trees className="w-4 h-4 text-emerald-600" />
              <span>Exotic Backwater Flora & Birds</span>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-800">
              <Sun className="w-4 h-4 text-emerald-600" />
              <span>Panoramic Sunset Crossing</span>
            </span>
          </div>
        </div>

      </div>

    </section>
  );
}
