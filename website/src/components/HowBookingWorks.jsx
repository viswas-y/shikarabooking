import React from 'react';
import { ArrowRight } from 'lucide-react';
import { shikaraConfig } from '../config/shikaraConfig';

export default function HowBookingWorks({ onBookNowClick }) {
  return (
    <section id="how-it-works" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-[1360px] mx-auto scroll-mt-20">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
        <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase mb-4">
          SIMPLE 4-STEP RESERVATION
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight font-sans leading-tight">
          How Booking Works <br />
          <span className="font-serif italic font-normal text-slate-800">Direct on WhatsApp • Pay Balance at Jetty</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-normal mt-3 max-w-2xl mx-auto leading-relaxed">
          No complicated app downloads or online payment gateways. Just personal confirmation with your local boat captain.
        </p>
      </div>

      {/* 4 Steps Horizontal / Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {shikaraConfig.bookingSteps.map((step, idx) => (
          <div
            key={step.step}
            className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-slate-200/90 relative flex flex-col justify-between"
          >
            <div>
              {/* Step Number Badge */}
              <div className="w-10 h-10 rounded-2xl bg-[#163b2f] text-white font-mono font-bold text-sm flex items-center justify-center mb-5 shadow-sm">
                {step.step}
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-sans tracking-tight mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {step.desc}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-400">
              {idx === 0 && '2h, 3h or 4h'}
              {idx === 1 && 'Instant reply'}
              {idx === 2 && 'UPI / Google Pay'}
              {idx === 3 && 'Punnamada Jetty'}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA trigger */}
      <div className="mt-10 text-center">
        <a
          href="#booking-widget"
          onClick={onBookNowClick}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#163b2f] hover:bg-[#0f2921] text-white font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95"
        >
          <span>Calculate Price & Reserve Now</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

    </section>
  );
}
