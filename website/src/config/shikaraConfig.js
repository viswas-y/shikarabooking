/**
 * CENTRAL BOOKSHIKARA CONFIGURATION
 * All prices, contact numbers, start times, route stops, and booking rules
 * can be edited right here in this single file.
 */

export const shikaraConfig = {
  // Brand & Contact details
  brandName: 'BookShikara',
  tagline: 'Private Shikara Rides in Alleppey, Kerala',
  phoneFormatted: '+91 94470 12345',
  phoneNumberClean: '919447012345',
  whatsappNumber: '919447012345',
  email: 'bookings@bookshikara.com',
  jettyAddress: 'Jetty No. 4, Punnamada Finishing Point, Alappuzha (Alleppey), Kerala 688013',
  googleMapsUrl: 'https://maps.google.com/?q=Punnamada+Finishing+Point+Alleppey',

  // 13 Master Route Stops across Alleppey Backwaters
  masterRouteStops: [
    { number: 1, title: 'Alleppey Boat Stand', desc: 'Boarding point and captain welcome at the historic jetty stand.' },
    { number: 2, title: 'Punnamada Lake & Houseboat Stand', desc: 'Cruising past traditional moored kettuvallam houseboats into open waters.' },
    { number: 3, title: 'Nehru Trophy Race Start & Finish', desc: 'Glide across the iconic snake boat race track course.' },
    { number: 4, title: 'Kavungal Village Narrow Canals', desc: 'Enter shallow, calm tributaries shaded by rustic coconut palms.' },
    { number: 5, title: 'Kuppapuram Village Canals', desc: 'Authentic village waterways with quiet backwater life and country boats.' },
    { number: 6, title: 'Paddy Fields & Temples', desc: 'Expansive below-sea-level paddy fields and heritage riverside temples.' },
    { number: 7, title: 'Village Life & Coir Making', desc: 'Witness traditional coconut husk retting, coir spinning wheels, and rural homes.' },
    { number: 8, title: 'Vembanad Lake', desc: 'Vast open freshwater lake with refreshing cool breezes and wide horizons.' },
    { number: 9, title: 'Panackal Small Canal', desc: 'Intimate, shallow canal passages inaccessible to large motorized houseboats.' },
    { number: 10, title: 'Lake Palace Resort Front', desc: 'Picturesque island resort waterfront and scenic backwater architecture.' },
    { number: 11, title: 'Vilakkumaram Heritage Canals', desc: 'Ancient canal network flanked by lush tropical foliage and bird habitats.' },
    { number: 12, title: 'Kainakary & Kuttamangalam Bridges', desc: 'Gliding under rustic low wooden and concrete village footbridges.' },
    { number: 13, title: 'Sunset over Vembanad Lake (Sunset start)', desc: 'Magical golden-hour sunset reflections across the open waters (on sunset departures).' }
  ],

  // Pricing Logic
  pricing: {
    advanceAmount: 1000, // Fixed advance required to hold the boat (in INR)
    baseGuestLimit: 6, // Base price covers up to 6 guests
    maxGuests: 10, // Maximum allowed on a single Shikara
    extraGuestRatePerHour: 100, // INR 100 per extra guest beyond 6, per hour
    childrenUnder5Free: true,
    currencySymbol: '₹',
    urgencyNotice: 'Sunset and weekend slots fill quickly. A ₹1,000 advance confirms your boat.',
  },

  // Ride Tiers (2h, 3h, 4h cumulative routes)
  rides: [
    {
      id: 'ride-2h',
      durationHours: 2,
      durationLabel: '2 Hours',
      name: 'Glimpse of Village Canals',
      boatName: 'MS. NIDHI',
      shortDescription: 'Ideal intro cruise. Glide through narrow palm-fringed village canals and backwater homes.',
      basePrice: 2000,
      guestLimitText: 'Up to 6 guests included',
      stopsCount: 4,
      isPopular: false,
      rating: '4.9',
      reviewsCount: '180+',
      imageUrl: '/images/shikara-card1-cover.jpg',
      badge: 'Quick Glimpse',
      highlight: 'Best for travelers with tight schedules wanting genuine village canals on MS. NIDHI Shikara.',
      boatPhotos: [
        {
          url: '/images/shikara-card1-cover.jpg',
          title: 'MS. NIDHI Shikara Boat',
          caption: 'Traditional covered wooden shikara boat gliding smoothly through Alleppey backwaters.'
        },
        {
          url: '/images/shikara-card1-inside-1.jpg',
          title: 'Cane Armchairs & Captain Helm',
          caption: 'Handcrafted cane seating with headrests, cushioned side benches, and open 360° views.'
        },
        {
          url: '/images/shikara-card1-inside-2.jpg',
          title: 'Full-Length Daybed Lounger',
          caption: 'Relaxing cushioned daybed with traditional wooden pillars, canopy shade, and washbasin.'
        }
      ],
      routeStops: [
        { title: 'Punnamada Boarding Jetty', desc: 'Board your private shikara with life jackets and captain welcome.' },
        { title: 'Punnamada Lake & Houseboat Basin', desc: 'Pass traditional kettuvallam houseboats moored along the shore.' },
        { title: 'Nehru Trophy Boat Race Track', desc: 'Glide across the iconic waters where snake boat races take place.' },
        { title: 'Narrow Village Canals', desc: 'Enter shallow, shaded canals to observe local coir weaving and daily life.' }
      ]
    },
    {
      id: 'ride-3h',
      durationHours: 3,
      durationLabel: '3 Hours',
      name: 'Classic Backwaters & Lake Cruise',
      boatName: 'JOLLY CRUISE',
      shortDescription: 'Our most popular cruise! Combines deep village canal exploration with vast open lake cruising.',
      basePrice: 3000,
      guestLimitText: 'Up to 6 guests included',
      stopsCount: 6,
      isPopular: true,
      rating: '5.0',
      reviewsCount: '320+',
      imageUrl: '/images/shikara-card2-cover.jpg',
      badge: 'Most Popular',
      highlight: 'The sweet spot for relaxation, canal life, and lake views on JOLLY CRUISE Shikara.',
      boatPhotos: [
        {
          url: '/images/shikara-card2-cover.jpg',
          title: 'JOLLY CRUISE Shikara Boat',
          caption: 'Traditional arched thatched wooden shikara with bow safety railings and open sides.'
        },
        {
          url: '/images/shikara-card2-inside-1.jpg',
          title: 'Captain Helm & Cushioned Lounge',
          caption: 'Ergonomic helm seat, wooden ship wheel, cane armchairs, and mobile charging ports.'
        },
        {
          url: '/images/shikara-card2-inside-2.jpg',
          title: 'Cane Club Chairs & Relaxation Daybed',
          caption: 'Three handcrafted cane chairs with black cushions, wooden table, and yellow sunbed.'
        },
        {
          url: '/images/shikara-card2-inside-3.jpg',
          title: 'Front Helm View & Shaded Canopy',
          caption: 'Panoramic view looking past the captain wheel and front spotlight out onto the canal.'
        }
      ],
      routeStops: [
        { title: 'Punnamada Boarding Jetty', desc: 'Boarding and departure from Punnamada finishing point.' },
        { title: 'Punnamada Lake & Houseboat Stands', desc: 'Sail past majestic wooden houseboats into open channels.' },
        { title: 'Nehru Trophy Race Course', desc: 'Cruise the legendary waters of the annual Nehru Trophy race.' },
        { title: 'Deep Village Canals & Coconut Groves', desc: 'Venture through narrow, palm-shaded waterways past rural homes.' },
        { title: 'Vembanad Lake Breeze Stretch', desc: 'Emerge onto the magnificent, open blue waters of Vembanad Lake.' },
        { title: 'Sunset Island Vista', desc: 'Tranquil evening golden-hour crossing with panoramic backwater views.' }
      ]
    },
    {
      id: 'ride-4h',
      durationHours: 4,
      durationLabel: '4 Hours',
      name: 'Deep Canals & Paddy Fields Explorer',
      boatName: 'Royal Backwater Shikara',
      shortDescription: 'The ultimate immersive voyage into remote Kainakary canals and below-sea-level paddy fields.',
      basePrice: 4000,
      guestLimitText: 'Up to 6 guests included',
      stopsCount: 8,
      isPopular: false,
      rating: '4.9',
      reviewsCount: '210+',
      imageUrl: '/images/shikara-card3-cover.jpg',
      badge: 'Full Immersion',
      highlight: 'Deepest canal penetration, water lilies, and famous below-sea-level farms on Royal Shikara.',
      boatPhotos: [
        {
          url: '/images/shikara-card3-cover.jpg',
          title: 'Royal Backwater Shikara',
          caption: 'Long wooden shikara with traditional sacred bow, arched sun canopy, and yellow forward deck.'
        },
        {
          url: '/images/shikara-card3-inside-1.jpg',
          title: 'Front Bow Sunbed & Night Lighting',
          caption: 'Stainless steel curved bow railing with spacious yellow sunbed cushion and deck spotlights.'
        },
        {
          url: '/images/shikara-card3-inside-2.jpg',
          title: 'Helm Station & Night Deck Vista',
          caption: 'Carved wooden helm station looking out to illuminated backwaters and forward lounge.'
        },
        {
          url: '/images/shikara-card3-inside-3.jpg',
          title: 'Vibrant Multi-Color Mood Lighting',
          caption: 'Magical evening backwater cruise experience with illuminated canopy lighting and banquet seating.'
        },
        {
          url: '/images/shikara-card3-inside-4.jpg',
          title: 'Rear Luxury Wooden Sofa Lounge',
          caption: 'Deep cushioned blue wooden sofas with gold pillows, tea table, and warm overhead lighting.'
        }
      ],
      routeStops: [
        { title: 'Punnamada Boarding Jetty', desc: 'Departure and safety overview from Jetty No. 4.' },
        { title: 'Punnamada Lake & Houseboat Mooring', desc: 'Begin glide past anchored heritage houseboats.' },
        { title: 'Snake Boat Racing Track', desc: 'Historic waterway of Kerala boat race traditions.' },
        { title: 'Narrow Village Canals', desc: 'Village life, coir spinning wheels, and children by the water.' },
        { title: 'Open Vembanad Lake Coast', desc: 'Expansive breezy views across India’s longest freshwater lake.' },
        { title: 'Inner Kainakary Waterways', desc: 'Hidden secondary canals inaccessible to all larger motorized boats.' },
        { title: 'Kuttanad Below-Sea-Level Paddy Fields', desc: 'Farming below sea level protected by ancient earthen dykes.' },
        { title: 'Water Lily Lagoon & Duck Farms', desc: 'Stunning pink and white lotus blooms and free-ranging duck flocks.' }
      ]
    }
  ],

  // Available Daily Start Time Slots
  timeSlots: [
    { id: 'sunrise', time: '6:00 AM', label: 'Sunrise (6:00 AM)', tag: 'Mist & Birds', desc: 'Calmest water, morning mist, and chirping kingfishers.' },
    { id: 'morning', time: '9:00 AM', label: 'Morning (9:00 AM)', tag: 'Village Life', desc: 'Gentle sunshine, lively village activities, and coir weaving.' },
    { id: 'afternoon', time: '12:00 PM', label: 'Afternoon (12:00 PM)', tag: 'Shaded Canals', desc: 'Quiet waterways under heavy green palm shade; lunch stop possible.' },
    { id: 'sunset', time: '3:30 PM', label: 'Sunset (3:30 PM)', tag: 'Golden Hour', desc: 'Cool breeze, sunset colors over the open lake. High demand.' }
  ],

  // Inclusions and Optional Add-ons
  inclusions: [
    { title: '100% Private Boat', desc: 'The entire Shikara is reserved exclusively for your family or group.' },
    { title: 'Licensed Local Captain', desc: 'Skilled native boatman who knows every canal and village history.' },
    { title: 'Fuel & Taxes Included', desc: 'No hidden charges or surprise fuel surcharges at the jetty.' },
    { title: 'Approved Life Jackets', desc: 'Certified safety gear for all passengers including toddlers and kids.' },
    { title: 'Cushioned Reclining Lounge', desc: 'Traditional wooden frame with thick mattresses, pillows & shaded canopy.' },
    { title: 'Canal Entry Permits', desc: 'Permits to cruise environmentally protected Kuttanad village canals.' }
  ],

  optionalExtras: [
    { title: 'Hot Kerala Tea & Snacks', desc: 'Fresh banana fritters (pazham pori) and spiced chai from a lakeside stall.' },
    { title: 'Traditional Kerala Lunch', desc: 'Homestyle fish curry meals or vegetarian sadya served on a banana leaf.' },
    { title: 'Village Toddy Shop Stop', desc: 'Sample fresh sweet coconut toddy and spicy regional delicacies (paid at shop).' }
  ],

  // Why Choose Us (3 Core Pillars)
  whyChooseUs: [
    {
      title: 'Licensed Captains',
      subtitle: 'Native to Alleppey canals',
      desc: 'Our captains grew up steering these waterways. They navigate shallow canals with ease, explain local culture, and prioritize your safety at all times.'
    },
    {
      title: 'Fully Private Boat',
      subtitle: 'No shared strangers',
      desc: 'Whether you are 2 people on a honeymoon or a family of 6, the entire boat is exclusively yours to relax, stop for photos, and enjoy in total privacy.'
    },
    {
      title: 'Enters Narrow Canals',
      subtitle: 'Where houseboats cannot fit',
      desc: 'Large houseboats must stay on wide, busy commercial channels. Our low-draft Shikara slips quietly under low bridges into untouched village life.'
    }
  ],

  // 4 Steps of Booking
  bookingSteps: [
    {
      step: '01',
      title: 'Pick Your Ride',
      desc: 'Choose 2, 3, or 4 hours depending on how deep into the backwaters you wish to cruise.'
    },
    {
      step: '02',
      title: 'Send on WhatsApp',
      desc: 'Click Book on WhatsApp with your date, time slot, and guest count prefilled.'
    },
    {
      step: '03',
      title: 'Pay Small Advance',
      desc: 'Pay a ₹1,000 advance via UPI or bank transfer to immediately lock in your boat.'
    },
    {
      step: '04',
      title: 'Board at Jetty',
      desc: 'Arrive at Punnamada Jetty, meet your captain, board your Shikara, and pay the balance at check-in.'
    }
  ],

  // FAQs (Accordion logic)
  faqs: [
    {
      q: 'Is the shikara ride completely private or shared with other people?',
      a: 'All our Shikara rides are 100% private. The boat is reserved solely for you and your travelling companions. We do not operate shared or pooled boat rides.'
    },
    {
      q: 'What is the maximum group size per boat?',
      a: 'Our traditional Shikara comfortably accommodates up to 6 guests under the base price. We can host up to a maximum of 10 guests with a small extra guest fee of ₹100 per person per hour.'
    },
    {
      q: 'How does the pricing work? Is it per boat or per person?',
      a: 'Our pricing is strictly per boat, not per person. A 2-hour cruise is ₹2,000, 3 hours is ₹3,000, and 4 hours is ₹4,000 for the entire boat (up to 6 guests). For 4 people on a 2-hour cruise, it comes down to just ₹500 per person.'
    },
    {
      q: 'Are food and drinks provided during the cruise?',
      a: 'We provide complimentary packaged drinking water bottles. On request, your captain can stop at a clean riverside tea stall for hot Kerala chai and banana fritters, or a village restaurant for lunch. Food is paid directly at the stops.'
    },
    {
      q: 'What is the difference between a Shikara and a Houseboat?',
      a: 'A Shikara is smaller, lower, and quieter, allowing it to navigate narrow, shallow village canals and glide under low bridges where massive multi-deck houseboats cannot enter. Shikaras are also 70% more affordable and give a much closer, intimate connection to village life.'
    },
    {
      q: 'Where is the starting point / boarding jetty?',
      a: 'All cruises depart from Jetty No. 4, Punnamada Finishing Point, Alleppey. There is ample car parking, clean restrooms, and easy taxi access. We send exact Google Maps location pins upon advance payment.'
    },
    {
      q: 'Which time slot is best: Sunrise or Sunset?',
      a: 'The 6:00 AM Sunrise cruise offers cool morning mist, exceptional birdwatching, and serene glassy waters. The 3:30 PM Sunset cruise offers a gentle evening breeze and stunning golden hour reflections over the open Vembanad Lake.'
    },
    {
      q: 'How do I book and what is the payment process?',
      a: 'Simply select your ride length, date, time, and guest count on our booking widget and click "Book on WhatsApp". We confirm availability, you pay a small ₹1,000 advance to hold the boat, and the remaining balance is paid directly at the jetty upon boarding.'
    }
  ]
};

/**
 * Calculate dynamic ride prices based on configuration
 */
export function calculateRidePrice(durationHours, guestCount = 2, isPeakSeason = false) {
  const ride = shikaraConfig.rides.find(r => r.durationHours === durationHours) || shikaraConfig.rides[1];
  let basePrice = ride.basePrice;

  // Extra guest logic beyond 6 guests
  const extraGuests = Math.max(0, guestCount - shikaraConfig.pricing.baseGuestLimit);
  const extraGuestFee = extraGuests * shikaraConfig.pricing.extraGuestRatePerHour * durationHours;

  const total = basePrice + extraGuestFee;
  const advance = shikaraConfig.pricing.advanceAmount;
  const balance = Math.max(0, total - advance);

  const perPersonFor2 = Math.round(total / 2);
  const perPersonFor4 = Math.round(total / 4);
  const perPersonFor6 = Math.round(total / 6);
  const perPersonActual = Math.round(total / Math.max(1, guestCount));

  return {
    ride,
    durationHours,
    guestCount,
    basePrice,
    extraGuests,
    extraGuestFee,
    totalPrice: total,
    advanceAmount: advance,
    balanceAtJetty: balance,
    perPersonFor2,
    perPersonFor4,
    perPersonFor6,
    perPersonActual
  };
}
