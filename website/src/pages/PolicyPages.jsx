import React from 'react';
import { ArrowLeft, ShieldCheck, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { shikaraConfig } from '../config/shikaraConfig';

export default function PolicyPages({ type, onNavigate }) {
  const contentMap = {
    'booking-policy': {
      title: 'Booking Policy',
      subtitle: 'Advance payment, boarding process, and scheduling guidelines',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <h3 className="font-bold text-base text-slate-900">1. Reservation & Advance</h3>
          <p>A fixed advance of ₹1,000 is required to confirm your private Shikara reservation. This advance directly reserves your boat, fuel, and dedicated captain for your chosen date and departure time slot.</p>
          
          <h3 className="font-bold text-base text-slate-900 mt-6">2. Balance Payment</h3>
          <p>The remaining balance (total fare minus ₹1,000 advance) is payable upon check-in at Jetty No. 4, Punnamada Finishing Point, Alleppey. We accept cash, Google Pay, PhonePe, and major UPI apps at the jetty.</p>

          <h3 className="font-bold text-base text-slate-900 mt-6">3. Arrival Time</h3>
          <p>Please arrive at the boarding jetty at least 15 minutes prior to your scheduled departure time to allow for safety briefing and life jacket fitting. If you expect a delay, please notify your captain via call or WhatsApp as early as possible.</p>

          <h3 className="font-bold text-base text-slate-900 mt-6">4. Rescheduling</h3>
          <p>You can reschedule your cruise date or departure time free of charge with at least 24 hours prior notice, subject to boat availability.</p>
        </div>
      )
    },
    'refund-policy': {
      title: 'Refund & Cancellation Policy',
      subtitle: 'Clear, fair cancellation terms and advance refund timeline for private Shikara rides in Alleppey',
      body: (
        <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          {/* Quick Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block mb-1">30+ Days Notice</span>
              <strong className="text-xl font-extrabold text-emerald-900 block mb-1">100% Refund</strong>
              <p className="text-xs text-emerald-800/90 leading-tight">Full refund of your advance payment with zero deduction.</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block mb-1">7 to 29 Days Notice</span>
              <strong className="text-xl font-extrabold text-amber-900 block mb-1">50% Refund</strong>
              <p className="text-xs text-amber-800/90 leading-tight">Half of your advance deposit is returned to you.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-1">Under 7 Days Notice</span>
              <strong className="text-xl font-extrabold text-slate-900 block mb-1">No Refund</strong>
              <p className="text-xs text-slate-600 leading-tight">No refund applies, including same-day no-shows.</p>
            </div>
          </div>

          {/* Section 1: Cancellation by Guest */}
          <div className="space-y-3">
            <h3 className="font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#163b2f] text-white text-xs font-bold flex items-center justify-center">1</span>
              <span>Cancellation by the Guest</span>
            </h3>
            <p>
              We understand that travel plans can change unexpectedly. Because our Shikara rides are 100% private, holding a boat reserves the vessel, fuel, and licensed captain exclusively for you, preventing other guests from booking that time slot.
            </p>
            <ul className="space-y-2 pl-2">
              <li className="flex items-start gap-2">
                <span className="text-[#163b2f] font-bold">•</span>
                <span><strong>30 days or more before arrival:</strong> Full refund — everything you have paid comes back to your account.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#163b2f] font-bold">•</span>
                <span><strong>7 to 29 days before arrival:</strong> 50% refund — half of your advance payment is returned.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#163b2f] font-bold">•</span>
                <span><strong>Less than 7 days before arrival:</strong> No refund — this includes non-arrival or failing to turn up on the day of the ride.</span>
              </li>
            </ul>
          </div>

          {/* Section 2: Cancellation by Operator */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#163b2f] text-white text-xs font-bold flex items-center justify-center">2</span>
              <span>Cancellation by BookShikara (Weather &amp; Safety)</span>
            </h3>
            <p>
              Passenger safety is our highest priority on the backwaters. If an advance-booked trip must be cancelled due to severe monsoonal weather, official government port authority safety orders, heavy water hyacinth canal blockages, or unforeseen boat technical issues, guests can choose between:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="block text-slate-900 mb-1">Option A: 100% Full Refund</strong>
                <span className="text-xs text-slate-600">Immediate full refund of your entire advance deposit with zero cancellation charges.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="block text-slate-900 mb-1">Option B: Reschedule for Free</strong>
                <span className="text-xs text-slate-600">Transfer your booking to any new available date or time slot at no additional charge.</span>
              </div>
            </div>
          </div>

          {/* Section 3: Date Changes & Rescheduling */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#163b2f] text-white text-xs font-bold flex items-center justify-center">3</span>
              <span>Date Changes &amp; Rescheduling</span>
            </h3>
            <p>
              You can change your cruise date or departure time <strong>once, free of charge</strong>, provided you submit your request at least <strong>7 days before your arrival date</strong> and an available boat slot exists on your newly requested date.
            </p>
          </div>

          {/* Section 4: Refund Processing Timeline */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#163b2f] text-white text-xs font-bold flex items-center justify-center">4</span>
              <span>Refund Processing Timeline</span>
            </h3>
            <p>
              Approved refunds are processed and credited back to your original payment method (UPI / Google Pay / Bank Account) within <strong>7 to 10 business days</strong> from the cancellation confirmation date.
            </p>
          </div>

          {/* Section 5: How to Request a Cancellation or Refund */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#163b2f] text-white text-xs font-bold flex items-center justify-center">5</span>
              <span>How to Request a Cancellation</span>
            </h3>
            <p>
              To request a cancellation or refund, simply send a message on WhatsApp or email with your <strong>Booking Name</strong>, <strong>Mobile Number</strong>, and <strong>Scheduled Cruise Date</strong>:
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${shikaraConfig.whatsappNumber}?text=${encodeURIComponent(
                  'Hello BookShikara! I would like to request a cancellation/refund for my booking.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold shadow-sm transition-all"
              >
                <span>Request via WhatsApp</span>
              </a>
              <a
                href={`mailto:${shikaraConfig.email}?subject=Refund%20Request`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-200"
              >
                <span>Email {shikaraConfig.email}</span>
              </a>
            </div>
          </div>

        </div>
      )
    },
    'privacy-policy': {
      title: 'Privacy Policy',
      subtitle: 'How we respect and safeguard your personal details',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>At BookShikara, we believe in minimal data collection. We only collect the necessary details needed to confirm your private backwater boat reservation:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Your name</li>
            <li>Your mobile/WhatsApp number (to send GPS location and boarding details)</li>
            <li>Cruise date, duration, and group count</li>
          </ul>
          <p className="mt-4">We do NOT share, sell, or disclose your contact information to any third-party marketing companies. Your details are strictly used to coordinate your boat reservation.</p>
        </div>
      )
    },
    'terms': {
      title: 'Terms of Service',
      subtitle: 'Passenger safety, boat rules, and operator responsibilities',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <h3 className="font-bold text-base text-slate-900">1. Boat Rules & Safety</h3>
          <p>All passengers must adhere to the captain’s safety instructions while on the water. Wearing approved life jackets is mandatory under Kerala Port and Inland Waterways regulations.</p>

          <h3 className="font-bold text-base text-slate-900 mt-6">2. Clean Waterways & Eco-Care</h3>
          <p>We take pride in keeping Alleppey pristine. Please do not dispose of plastics, bottles, or trash into the canals. Garbage bins are provided onboard.</p>

          <h3 className="font-bold text-base text-slate-900 mt-6">3. Passenger Capacity</h3>
          <p>Passenger count must not exceed the maximum licensed capacity of the boat (10 guests). Children under 5 ride free but must be accompanied by parents or guardians at all times.</p>
        </div>
      )
    },
    'contact': {
      title: 'Contact & Boarding Location',
      subtitle: 'Get in touch directly with our boat team in Alleppey',
      body: (
        <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <Phone className="w-5 h-5 text-[#163b2f] mb-2" />
              <strong className="block text-slate-900 font-bold mb-1">Phone & WhatsApp</strong>
              <a href={`tel:${shikaraConfig.phoneNumberClean}`} className="text-emerald-700 font-bold block mb-1">
                {shikaraConfig.phoneFormatted}
              </a>
              <span className="text-slate-500 text-xs">Available daily from 6:00 AM to 9:00 PM</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <Mail className="w-5 h-5 text-[#163b2f] mb-2" />
              <strong className="block text-slate-900 font-bold mb-1">Email Inquiries</strong>
              <a href={`mailto:${shikaraConfig.email}`} className="text-[#163b2f] font-semibold block">
                {shikaraConfig.email}
              </a>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <MapPin className="w-5 h-5 text-emerald-700 mb-2" />
            <strong className="block text-slate-900 font-bold mb-1">Boarding Jetty Location:</strong>
            <p className="text-slate-700">{shikaraConfig.jettyAddress}</p>
            <a 
              href={shikaraConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-xs font-bold text-[#163b2f] hover:underline"
            >
              Open in Google Maps ↗
            </a>
          </div>
        </div>
      )
    }
  };

  const page = contentMap[type] || contentMap['booking-policy'];

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
        <h1 className="text-3xl sm:text-5xl font-bold font-sans text-slate-900 tracking-tight leading-tight">
          {page.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2">
          {page.subtitle}
        </p>
      </div>

      {/* Main Content Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-9 shadow-card border border-slate-200/90 mb-10">
        {page.body}
      </div>

    </div>
  );
}
