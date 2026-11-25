import React from 'react';
import { ArrowLeft, Navigation, Car, Train, Clock, ArrowRight } from 'lucide-react';
import { shikaraConfig } from '../config/shikaraConfig';

export default function FromKochiPage({ onNavigate }) {
  const whatsappUrl = `https://wa.me/${shikaraConfig.whatsappNumber}?text=${encodeURIComponent(
    'Hello BookShikara! I am planning a day trip from Kochi to Alleppey for a private Shikara ride.'
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
        <div className="inline-block px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold uppercase tracking-wider mb-3">
          DAY TRIP GUIDE
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-sans text-slate-900 tracking-tight leading-tight">
          Shikara Ride from Kochi: Complete Day Trip Guide
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
          Alleppey is situated just 55 km to 85 km south of Cochin (Fort Kochi / Ernakulam). A private Shikara ride is the top-rated day excursion for travelers staying in Kochi.
        </p>
      </div>

      {/* Travel Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        
        {/* By Taxi / Car */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-slate-200/90">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4">
            <Car className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold font-sans text-slate-900 mb-2">
            By Private Taxi / Rental Car
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <li>• <strong>Distance:</strong> ~55 km from Fort Kochi / 85 km from Kochi Airport.</li>
            <li>• <strong>Driving Time:</strong> Approx. 1 hour 30 mins via coastal NH 66 highway.</li>
            <li>• <strong>Parking:</strong> Secure, ample parking right at Punnamada Finishing Point Jetty.</li>
          </ul>
        </div>

        {/* By Train */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-slate-200/90">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4">
            <Train className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold font-sans text-slate-900 mb-2">
            By Express Train
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <li>• <strong>Stations:</strong> Ernakulam Junction (ERS) to Alappuzha (ALLP).</li>
            <li>• <strong>Travel Time:</strong> Only 50 to 70 minutes on scenic coastal rail.</li>
            <li>• <strong>Station to Jetty:</strong> Just 15 minutes by auto-rickshaw (₹120 - ₹150).</li>
          </ul>
        </div>

      </div>

      {/* Recommended Day Trip Itinerary */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200/90 mb-10">
        <h2 className="text-xl font-bold font-sans text-slate-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-700" />
          <span>Recommended 1-Day Itinerary from Kochi</span>
        </h2>
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-600">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <strong>07:30 AM:</strong> Depart Fort Kochi or Ernakulam hotel by taxi or train.
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <strong>09:30 AM:</strong> Arrive at Punnamada Jetty No. 4; meet your captain and board your private Shikara.
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <strong>09:30 AM – 12:30 PM:</strong> 3-Hour cruise through village canals and Vembanad Lake.
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <strong>12:45 PM:</strong> Enjoy traditional Kerala seafood lunch at a lakeside village restaurant.
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <strong>02:30 PM:</strong> Visit Marari Beach or Alleppey Lighthouse on your drive back to Kochi.
          </div>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <div className="text-center">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm shadow-md transition-all"
        >
          <span>Plan Your Kochi Day Trip on WhatsApp</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

    </div>
  );
}
