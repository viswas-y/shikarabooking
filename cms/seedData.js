// Default seed data for BookShikara Houseboat bookings
const bcrypt = require('bcryptjs');

const defaultPasswordHash = bcrypt.hashSync('admin123', 10);

const seedData = {
  admin: {
    username: 'admin',
    passwordHash: defaultPasswordHash,
    role: 'owner'
  },
  settings: {
    businessName: 'BookShikara',
    brandTagline: 'Authentic Backwater Journeys',
    phone: '+91 94470 12345',
    secondaryPhone: '+91 98460 54321',
    email: 'bookings@bookshikara.com',
    address: 'Jetty No. 4, Punnamada Finishing Point, Alappuzha, Kerala 688013',
    whatsapp: '+919447012345',
    currency: '₹',
    operatingHours: '06:00 AM – 06:30 PM Daily'
  },
  hero: {
    title: 'BookShikara',
    subtitle: 'SHIKARA CRUISE • ALLEPPEY',
    tagline: 'Experience the pristine beauty of Kerala backwaters aboard our handcrafted wooden Shikara boat.',
    description: 'Drift silently along emerald canals, tranquil palm-shaded lagoons, and traditional village shores. Intimate, serene, and tailored to you.',
    backgroundImage: '/images/hero-shikara.jpg',
    ctaText: 'Book Now',
    ctaTarget: '#shikara-details'
  },
  shikara: {
    name: 'BookShikara Traditional Shikara',
    subtitle: 'The Pure Spirit of Backwater Serenity',
    tagline: 'Exclusively Shikara. No Crowds, No Noise.',
    description: 'Handcrafted by master boat builders using indigenous Anjili wood, BookShikara is a traditional Kerala shikara engineered for tranquil cruising. Unlike large noisy double-decker houseboats, our sleek shikara glides effortlessly into shallow village tributaries and under low rustic bridges where real backwater life unfolds. Featuring plush cushions, woven bamboo blinds for weather comfort, and an ultra-quiet four-stroke engine, BookShikara delivers an authentic, private, and leisurely voyage.',
    capacity: 'Up to 8 Guests',
    capacityDetails: 'Intimate cushioned sofa seating designed for couples, families, and private groups of up to 8 persons.',
    basePrice: '₹1,200',
    priceUnit: 'per hour (entire boat, private)',
    priceNote: 'Flat rate for the private boat regardless of group size (up to 8 guests). No hidden fuel surcharges.',
    timings: 'Morning: 06:00 AM – 10:00 AM | Afternoon & Sunset: 02:00 PM – 06:30 PM',
    durationOptions: [
      {
        id: 'dur-2h',
        name: '2 Hours Canal Glimpse',
        duration: '2 Hours',
        price: '₹2,400',
        popular: false,
        highlight: 'Ideal for short visits',
        description: 'Cruises through Punnamada Lake, starting point of the Nehru Trophy Boat Race, and enters quiet village canals.'
      },
      {
        id: 'dur-3h',
        name: '3 Hours Classic Heritage Cruise',
        duration: '3 Hours',
        price: '₹3,400',
        popular: true,
        highlight: 'Most Recommended',
        description: 'Deeper voyage through narrow Kainakary village canals, scenic paddy fields below sea level, and migratory bird spots.'
      },
      {
        id: 'dur-4h',
        name: '4 Hours Backwaters Explorer',
        duration: '4 Hours',
        price: '₹4,400',
        popular: false,
        highlight: 'Complete Relaxation',
        description: 'Comprehensive route visiting remote artisan hamlets, heritage water locks, and tranquil lotus sanctuaries with time for refreshments.'
      }
    ],
    amenities: [
      'Plush, deep-cushioned seating & backrests',
      'Natural woven bamboo roll-up weather blinds',
      'Certified adult & child life jackets for all guests',
      'Experienced licensed local captain & guide',
      'Ultra-silent, eco-compliant four-stroke engine & bamboo pole paddle',
      'Complimentary bottled mineral water & welcome tender coconut',
      'Binoculars available for bird watching',
      'First-aid medical safety kit onboard',
      'Phone charging ports & optional Bluetooth speaker'
    ],
    departureLocation: 'Punnamada Finishing Point Jetty, Alappuzha (Alleppey), Kerala'
  },
  gallery: [
    {
      id: 'gal-1',
      title: 'Aerial View of Alleppey Waterways',
      caption: 'Serpentine canals, lush emerald paddy fields, and houseboats winding through the heart of Kuttanad.',
      imageUrl: '/images/gallery/gallery-aerial-backwaters.jpg',
      category: 'Aerial',
      sortOrder: 1
    },
    {
      id: 'gal-2',
      title: 'Golden Sunset over Vembanad Lake',
      caption: 'Magical glowing crimson sunset reflecting across the tranquil waters during our evening Shikara cruise.',
      imageUrl: '/images/gallery/gallery-crimson-sunset.jpg',
      category: 'Sunset',
      sortOrder: 2
    },
    {
      id: 'gal-3',
      title: 'Morning Village Life & Coconut Palms',
      caption: 'Authentic riverside village morning with locals walking along palm-fringed paddy embankments.',
      imageUrl: '/images/gallery/gallery-village-morning.jpg',
      category: 'Village Life',
      sortOrder: 3
    },
    {
      id: 'gal-4',
      title: 'Narrow Bamboo & Palm Canopy Canals',
      caption: 'Navigating intimate, shallow village tributaries under dense greenery where large houseboats cannot enter.',
      imageUrl: '/images/gallery/gallery-narrow-canal-canopy.jpg',
      category: 'Canals',
      sortOrder: 4
    },
    {
      id: 'gal-5',
      title: 'Wooden Shikara on Mirror-Calm Waters',
      caption: 'Handcrafted wooden Shikara boat with comfortable cushioned seating moored on the serene open lake.',
      imageUrl: '/images/gallery/gallery-lake-shikara.jpg',
      category: 'Shikara',
      sortOrder: 5
    },
    {
      id: 'gal-6',
      title: 'Traditional Punting Boatman',
      caption: 'Master boatman gliding a wooden country canoe with bamboo pole through crystal-clear reflections.',
      imageUrl: '/images/gallery/gallery-canoe-reflections.jpg',
      category: 'Culture',
      sortOrder: 6
    },
    {
      id: 'gal-7',
      title: 'Water Hyacinth Blooms & Moored Houseboats',
      caption: 'A scenic carpet of floating green water lilies and traditional kettuvallam houseboats along the canal banks.',
      imageUrl: '/images/gallery/gallery-hyacinth-waterway.jpg',
      category: 'Nature',
      sortOrder: 7
    },
    {
      id: 'gal-8',
      title: 'Tropical Village Waterway & Footbridge',
      caption: 'Gliding past rustic low village footbridges and secluded backwater homes shaded by coconut groves.',
      imageUrl: '/images/gallery/gallery-tropical-canal.jpg',
      category: 'Canals',
      sortOrder: 8
    },
    {
      id: 'gal-9',
      title: 'Village Boat Stand & Country Craft',
      caption: 'Traditional wooden boats resting at a peaceful riverside jetty in the gentle afternoon breeze.',
      imageUrl: '/images/gallery/gallery-village-jetty.jpg',
      category: 'Jetty',
      sortOrder: 9
    },
    {
      id: 'gal-10',
      title: 'Solitary Sunset Paddle on the Lake',
      caption: 'Quiet twilight reflections as a lone boatman paddles across the calm open waters at dusk.',
      imageUrl: '/images/gallery/gallery-sunset-canoe.jpg',
      category: 'Sunset',
      sortOrder: 10
    }
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'What is a Shikara and how is it different from a large Houseboat?',
      answer: 'A Shikara is a traditional, nimble wooden boat with open sides and cushioned seating designed for leisurely scenic cruising. Because of its compact size, our Shikara "BookShikara" can glide through narrow canals, village waterways, and under low footbridges where large motor houseboats simply cannot fit. It offers a much closer, quieter, and authentic connection to local backwater life.',
      sortOrder: 1
    },
    {
      id: 'faq-2',
      question: 'How many guests can BookShikara accommodate?',
      answer: 'BookShikara is certified and comfortably equipped for up to 8 guests. The booking is entirely private — whether you are a solo traveler, a couple, or a family, you will have the entire boat exclusively for yourselves with a dedicated local captain.',
      sortOrder: 2
    },
    {
      id: 'faq-3',
      question: 'What are the best cruise timings?',
      answer: 'The morning cruise (06:00 AM – 09:00 AM) is magical for quiet waters, misty reflections, and migratory bird-watching. The afternoon and sunset cruise (03:30 PM – 06:30 PM) is spectacular for breezy cruising and watching the sunset cast golden hues across the lake.',
      sortOrder: 3
    },
    {
      id: 'faq-4',
      question: 'Can we order food or bring our own snacks on board?',
      answer: 'Yes! We offer authentic freshly prepared Kerala snacks and meals (such as Karimeen Pollichathu, traditional Sadhya, banana fritters, and chilled tender coconuts) which you can request in advance. You are also welcome to bring your own dry snacks and non-alcoholic beverages.',
      sortOrder: 4
    },
    {
      id: 'faq-5',
      question: 'What safety gear is available onboard?',
      answer: 'Your safety is our top priority. BookShikara carries certified life jackets for every passenger (including children), a life-saving ring, a marine first aid medical kit, and is operated by an experienced government-licensed boat master.',
      sortOrder: 5
    },
    {
      id: 'faq-6',
      question: 'Where is the boarding point and how do I reach it?',
      answer: 'Boarding takes place at Finishing Point Jetty, Punnamada, Alappuzha (Alleppey). It is easily accessible by auto-rickshaw, taxi, or car, and has ample secure parking. Upon booking confirmation, our captain will share an exact GPS location pin and meet you at the pier.',
      sortOrder: 6
    }
  ],
  food: [
    {
      id: 'food-1',
      name: 'Kerala Karimeen Pollichathu',
      description: 'Fresh backwater Pearl Spot fish marinated in a rich blend of shallots, ginger, garlic, and Kerala spices, slow-roasted wrapped inside fresh banana leaf.',
      price: '₹450',
      category: 'Signature Seafood',
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      isAvailable: true
    },
    {
      id: 'food-2',
      name: 'Backwater Prawns Fry (Chemmeen)',
      description: 'Succulent jumbo lake prawns tossed in roasted pepper, crushed curry leaves, kokum, and crisp coconut shards.',
      price: '₹480',
      category: 'Signature Seafood',
      imageUrl: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=800&q=80',
      isAvailable: true
    },
    {
      id: 'food-3',
      name: 'Traditional Kerala Banana Leaf Sadhya',
      description: 'Fragrant red rice served on banana leaf with sambar, avial, thoran, pulissery, mango pickle, pappadam, and sweet payasam dessert.',
      price: '₹320',
      category: 'Traditional Meals',
      imageUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80',
      isAvailable: true
    },
    {
      id: 'food-4',
      name: 'Kuttanadan Chicken Roast',
      description: 'Country chicken pan-roasted with hand-ground spices, caramelized onions, green chilies, and fresh curry leaves.',
      price: '₹360',
      category: 'Traditional Meals',
      imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
      isAvailable: true
    },
    {
      id: 'food-5',
      name: 'Hot Pazham Pori & Masala Chai',
      description: 'Kerala gold standard: ripe sweet Nendran banana slices dipped in batter and fried to golden perfection, served with freshly brewed cardamom tea.',
      price: '₹120',
      category: 'Snacks & Beverages',
      imageUrl: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?auto=format&fit=crop&w=800&q=80',
      isAvailable: true
    },
    {
      id: 'food-6',
      name: 'Fresh Chilled Tender Coconut',
      description: 'Naturally sweet and hydrating fresh backwater tender coconut, cut and served directly onboard with an eco-straw.',
      price: '₹80',
      category: 'Snacks & Beverages',
      imageUrl: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=800&q=80',
      isAvailable: true
    }
  ],
  bookings: [
    {
      id: 'bkg-101',
      name: 'Arun Varma',
      phone: '+91 98471 22334',
      email: 'arun.varma@example.com',
      date: '2026-11-28',
      guests: 4,
      durationId: 'dur-3h',
      durationLabel: '3 Hours Classic Heritage Cruise',
      message: 'Celebrating wedding anniversary. We would love the Karimeen Pollichathu and sunset timing.',
      status: 'confirmed',
      createdAt: '2026-11-23T10:15:00.000Z'
    },
    {
      id: 'bkg-102',
      name: 'Sophie Müller',
      phone: '+49 170 555 4321',
      email: 'sophie.m@example.de',
      date: '2026-12-02',
      guests: 2,
      durationId: 'dur-2h',
      durationLabel: '2 Hours Canal Glimpse',
      message: 'Early morning sunrise cruise requested. Looking forward to bird watching.',
      status: 'new',
      createdAt: '2026-11-24T08:30:00.000Z'
    }
  ]
};

module.exports = seedData;
