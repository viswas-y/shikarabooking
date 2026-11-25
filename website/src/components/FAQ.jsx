import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const list = faqs || [];

  return (
    <section id="faqs" className="py-16 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="bg-white rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 border border-slate-200/90 shadow-soft">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-pomaii-green uppercase bg-pomaii-lightGreen px-3.5 py-1.5 rounded-full mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm font-normal mt-2 leading-relaxed">
            Everything you need to know about cruising on BookShikara in Alleppey.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3.5">
          {list.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id || index}
                className={`rounded-2xl transition-all duration-200 border ${
                  isOpen
                    ? 'bg-pomaii-lightGreen/30 border-pomaii-green/30 shadow-sm'
                    : 'bg-slate-50/70 hover:bg-slate-50 border-slate-200/70'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans font-bold text-sm sm:text-base text-slate-900">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-pomaii-green text-white rotate-180'
                        : 'bg-white text-slate-700 shadow-sm'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-200/50 animate-fade-in font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
