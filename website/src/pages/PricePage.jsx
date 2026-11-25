import React from 'react';
import { ArrowLeft, Check, Phone, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { shikaraConfig } from '../config/shikaraConfig';

export default function PricePage({ onNavigate }) {
  const whatsappUrl = `https://wa.me/${shikaraConfig.whatsappNumber}?text=${encodeURIComponent(
    'Hello BookShikara! I am viewing your pricing guide and would like to reserve a private Shikara boat.'
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
        <div className="inline-block px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
          100% TRANSPARENT BOAT RATES
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-sans text-slate-900 tracking-tight leading-tight">
          Shikara Ride Prices in Alleppey, Kerala
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
          Our prices are strictly <strong>per boat</strong>, not per person. A private Shikara comes with an experienced captain, full fuel, and life jackets for up to 6 guests included.
        </p>
      </div>

      {/* Main Pricing Table (Per Boat) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200/90 mb-10">
        <h2 className="text-xl font-bold font-sans text-slate-900 mb-4">
          1. Rates per Private Shikara Boat
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase font-extrabold text-slate-400 tracking-wider">
                <th className="pb-3">Ride Duration</th>
                <th className="pb-3">Coverage & Stops</th>
                <th className="pb-3">Included Guests</th>
                <th className="pb-3 text-right">Price Per Boat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {shikaraConfig.rides.map((ride) => (
                <tr key={ride.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <span>{ride.durationLabel}</span>
                      {ride.isPopular && (
                        <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 font-normal block">{ride.name}</span>
                  </td>
                  <td className="py-4 text-xs text-slate-600">{ride.stopsCount} Route Stops</td>
                  <td className="py-4 text-xs text-slate-600">Up to 6 Guests</td>
                  <td className="py-4 text-right">
                    <span className="text-xl font-extrabold text-[#163b2f] font-sans">
                      ₹{ride.basePrice.toLocaleString('en-IN')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span>• Children under 5 years ride free.</span>
          <span>• Extra guests beyond 6: ₹100 per person per hour.</span>
        </div>
      </div>

      {/* Per-Person Split Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200/90 mb-10">
        <h2 className="text-xl font-bold font-sans text-slate-900 mb-4">
          2. Per-Person Split Cost Examples
        </h2>
        <p className="text-xs text-slate-500 mb-5">
          See how dividing the private boat fare across your group makes it one of the most budget-friendly premium experiences in Alleppey:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {shikaraConfig.rides.map((ride) => (
            <div key={ride.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-sm text-slate-900 mb-2">
                {ride.durationLabel} Ride (₹{ride.basePrice})
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex justify-between">
                  <span>2 Guests:</span>
                  <strong className="text-slate-900">₹{Math.round(ride.basePrice / 2)} / person</strong>
                </li>
                <li className="flex justify-between">
                  <span>4 Guests:</span>
                  <strong className="text-slate-900">₹{Math.round(ride.basePrice / 4)} / person</strong>
                </li>
                <li className="flex justify-between">
                  <span>6 Guests:</span>
                  <strong className="text-emerald-700">₹{Math.round(ride.basePrice / 6)} / person</strong>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Payment & Advance Terms */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-3xl p-6 sm:p-8 mb-10 text-emerald-950">
        <h2 className="text-xl font-bold font-sans text-emerald-900 mb-3 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-700" />
          <span>Advance & Payment Policy</span>
        </h2>
        <ul className="space-y-2.5 text-xs sm:text-sm leading-relaxed">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span><strong>₹1,000 Advance to Reserve:</strong> Paid securely via Google Pay, PhonePe, UPI, or bank transfer to hold the boat and captain for your date and time.</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span><strong>Balance Paid at Check-in:</strong> The remaining balance is paid directly in cash or UPI when you arrive at Punnamada Boarding Jetty.</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span><strong>Free Rescheduling:</strong> Free date/time rescheduling up to 24 hours prior to departure.</span>
          </li>
        </ul>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-white rounded-3xl p-8 border border-slate-200 shadow-card">
        <h3 className="text-2xl font-bold font-sans text-slate-900 mb-2">
          Ready to Book Your Private Shikara?
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-md mx-auto">
          Send your date and preferred duration on WhatsApp for instant confirmation.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm shadow-md transition-all"
          >
            <span>Book on WhatsApp</span>
          </a>
          <a
            href={`tel:${shikaraConfig.phoneNumberClean}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all"
          >
            <Phone className="w-4 h-4 text-[#163b2f]" />
            <span>Call {shikaraConfig.phoneFormatted}</span>
          </a>
        </div>
      </div>

    </div>
  );
}
