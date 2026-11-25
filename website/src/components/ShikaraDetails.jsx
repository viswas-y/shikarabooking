import React, { useState, useRef } from 'react';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  Send, 
  Check, 
  AlertCircle,
  Calendar,
  Phone,
  Mail,
  User,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Compass,
  Heart,
  Tag,
  Coffee,
  Trees,
  Waves,
  Anchor,
  Lock
} from 'lucide-react';
import { submitBooking } from '../api';

export default function ShikaraDetails({ shikara, settings }) {
  const cardsScrollRef = useRef(null);
  const bookingFormRef = useRef(null);

  // 4 Popular Destination/Cruise Cards with authentic Kerala Backwater details & photos
  const cruisePackages = [
    {
      id: 'dur-2h',
      name: 'Punnamada & Village Canals',
      subtitle: 'Morning Canal Glimpse',
      duration: '2 Hours Cruise',
      price: '₹2,400',
      rating: '4.8',
      reviews: '140+',
      imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
      location: 'Punnamada Lake, Alleppey',
      capacity: 'Up to 8 Guests',
      boatType: '100% Private Shikara',
      inclusions: ['Private boat with captain', 'Life jackets for all', 'Bottled mineral water'],
      description: 'Cruises through Punnamada Lake, starting point of the Nehru Trophy Boat Race, and enters quiet village canals.'
    },
    {
      id: 'dur-3h',
      name: 'Kainakary Heritage Waterways',
      subtitle: 'Classic Backwaters Cruise',
      duration: '3 Hours Cruise',
      price: '₹3,400',
      rating: '5.0',
      reviews: '380+',
      imageUrl: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
      location: 'Kainakary Canals, Alleppey',
      recommended: true,
      capacity: 'Up to 8 Guests',
      boatType: '100% Private Shikara',
      inclusions: ['Private boat with guide', 'Complimentary tender coconut', 'Life jackets & bird binoculars'],
      description: 'Deeper voyage through narrow Kainakary village canals, scenic paddy fields below sea level, and migratory bird spots.'
    },
    {
      id: 'dur-4h',
      name: 'Champakulam Lotus Sanctuaries',
      subtitle: 'Deep Backwaters Explorer',
      duration: '4 Hours Cruise',
      price: '₹4,400',
      rating: '4.9',
      reviews: '220+',
      imageUrl: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=800&q=80',
      location: 'Champakulam & River Pamba',
      capacity: 'Up to 8 Guests',
      boatType: '100% Private Shikara',
      inclusions: ['Extended canal itinerary', 'Historic church & artisan stops', 'Tender coconut & refreshments'],
      description: 'Comprehensive route visiting remote artisan hamlets, heritage water locks, and tranquil lotus sanctuaries.'
    },
    {
      id: 'dur-sunset',
      name: 'Golden Hour Sunset Waters',
      subtitle: 'Evening Serenity Cruise',
      duration: '2.5 Hours Cruise',
      price: '₹3,000',
      rating: '4.9',
      reviews: '190+',
      imageUrl: 'https://images.unsplash.com/photo-1621245781329-a1b9195b0720?auto=format&fit=crop&w=800&q=80',
      location: 'Punnamada Sunset Vista',
      capacity: 'Up to 8 Guests',
      boatType: '100% Private Shikara',
      inclusions: ['Golden hour photography spots', 'Romantic cushioned lounge', 'Complimentary refreshments'],
      description: 'Tranquil evening cruise timed with golden hour sunset over wide serene waters of Punnamada Lake.'
    }
  ];

  const categoryChips = [
    { label: 'Village Canals' },
    { label: 'Nature & Birds' },
    { label: 'Sunset Waters' },
    { label: 'Honeymoon Cruise' },
    { label: 'Family Comfort' },
    { label: 'Kerala Heritage' }
  ];

  const [selectedPackage, setSelectedPackage] = useState(cruisePackages[1]);
  const [isFormHighlighted, setIsFormHighlighted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    guests: '2',
    durationId: 'dur-3h',
    durationLabel: 'Classic Backwaters Cruise (3 Hours)',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const todayDateStr = new Date().toISOString().split('T')[0];

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
    setFormData((prev) => ({
      ...prev,
      durationId: pkg.id,
      durationLabel: `${pkg.subtitle} (${pkg.duration} — ${pkg.price})`
    }));
  };

  const scrollToBooking = (pkg) => {
    if (pkg) handleSelectPackage(pkg);
    setIsFormHighlighted(true);
    setTimeout(() => {
      setIsFormHighlighted(false);
    }, 2500);

    if (bookingFormRef.current) {
      bookingFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const scrollCards = (direction) => {
    if (cardsScrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      cardsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const result = await submitBooking(formData);
      setSubmissionSuccess(result.booking || { ...formData, id: 'bkg-' + Date.now() });
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong while submitting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="shikara-details" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-[1360px] mx-auto space-y-16">
      
      {/* =========================================================================
          1. POPULAR DESTINATIONS / CRUISES (Matching Pomaii Reference Layout)
          ========================================================================= */}
      {/* =========================================================================
          1. POPULAR SHIKARA CRUISES (Exact Nepalora Model + Editorial Typography)
          ========================================================================= */}
      <div>
        {/* Section Heading Row (Nepalora Model) */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase mb-4">
            YOUR JOURNEY
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight font-sans leading-tight">
            Discover <span className="font-serif italic font-normal text-slate-800">Our Most</span>
            <br />
            Popular Shikara Cruises
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-3 max-w-lg mx-auto">
            Handcrafted wooden Shikara cruising into peaceful shallow canals where large boats cannot go. All voyages are 100% private.
          </p>
        </div>

        {/* Slide Carousel Showcase of Cards: Horizontal Slide/Swipe Model on Mobile, 4-Col Grid on Desktop */}
        <div 
          ref={cardsScrollRef}
          className="flex lg:grid lg:grid-cols-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory gap-4 sm:gap-6 pb-6 pt-2 px-1 sm:px-0 no-scrollbar scroll-smooth"
        >
          {cruisePackages.map((pkg) => {
            const isSelected = selectedPackage.id === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => scrollToBooking(pkg)}
                className={`relative min-h-[440px] sm:min-h-[460px] w-[84vw] sm:w-[340px] lg:w-auto flex-shrink-0 snap-center rounded-[32px] overflow-hidden flex flex-col justify-between p-5 sm:p-6 cursor-pointer transition-all duration-300 group shadow-soft hover:shadow-2xl ${
                  isSelected ? 'ring-4 ring-[#163b2f] scale-[1.01]' : 'hover:scale-[1.01]'
                }`}
              >
                {/* Full-bleed Photo Background */}
                <img
                  src={pkg.imageUrl}
                  alt={pkg.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30 pointer-events-none" />

                {/* Top Row: Star Rating Badge (Left) & Selected Indicator (Right) */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{pkg.rating}</span>
                    <span className="text-[10px] text-slate-300 font-normal">({pkg.reviews})</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {pkg.recommended && (
                      <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300 bg-amber-950/80 border border-amber-500/40 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                        Popular
                      </span>
                    )}
                    {isSelected && (
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#163b2f] text-white text-[11px] font-bold shadow-md border border-emerald-400/40">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Selected</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Row: Name, Price, Description, Badges & White Button (Nepalora Model) */}
                <div className="relative z-10 text-white mt-auto pt-4">
                  {/* Title and Price in One Row */}
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white font-sans leading-snug group-hover:text-amber-200 transition-colors">
                      {pkg.name}
                    </h3>
                    <div className="text-right flex-shrink-0">
                      <span className="block text-lg sm:text-xl font-extrabold text-white font-sans leading-none">
                        {pkg.price}
                      </span>
                    </div>
                  </div>

                  {/* Subtitle / Description line */}
                  <p className="text-xs text-slate-300 font-normal line-clamp-2 leading-relaxed mb-3">
                    {pkg.description || `${pkg.subtitle} • Tranquil cruising across scenic village canals.`}
                  </p>

                  {/* Badges row: duration + capacity */}
                  <div className="flex items-center gap-2 mb-3.5">
                    <span className="px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-md text-[10px] sm:text-[11px] font-medium text-slate-200 border border-white/10">
                      {pkg.duration}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-md text-[10px] sm:text-[11px] font-medium text-slate-200 border border-white/10">
                      {pkg.capacity}
                    </span>
                  </div>

                  {/* Pure White Capsule Button (Exact Nepalora Model) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollToBooking(pkg);
                    }}
                    className="w-full py-2.5 sm:py-3 px-5 rounded-full text-xs sm:text-sm font-bold bg-white hover:bg-slate-100 text-slate-900 shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95"
                  >
                    <span>Explore & Book</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-900" />
                  </button>

                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation Arrow Controls (Exact Nepalora Model) */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => scrollCards('left')}
            className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-sm transition-all hover:scale-105 active:scale-95"
            aria-label="Previous cruise"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs sm:text-sm font-semibold text-slate-700 tracking-wide">
            View All Cruises & Reserve
          </span>
          <button
            type="button"
            onClick={() => scrollCards('right')}
            className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-sm transition-all hover:scale-105 active:scale-95"
            aria-label="Next cruise"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>


      </div>

      {/* =========================================================================
          2. ABOUT BOOKSHIKARA (Exact Nepalora 3-Card & Stats Layout)
          ========================================================================= */}
      <div className="space-y-10">
        
        {/* Header row with pill tag and editorial quote */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
          <div className="inline-block self-start px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase">
            ABOUT BOOKSHIKARA
          </div>
          <p className="max-w-xl text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
            BookShikara is more than a cruise — it’s an authentic voyage. Handcrafted from indigenous Anjili wood, every experience brings you closer to peaceful canals, local culture, and untouched backwater life.
          </p>
        </div>

        {/* 3-Card Grid (Exact Nepalora Model) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Dark Card (Journeys made personal) */}
          <div className="bg-[#0f2921] text-white rounded-[32px] p-7 flex flex-col justify-between shadow-soft">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-emerald-400">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-lg text-white mb-2 font-sans">
                Journeys Made Personal
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Travel at your own pace, discover hidden village tributaries and experience Alleppey beyond the usual tourist routes — authentic, quiet, and private.
              </p>
            </div>
            <div className="pt-6">
              <button
                type="button"
                onClick={() => scrollToBooking(selectedPackage)}
                className="w-full py-3 px-4 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all text-center"
              >
                Tailor-Made Cruise →
              </button>
            </div>
          </div>

          {/* Card 2: Center Image Card (User's authentic family boat photo!) */}
          <div className="relative rounded-[32px] overflow-hidden min-h-[280px] shadow-soft group">
            <img
              src="/images/hero-shikara.jpg"
              alt="Authentic BookShikara experience"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute top-5 left-5">
              <span className="px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                Made for You
              </span>
            </div>
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <h4 className="font-bold text-base text-white">Handcrafted Wooden Lounging</h4>
              <p className="text-xs text-slate-300 mt-0.5">Plush cushions, bamboo shades & open views.</p>
            </div>
          </div>

          {/* Card 3: 50+ Canal Pathways Card */}
          <div className="bg-white rounded-[32px] p-7 border border-slate-200/90 shadow-soft flex flex-col justify-between">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-sans">50+</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Unique Canal Routes</div>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Carefully selected waterway paths designed to reveal the real beauty, culture and quiet serenity of Alleppey.
              </p>
            </div>
            <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Canal Exploration</span>
                <span className="text-emerald-700 font-bold">●●●●●●●● 4.9</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Scenic Sunset</span>
                <span className="text-amber-600 font-bold">●●●●●●●● 5.0</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Serene Comfort</span>
                <span className="text-teal-700 font-bold">●●●●●●●● 4.8</span>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Item Stats Row (Exact Nepalora Model: 8,000+m | 100+ | 50+ | 4 Seasons) */}
        <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-slate-200/80 shadow-soft">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div className="pt-2 sm:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-sans">500+</div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Cruises Completed</div>
            </div>
            <div className="pt-2 sm:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-sans">100%</div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Private To Your Group</div>
            </div>
            <div className="pt-2 sm:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-500 font-sans flex items-center justify-center gap-1">
                <span>4.9</span>
                <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              </div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Average Guest Rating</div>
            </div>
            <div className="pt-2 sm:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-sans">8 Guests</div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Maximum Capacity</div>
            </div>
          </div>
        </div>

      </div>

      {/* =========================================================================
          5. BOAT SPECIFICATIONS & INTERACTIVE BOOKING FORM
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-6">
        
        {/* Left Column: Specifications, Capacity & Amenities */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Specifications Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 font-sans">
              Handcrafted Native Anjili Wood Build
            </h3>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm mb-6">
              {shikara?.description || 'Handcrafted by master boat builders using indigenous Anjili wood, BookShikara is a traditional Kerala shikara engineered for tranquil cruising. Featuring plush cushions, woven bamboo blinds for weather comfort, and an ultra-quiet four-stroke engine, BookShikara delivers an authentic, private, and leisurely voyage.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-pomaii-lightGreen/60 border border-pomaii-lightGreen">
                <div className="p-2.5 rounded-xl bg-pomaii-green text-white flex-shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-pomaii-green uppercase tracking-wider">Capacity</span>
                  <span className="text-sm font-bold text-slate-900">{shikara?.capacity || 'Up to 8 Guests'}</span>
                  <span className="block text-xs text-slate-500">Entire boat private</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <div className="p-2.5 rounded-xl bg-emerald-700 text-white flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Operating Hours</span>
                  <span className="text-sm font-bold text-slate-900">06:00 AM – 06:30 PM</span>
                  <span className="block text-xs text-slate-500">Morning & Sunset Slots</span>
                </div>
              </div>
            </div>
          </div>

          {/* Included Onboard Amenities */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2 font-sans">
              Included Onboard Amenities
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Equipped for comfortable, quiet, and safe sailing on village waterways.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {(shikara?.amenities || [
                'Plush, deep-cushioned seating & backrests',
                'Natural woven bamboo roll-up weather blinds',
                'Certified adult & child life jackets for all',
                'Experienced licensed local captain & guide',
                'Ultra-silent, eco-compliant four-stroke engine',
                'Complimentary bottled spring water & tender coconut',
                'Binoculars available for bird watching',
                'First-aid medical safety kit onboard'
              ]).map((amenity, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-pomaii-lightGreen/40 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-pomaii-green flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-800 font-medium leading-snug">
                    {amenity}
                  </span>
                </div>
              ))}
            </div>

            {/* Boarding Point */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Departure & Boarding Jetty
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-800">
                  {shikara?.departureLocation || 'Finishing Point Jetty, Punnamada, Alappuzha (Alleppey), Kerala'}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Booking Form */}
        <div ref={bookingFormRef} id="booking-form" className="lg:col-span-5 lg:sticky lg:top-24 scroll-mt-28">
          <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-card border transition-all duration-500 relative overflow-hidden ${
            isFormHighlighted 
              ? 'border-emerald-600 ring-4 ring-emerald-500/40 shadow-[0_15px_40px_rgba(16,185,129,0.25)] scale-[1.01]' 
              : 'border-slate-200/90'
          }`}>
            
            {/* Top Green Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pomaii-green via-emerald-400 to-pomaii-green" />

            <div className="mb-5">
              <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md inline-block">
                Direct Reservation
              </span>
              <p className="text-xs text-slate-500 mt-2">
                Private Shikara Houseboat • Punnamada Jetty, Alleppey
              </p>
            </div>

            {/* Selected Package Details Card (Dynamic Summary of clicked card) */}
            <div className="mb-6 rounded-2xl bg-[#163b2f]/5 border border-[#163b2f]/20 p-4 transition-all">
              <div className="flex items-start gap-3.5">
                <img
                  src={selectedPackage.imageUrl}
                  alt={selectedPackage.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover flex-shrink-0 shadow-sm border border-white"
                />
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#163b2f] bg-[#163b2f]/10 px-2 py-0.5 rounded">
                      Selected Route
                    </span>
                    <span className="text-base sm:text-lg font-extrabold text-emerald-700 font-sans">
                      {selectedPackage.price}
                    </span>
                  </div>
                  <h4 className="font-sans font-bold text-sm sm:text-base text-slate-900 mt-1 truncate">
                    {selectedPackage.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium">
                    {selectedPackage.subtitle} • <strong className="text-[#163b2f]">{selectedPackage.duration}</strong>
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] font-semibold text-slate-700">
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200 inline-flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#163b2f]" />
                      <span>{selectedPackage.capacity || 'Up to 8 Guests'}</span>
                    </span>
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200 inline-flex items-center gap-1">
                      <Anchor className="w-3 h-3 text-[#163b2f]" />
                      <span>100% Private Boat</span>
                    </span>
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200 inline-flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#163b2f]" />
                      <span>Captain &amp; Safety</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {submissionSuccess ? (
              /* Success State */
              <div className="py-8 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-pomaii-lightGreen text-pomaii-green mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 font-sans">
                  Booking Request Sent!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                  Thank you, <strong className="text-slate-900">{submissionSuccess.name}</strong>! Your enquiry for{' '}
                  <strong className="text-slate-900">{submissionSuccess.date}</strong> has been received by the boat master.
                </p>

                <div className="bg-slate-50 p-4 rounded-2xl text-left text-xs space-y-1.5 border border-slate-200">
                  <div><span className="font-semibold text-slate-500">Package:</span> {submissionSuccess.durationLabel}</div>
                  <div><span className="font-semibold text-slate-500">Guests:</span> {submissionSuccess.guests} persons</div>
                  <div><span className="font-semibold text-slate-500">Contact:</span> {submissionSuccess.phone}</div>
                </div>

                <div className="pt-2 flex flex-col gap-2.5">
                  {settings?.whatsapp && (
                    <a
                      href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20BookShikara,%20I%20just%20submitted%20a%20booking%20for%20${submissionSuccess.date}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-md transition-colors"
                    >
                      <span>Chat Instantly on WhatsApp</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setSubmissionSuccess(null)}
                    className="text-xs text-pomaii-green hover:underline font-semibold mt-2"
                  >
                    Submit another inquiry
                  </button>
                </div>
              </div>
            ) : (
              /* Booking Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-pomaii-green focus:ring-2 focus:ring-pomaii-green/15"
                    />
                  </div>
                </div>

                {/* Phone & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 ..."
                        className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-pomaii-green focus:ring-2 focus:ring-pomaii-green/15"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@mail.com"
                        className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-pomaii-green focus:ring-2 focus:ring-pomaii-green/15"
                      />
                    </div>
                  </div>
                </div>

                {/* Cruise Date & Number of Guests Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Cruise Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="date"
                        name="date"
                        required
                        min={todayDateStr}
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-pomaii-green focus:ring-2 focus:ring-pomaii-green/15"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Travelers * (Max 8)
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-pomaii-green focus:ring-2 focus:ring-pomaii-green/15 bg-white"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 Persons (Couple)</option>
                        <option value="3">3 Persons</option>
                        <option value="4">4 Persons</option>
                        <option value="5">5 Persons</option>
                        <option value="6">6 Persons</option>
                        <option value="7">7 Persons</option>
                        <option value="8">8 Persons (Max)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Cruise Package Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Selected Cruise Route
                  </label>
                  <select
                    value={selectedPackage.id}
                    onChange={(e) => {
                      const pkg = cruisePackages.find(p => p.id === e.target.value);
                      if (pkg) handleSelectPackage(pkg);
                    }}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-pomaii-green focus:ring-2 focus:ring-pomaii-green/15 bg-white font-medium"
                  >
                    {cruisePackages.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — {p.duration} ({p.price})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Special Requests / Notes
                  </label>
                  <textarea
                    name="message"
                    rows="2"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Timing preference (sunrise / sunset), celebration, special requests..."
                    className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-pomaii-green focus:ring-2 focus:ring-pomaii-green/15"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#163b2f] hover:bg-[#0f2921] text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-200 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Sending Request...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Confirm & Send Enquiry ({selectedPackage.price})</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-slate-400 mt-1 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3 text-slate-400 inline" />
                  <span>No advance payment needed online. Boat master confirms availability directly.</span>
                </p>
              </form>
            )}

          </div>
        </div>

      </div>

    </section>
  );
}
