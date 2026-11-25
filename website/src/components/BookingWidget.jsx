import React, { useState, useId } from 'react';
import { Calendar, Clock, Users, ArrowRight, ShieldCheck, Sparkles, Check, Phone, Zap } from 'lucide-react';
import { shikaraConfig, calculateRidePrice } from '../config/shikaraConfig';

export default function BookingWidget({ 
  selectedDuration = 3, 
  onDurationChange,
  id = "booking-widget" 
}) {
  const todayStr = new Date().toISOString().split('T')[0];
  const [durationHours, setDurationHours] = useState(selectedDuration);
  const [cruiseDate, setCruiseDate] = useState(todayStr);
  const [selectedTimeId, setSelectedTimeId] = useState(shikaraConfig.timeSlots[3].id); // Sunset 3:30 PM default
  const [guestCount, setGuestCount] = useState(2);
  const [specialNote, setSpecialNote] = useState('');

  // Sync with prop if it changes
  React.useEffect(() => {
    if (selectedDuration) setDurationHours(selectedDuration);
  }, [selectedDuration]);

  const handleDurationSelect = (h) => {
    setDurationHours(h);
    if (onDurationChange) onDurationChange(h);
  };

  const calculation = calculateRidePrice(durationHours, guestCount);
  const selectedTime = shikaraConfig.timeSlots.find(t => t.id === selectedTimeId) || shikaraConfig.timeSlots[0];

  // WhatsApp Message Builder
  const buildWhatsAppUrl = () => {
    const lines = [
      `*Private Shikara Booking Request - Alleppey*`,
      `• *Duration:* ${calculation.ride.durationLabel} (${calculation.ride.name})`,
      `• *Date:* ${cruiseDate}`,
      `• *Time Slot:* ${selectedTime.label}`,
      `• *Number of Guests:* ${guestCount} ${guestCount === 1 ? 'person' : 'persons'}`,
      `• *Total Boat Price:* ₹${calculation.totalPrice.toLocaleString('en-IN')}`,
      `• *Advance to Hold:* ₹${calculation.advanceAmount.toLocaleString('en-IN')}`,
      `• *Balance at Jetty:* ₹${calculation.balanceAtJetty.toLocaleString('en-IN')}`,
      specialNote ? `• *Note:* ${specialNote}` : null,
      `\nPlease confirm boat availability for this slot. Thank you!`
    ].filter(Boolean).join('\n');

    return `https://wa.me/${shikaraConfig.whatsappNumber}?text=${encodeURIComponent(lines)}`;
  };

  return (
    <div id={id} className="scroll-mt-24">
      <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-card border border-slate-200/90 relative overflow-hidden text-slate-900">
        
        {/* Top Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#163b2f] via-emerald-500 to-[#163b2f]" />

        {/* Section Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct WhatsApp Reservation</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-sans text-slate-900 tracking-tight">
            Configure Your Private Shikara Ride
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pay a small ₹1,000 advance to hold the boat. Balance paid directly at check-in at the jetty.
          </p>
        </div>

        {/* 1. Step: Select Ride Duration */}
        <div className="mb-6">
          <label className="block text-xs uppercase font-extrabold tracking-wider text-slate-600 mb-2.5">
            1. Select Cruise Duration (Price is per entire boat)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {shikaraConfig.rides.map((ride) => {
              const isSelected = durationHours === ride.durationHours;
              return (
                <button
                  key={ride.id}
                  type="button"
                  onClick={() => handleDurationSelect(ride.durationHours)}
                  className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 relative ${
                    isSelected
                      ? 'border-[#163b2f] bg-[#163b2f]/5 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  {ride.isPopular && (
                    <span className="absolute -top-2.5 right-3 text-[10px] uppercase font-bold tracking-wider text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full shadow-xs">
                      Most Popular
                    </span>
                  )}
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-base text-slate-900 font-sans">
                      {ride.durationLabel}
                    </span>
                    <span className="font-extrabold text-base text-[#163b2f] font-sans">
                      ₹{ride.basePrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {ride.name}
                  </p>
                  <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
                    <span>Up to 6 guests</span>
                    <span>{ride.stopsCount} stops</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Step: Date & Time Slot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          
          {/* Cruise Date Picker */}
          <div>
            <label className="block text-xs uppercase font-extrabold tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#163b2f]" />
              <span>2. Cruise Date</span>
            </label>
            <input
              type="date"
              value={cruiseDate}
              min={todayStr}
              onChange={(e) => setCruiseDate(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#163b2f] focus:ring-2 focus:ring-[#163b2f]/20 font-bold text-sm text-slate-900 bg-slate-50/50"
            />
          </div>

          {/* Number of Guests */}
          <div>
            <label className="block text-xs uppercase font-extrabold tracking-wider text-slate-600 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#163b2f]" />
                <span>3. Number of Guests</span>
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold lowercase">
                children &lt;5 free
              </span>
            </label>
            <select
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#163b2f] focus:ring-2 focus:ring-[#163b2f]/20 font-bold text-sm text-slate-900 bg-slate-50/50"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest' : 'Guests'} {num <= 6 ? '(Standard Boat Base)' : `(+₹${(num - 6) * shikaraConfig.pricing.extraGuestRatePerHour * durationHours} extra guest fee)`}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* 4. Step: Start Time Slot Selector */}
        <div className="mb-8">
          <label className="block text-xs uppercase font-extrabold tracking-wider text-slate-600 mb-2.5 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#163b2f]" />
            <span>4. Preferred Departure Time Slot</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {shikaraConfig.timeSlots.map((slot) => {
              const isSelected = selectedTimeId === slot.id;
              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setSelectedTimeId(slot.id)}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/80 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <span className="block font-bold text-xs sm:text-sm text-slate-900">
                    {slot.time}
                  </span>
                  <span className="block text-[10px] uppercase font-bold text-emerald-700 mt-0.5">
                    {slot.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Price Breakdown Summary Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Total Price for Private Boat
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-sans">
                  ₹{calculation.totalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  (Entire Shikara • Up to {guestCount} {guestCount === 1 ? 'guest' : 'guests'})
                </span>
              </div>
            </div>

            {/* Split per person badge */}
            <div className="sm:text-right bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[11px] text-slate-500 block">
                Approx. split cost:
              </span>
              <span className="text-sm sm:text-base font-extrabold text-[#163b2f]">
                ₹{calculation.perPersonActual.toLocaleString('en-IN')} / person
              </span>
            </div>
          </div>

          {/* Payment Terms Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs">
            <div className="flex items-center justify-between bg-white/80 p-3 rounded-xl border border-slate-200/70">
              <span className="text-slate-600 font-medium">Advance to hold boat:</span>
              <span className="font-extrabold text-slate-900 text-sm">
                ₹{calculation.advanceAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex items-center justify-between bg-white/80 p-3 rounded-xl border border-slate-200/70">
              <span className="text-slate-600 font-medium">Balance at jetty check-in:</span>
              <span className="font-extrabold text-emerald-700 text-sm">
                ₹{calculation.balanceAtJetty.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Per-person split examples for 2, 4, 6 guests */}
          <div className="mt-3 pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
            <span>Per-person split examples:</span>
            <div className="flex items-center gap-3 font-semibold text-slate-700">
              <span>2 guests: ₹{calculation.perPersonFor2} each</span>
              <span>•</span>
              <span>4 guests: ₹{calculation.perPersonFor4} each</span>
              <span>•</span>
              <span>6 guests: ₹{calculation.perPersonFor6} each</span>
            </div>
          </div>

        </div>

        {/* Action Buttons: Book on WhatsApp & Call */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          {/* Main Primary Button: WhatsApp Direct Booking */}
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.01] active:scale-[0.99]"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.41a8.16 8.16 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.81-.37-4.04-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.15 8.15 0 0 1-1.25-4.47c0-4.54 3.7-8.25 8.24-8.25zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.41 1.01 2.58c.13.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.59.21-1.09.15-1.19-.06-.1-.23-.17-.48-.29z" />
            </svg>
            <span>Book on WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Secondary Button: Call Captain */}
          <a
            href={`tel:${shikaraConfig.phoneNumberClean}`}
            className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm flex items-center justify-center gap-2 transition-all"
          >
            <Phone className="w-4 h-4 text-[#163b2f]" />
            <span>Call {shikaraConfig.phoneFormatted}</span>
          </a>

        </div>

        {/* Urgency & Trust Guarantee Footer */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 text-center sm:text-left">
          <span className="text-amber-800 font-semibold flex items-center justify-center sm:justify-start gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span>{shikaraConfig.pricing.urgencyNotice}</span>
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Free cancellation up to 24h</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
