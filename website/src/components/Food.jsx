import React from 'react';
import { Utensils, Coffee, Check, Sparkles } from 'lucide-react';
import { resolveImageUrl } from '../api';

export default function Food({ food }) {
  const items = food || [];

  return (
    <section id="food" className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div>
        
        {/* Section Heading Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
                Onboard Dining & Refreshments
              </h2>
              <Utensils className="w-6 h-6 text-[#163b2f]" />
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
              Freshly prepared traditional Kerala delicacies and refreshments served directly onboard your cruise.
            </p>
          </div>

          <a
            href="#shikara-details"
            className="text-xs font-bold text-pomaii-green bg-pomaii-lightGreen px-4 py-2 rounded-full self-start sm:self-auto hover:bg-pomaii-green hover:text-white transition-colors"
          >
            Pre-order with Booking →
          </a>
        </div>

        {/* Food Items Grid (Pomaii rounded card style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {items.map((item, index) => {
            const imgUrl = resolveImageUrl(item.imageUrl);
            return (
              <div
                key={item.id || index}
                className="group bg-white rounded-[28px] overflow-hidden border border-slate-200/90 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between"
              >
                {/* Photo & Price Tag */}
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={imgUrl}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Floating Price Pill */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md">
                    <span className="font-sans font-extrabold text-pomaii-green text-sm sm:text-base">
                      {item.price}
                    </span>
                  </div>
                  {item.category && (
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {item.category}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-sans text-lg font-bold text-slate-900 mb-1.5 group-hover:text-pomaii-green transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                      <Check className="w-3.5 h-3.5" />
                      Cooked fresh on order
                    </span>
                    <a
                      href="#shikara-details"
                      className="text-emerald-700 hover:text-emerald-800 font-bold"
                    >
                      Pre-order ↗
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dietary Note Card (Curved Pomaii Container) */}
        <div className="mt-12 p-6 sm:p-8 rounded-[32px] bg-pomaii-surface border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-pomaii-lightGreen text-pomaii-green flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-base text-slate-900">
                Special Dietary or Catch-of-the-Day Requests?
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Vegetarian Sadhya, Jain food, or fresh lake prawns can be arranged upon prior booking notice.
              </p>
            </div>
          </div>
          <a
            href="#shikara-details"
            className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors flex-shrink-0"
          >
            Mention in Booking
          </a>
        </div>

      </div>
    </section>
  );
}
