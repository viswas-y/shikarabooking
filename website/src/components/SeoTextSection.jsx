import React from 'react';
import { Compass, DollarSign, Ship, MapPin } from 'lucide-react';

export default function SeoTextSection({ onNavigate }) {
  return (
    <section id="guide" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-[1360px] mx-auto scroll-mt-20">

      {/* Short & Clean Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
        <div className="inline-block px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#163b2f] uppercase mb-2">
          TRAVEL GUIDE
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans leading-tight">
          Planning Guide
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1.5 max-w-md mx-auto leading-relaxed">
          Tips from local boatmen on ride timings, route stops, and booking.
        </p>
      </div>

      {/* 4 In-Depth Guide Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Card 1: Which Ride Duration to Choose? */}
        <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-card border border-slate-200/90">
          <div className="w-10 h-10 rounded-2xl bg-[#163b2f]/10 text-[#163b2f] flex items-center justify-center mb-4">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-sans tracking-tight mb-3">
            Which Ride Duration Should You Choose?
          </h3>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            <p>
              <strong>2 Hours (₹2,000):</strong> Perfect if you are on a day tour between Kochi and Kovalam or have limited time. You get a swift, peaceful cruise along the Nehru Trophy race track and into authentic residential village canals.
            </p>
            <p>
              <strong>3 Hours (₹3,000 - Recommended):</strong> Our most booked ride. It gives you enough time to venture deep into narrow, palm-canopied canals, observe coir spinning, and still sail out onto the vast, open waters of Vembanad Lake for the cooling breeze.
            </p>
            <p>
              <strong>4 Hours (₹4,000):</strong> The definitive experience for photographers, birdwatchers, and slow travelers. It reaches the remote below-sea-level paddy fields of Kuttanad and quiet water lily lagoons that short cruises never reach.
            </p>
          </div>
        </div>

        {/* Card 2: Cost Per Person Breakdown */}
        <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-card border border-slate-200/90">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
            <DollarSign className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-sans tracking-tight mb-3">
            How Much Does a Shikara Ride Cost Per Person?
          </h3>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            <p>
              Unlike commercial sightseeing ferries, our pricing is strictly <strong>per boat</strong>, which makes it exceptionally affordable for couples, families, and small friend circles.
            </p>
            <p>
              On a 2-hour cruise (₹2,000):
              <br />• 2 guests = <strong>₹1,000 per person</strong>
              <br />• 4 guests = <strong>₹500 per person</strong>
              <br />• 6 guests = <strong>₹333 per person</strong>
            </p>
            <p>
              Children under 5 ride free. You pay just ₹1,000 in advance to lock the boat, and settle the remaining balance in cash or UPI when you arrive at the jetty.
            </p>
          </div>
        </div>

        {/* Card 3: Shikara vs Houseboat */}
        <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-card border border-slate-200/90">
          <div className="w-10 h-10 rounded-2xl bg-[#163b2f]/10 text-[#163b2f] flex items-center justify-center mb-4">
            <Ship className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-sans tracking-tight mb-3">
            Shikara vs Houseboat: Which is Better for Day Cruising?
          </h3>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            <p>
              Houseboats are large floating villas designed primarily for overnight stays. However, because of their massive size and deep hulls, they cannot enter narrow village canals and are restricted to congested commercial highways. Day houseboat rentals typically start around ₹9,000 to ₹15,000.
            </p>
            <p>
              A <strong>Shikara boat</strong> costs 70% less (starting at just ₹2,000), glides quietly with minimal diesel fumes, passes under low footbridges, and brings you directly beside village life, blooming lotus ponds, and calm shallow streams.
            </p>
            <p>
              For daytime sightseeing in Alleppey, a private Shikara is universally praised as the more genuine and serene experience.
            </p>
          </div>
        </div>

        {/* Card 4: How to Reach the Boarding Jetty */}
        <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-card border border-slate-200/90">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-sans tracking-tight mb-3">
            How to Reach Punnamada Jetty, Alleppey
          </h3>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            <p>
              All our cruises depart from <strong>Jetty No. 4, Punnamada Finishing Point</strong>, Alappuzha (the historic venue of the Nehru Trophy Snake Boat Race).
            </p>
            <p>
              • <strong>From Alleppey Railway Station (ALLP):</strong> Approx. 5.5 km (15 minutes by auto-rickshaw or taxi).
              <br />• <strong>From Alappuzha KSRTC Bus Stand:</strong> Approx. 3 km (8 to 10 minutes).
              <br />• <strong>From Cochin International Airport (COK):</strong> Approx. 85 km (2 to 2.5 hours via NH 66).
            </p>
            <p>
              The jetty features dedicated parking for private cars, clean waiting lounges, and direct boat ramp access. Exact GPS coordinates are sent to your WhatsApp immediately upon booking.
            </p>
          </div>
        </div>

      </div>

    </section>
  );
}
