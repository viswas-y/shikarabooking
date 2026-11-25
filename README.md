# BookShikara – Authentic Shikara Booking Platform

A dedicated booking website and content management system (CMS) built specifically for **"BookShikara"** – a private, handcrafted Shikara houseboat business in Alleppey (Alappuzha), Kerala.

> **Note on Scope:** BookShikara offers **only Shikara** cruises. No other boat types, multi-tier packages, or unrelated services are present.

---

## 📁 Project Structure

```
project-root/
├── cms/                  # Admin panel + REST API backend (Port 5000)
│   ├── data/             # Database storage (db.json with auto-seed)
│   ├── public/           # Admin panel web application
│   │   ├── index.html    # Admin portal SPA
│   │   ├── admin.css     # Backwater-themed admin styling
│   │   └── admin.js      # CMS client logic, JWT auth, uploads
│   ├── uploads/          # Uploaded image assets
│   ├── db.js             # Atomic JSON file database engine
│   ├── seedData.js       # Authentic Kerala Shikara sample content
│   ├── server.js         # Express REST API & static file server
│   └── package.json
│
├── website/              # Public-facing single-page website (Port 3000)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Smooth-scroll navigation
│   │   │   ├── Hero.jsx            # Section 1: Full-screen hero
│   │   │   ├── ShikaraDetails.jsx  # Section 2: Boat specs & booking form
│   │   │   ├── Gallery.jsx         # Section 3: Photo grid & lightbox
│   │   │   ├── FAQ.jsx             # Section 4: Accordion Q&A
│   │   │   ├── Food.jsx            # Section 5: Traditional Kerala menu
│   │   │   ├── Lightbox.jsx        # Full-screen image lightbox
│   │   │   └── Footer.jsx          # Minimal contact footer
│   │   ├── api.js        # CMS API client & resilient fallback
│   │   ├── App.jsx       # Root layout with 5 ordered sections
│   │   ├── main.jsx
│   │   └── index.css     # Tailwind CSS styles
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md             # This guide
```

---

## 🚀 Quick Start Guide

You can now start everything in one command from the project root, or run each project independently.

### Option A: Run Both Together from Root (Easiest)

From the project root (`shikkarabooking/`):

```bash
npm run dev
```
*(Or `npm start`)*

This starts both:
* **Website:** [http://localhost:3000](http://localhost:3000)
* **CMS Admin:** [http://localhost:5000](http://localhost:5000)

You can also run individual services from the root:
```bash
npm run cms       # Runs only the CMS on port 5000
npm run website   # Runs only the website on port 3000
```

---

### Option B: Run Independently in Separate Terminals

#### 1. Run the CMS Backend & Admin Panel (Port 5000)

```bash
cd cms
npm start
```

* **CMS Admin URL:** [http://localhost:5000](http://localhost:5000)
* **Public API URL:** [http://localhost:5000/api/content](http://localhost:5000/api/content)
* **Default Owner Login Credentials:**
  * **Username:** `admin`
  * **Password:** `admin123` *(Can be updated from the CMS Settings tab)*

#### 2. Run the Public Website (Port 3000)

In a second terminal:

```bash
cd website
npm run dev
```

* **Website URL:** [http://localhost:3000](http://localhost:3000)

---

## 🌟 Website Architecture (website/)

The public site is mobile-first, fast-loading, accessible, and structured with **ONLY these 5 sections in this exact order**:

1. **Hero Section (`#hero`):**
   - Full-screen visual of BookShikara on the Kerala backwaters.
   - Brand name **"BookShikara"**, subtitle badge, tagline, and quick trust indicators.
   - Primary **"Book Now"** button with smooth scrolling to Shikara Details.

2. **Shikara Details Section (`#shikara-details`):**
   - **Exclusively Shikara details:** Handcrafted Anjili wood build, shallow canal accessibility, and tranquil ambiance.
   - **Capacity:** Up to 8 guests (strictly private).
   - **Cruise Duration Packages:** 2 Hours (Canal Glimpse), 3 Hours (Classic Heritage), 4 Hours (Backwaters Explorer).
   - **Pricing:** Transparent flat boat pricing (₹1,200/hr) with no hidden fuel charges.
   - **Onboard Amenities:** Cushioned loungers, bamboo rain/sun blinds, certified life jackets, binoculars, quiet four-stroke engine, complimentary tender coconut.
   - **Timings & Departure Point:** Finishing Point Jetty, Punnamada, Alleppey.
   - **Direct Booking Enquiry Form:** Name, phone, email, date, guest count (1–8), duration package, and special message. Submissions go straight to the CMS.

3. **Gallery Section (`#gallery`):**
   - Responsive image grid with category badges (Cruise, Scenery, Interior, Sunset).
   - Integrated full-screen **Lightbox Viewer** with previous/next controls, caption viewer, and keyboard support (`Esc`, arrow keys).
   - Content managed dynamically via CMS.

4. **FAQ Section (`#faqs`):**
   - Smooth accordion answering common questions (Shikara vs Houseboat differences, capacity, boarding location, food, safety).
   - Managed and reorderable from the CMS.

5. **Food Section (`#food`):**
   - Fresh Kerala backwater specialties: *Karimeen Pollichathu, Chemmeen Prawns Fry, Banana Leaf Sadhya, Kuttanad Chicken Roast, Pazham Pori & Masala Chai, Fresh Chilled Tender Coconut*.
   - Managed from the CMS with pricing, descriptions, and photo uploads.

- **Navbar:** Sticky, frosted glass navbar with smooth-scroll links to all 5 sections and quick mobile drawer.
- **Footer:** Minimal footer with phone, email, WhatsApp link, boarding address, and direct link to the CMS.

---

## 🛠️ CMS Admin Features (cms/)

- **Password Protected:** Secured with bcrypt hashing and JSON Web Tokens (JWT).
- **Dashboard Overview:** Real-time stats on total enquiries, new enquiries, confirmed bookings, and gallery photo counts.
- **Hero Section Editor:** Edit title, tagline, description, button text, and upload or replace the background image with live preview.
- **Shikara Details Editor:** Update boat description, base price, capacity, timings, departure point, interactive duration packages, and dynamic amenities tags.
- **Gallery Manager:** Upload new images, edit titles and captions, move images up/down to reorder, or delete photos.
- **FAQ Manager:** Add new questions & answers, edit inline, move up/down to reorder, and delete FAQs.
- **Food Menu Manager:** Add dishes with price, category, appetizing description, and photo upload.
- **Bookings Management:** View all incoming enquiries, filter by status (`new`, `confirmed`, `cancelled`), update statuses, copy contact details, or launch WhatsApp chat with guest in one click.
- **System Settings:** Update business phone, WhatsApp, email, address, change admin password, or restore sample content.

---

## 🔌 API Reference

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/content` | Public | Aggregated website content (Hero, Shikara, Gallery, FAQs, Food, Settings) |
| `POST` | `/api/bookings` | Public | Submit a new booking enquiry |
| `POST` | `/api/auth/login` | Public | Authenticate owner & return JWT token |
| `GET` | `/api/auth/verify` | Protected | Verify active session |
| `PUT` | `/api/hero` | Protected | Update Hero section content |
| `PUT` | `/api/shikara` | Protected | Update Shikara specifications & duration options |
| `POST` | `/api/gallery` | Protected | Add photo to gallery |
| `PUT` | `/api/gallery-reorder` | Protected | Reorder gallery photos |
| `DELETE`| `/api/gallery/:id` | Protected | Delete gallery photo |
| `POST` | `/api/faqs` | Protected | Add FAQ item |
| `PUT` | `/api/faqs-reorder` | Protected | Reorder FAQ items |
| `DELETE`| `/api/faqs/:id` | Protected | Delete FAQ item |
| `POST` | `/api/food` | Protected | Add food item |
| `DELETE`| `/api/food/:id` | Protected | Delete food item |
| `GET` | `/api/admin/bookings`| Protected | List bookings with optional `?status=` filter |
| `PUT` | `/api/admin/bookings/:id/status` | Protected | Update enquiry status (`new`, `confirmed`, `cancelled`) |
| `DELETE`| `/api/admin/bookings/:id` | Protected | Remove a booking enquiry |
| `POST` | `/api/upload` | Protected | Handle image file upload (saves to `/uploads`) |

---

## 🎨 Design & Aesthetic

- **Color Palette:** Calming deep teal (`#0f766e`, `#042f2e`), warm teakwood / amber accents (`#b45309`, `#d97706`), soft sand (`#faf8f5`), and crisp white.
- **Typography:** Classic editorial serif (`Playfair Display`) paired with clean modern sans-serif (`Plus Jakarta Sans`).
- **Responsive & Mobile-First:** Fluid layouts optimized from mobile screens up to 4K displays.
