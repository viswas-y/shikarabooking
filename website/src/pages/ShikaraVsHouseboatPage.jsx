import React from 'react';
import { ArrowLeft, Check, X, ArrowRight, ShieldCheck, Ship, Anchor } from 'lucide-react';
import { shikaraConfig } from '../config/shikaraConfig';

export default function ShikaraVsHouseboatPage({ onNavigate }) {
  const whatsappUrl = `https://wa.me/${shikaraConfig.whatsappNumber}?text=${encodeURIComponent(
    'Hello BookShikara! I am comparing Shikara vs Houseboat and would like to book a private Shikara ride.'
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
        <div className="inline-block px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
          HONEST COMPARISON
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-sans text-slate-900 tracking-tight leading-tight">
          Shikara vs Houseboat in Alleppey
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
          Wondering whether to hire a private Shikara boat or a Houseboat for your daytime backwaters cruise? Here is a factual, side-by-side comparison to help you choose wisely.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200/90 mb-10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-slate-200 text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="pb-3 font-extrabold">Feature / Criterion</th>
                <th className="pb-3 font-extrabold text-[#163b2f] bg-emerald-50/60 px-3 py-2 rounded-t-xl">
                  Private Shikara Boat
                </th>
                <th className="pb-3 font-extrabold text-slate-700 px-3 py-2">
                  Traditional Houseboat
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-4 font-bold text-slate-900">Day Rental Cost</td>
                <td className="py-4 px-3 bg-emerald-50/30 font-bold text-emerald-800">
                  ₹2,000 – ₹4,000 total (70% cheaper)
                </td>
                <td className="py-4 px-3 text-slate-600">
                  ₹9,000 – ₹16,000+ for day cruise
                </td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-slate-900">Narrow Canal Access</td>
                <td className="py-4 px-3 bg-emerald-50/30 font-bold text-emerald-800">
                  Yes, slips into shallow residential canals &amp; under low bridges
                </td>
                <td className="py-4 px-3 text-slate-600">
                  No, too large and deep-drafted; restricted to wide commercial lakes
                </td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-slate-900">Seating &amp; Comfort</td>
                <td className="py-4 px-3 bg-emerald-50/30 text-slate-700">
                  Cushioned mattress lounge, bolster pillows, shaded open canopy
                </td>
                <td className="py-4 px-3 text-slate-600">
                  Dining tables, sofas, bedrooms, upper deck
                </td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-slate-900">Noise &amp; Engine Fumes</td>
                <td className="py-4 px-3 bg-emerald-50/30 font-bold text-emerald-800">
                  Whisper-quiet cruising; zero trapped exhaust fumes
                </td>
                <td className="py-4 px-3 text-slate-600">
                  Heavier diesel engine noise and generator vibrations
                </td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-slate-900">Best Purpose</td>
                <td className="py-4 px-3 bg-emerald-50/30 font-bold text-emerald-800">
                  Daytime sightseeing, authentic village life, sunset cruises
                </td>
                <td className="py-4 px-3 text-slate-600">
                  Overnight stay with bedroom, private bathroom &amp; onboard chef
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Advice */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-7 sm:p-9 mb-10 text-slate-700">
        <h2 className="text-xl font-bold font-sans text-slate-900 mb-3">
          Our Recommendation:
        </h2>
        <p className="text-xs sm:text-sm leading-relaxed mb-3">
          If you are looking to <strong>sleep overnight on the backwaters</strong> with a bedroom, AC, and a cook, choose a houseboat.
        </p>
        <p className="text-xs sm:text-sm leading-relaxed">
          If you want a <strong>2 to 4-hour daytime cruise</strong> to actually see traditional Kerala village life, palm tree canopies, coir weaving, and the open lake at a fraction of the cost, a <strong>private Shikara is undeniably the superior choice</strong>.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm shadow-md transition-all"
        >
          <span>Book Your Private Shikara on WhatsApp</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

    </div>
  );
}
