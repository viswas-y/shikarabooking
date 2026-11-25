const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'sithara-shikara-secret-key-2026';

// Uploads directory
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, 'sithara-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp|gif|svg/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files (jpg, jpeg, png, webp, gif, svg) are allowed!'));
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(UPLOADS_DIR));
app.use(express.static(path.join(__dirname, 'public')));

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// ==========================================
// 1. PUBLIC API ROUTES (For Website)
// ==========================================

// Get all website content in one aggregate call for fast loading
app.get('/api/content', (req, res) => {
  const data = db.getAll();
  // Don't expose admin credentials or internal bookings to public
  const publicContent = {
    settings: data.settings || {},
    hero: data.hero || {},
    shikara: data.shikara || {},
    gallery: (data.gallery || []).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)),
    faqs: (data.faqs || []).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)),
    food: data.food || []
  };
  res.json(publicContent);
});

// Individual public getters
app.get('/api/hero', (req, res) => res.json(db.get('hero')));
app.get('/api/shikara', (req, res) => res.json(db.get('shikara')));
app.get('/api/gallery', (req, res) => {
  const gallery = db.get('gallery') || [];
  res.json(gallery.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)));
});
app.get('/api/faqs', (req, res) => {
  const faqs = db.get('faqs') || [];
  res.json(faqs.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)));
});
app.get('/api/food', (req, res) => res.json(db.get('food') || []));
app.get('/api/settings', (req, res) => res.json(db.get('settings') || {}));

// Public Booking Enquiry Submission
app.post('/api/bookings', (req, res) => {
  try {
    const { name, phone, email, date, guests, message, durationId, durationLabel } = req.body;

    if (!name || !phone || !date) {
      return res.status(400).json({ error: 'Name, phone number, and cruise date are required.' });
    }

    const guestCount = parseInt(guests, 10) || 2;
    if (guestCount > 8) {
      return res.status(400).json({ error: 'Sithara Shikara maximum capacity is 8 guests.' });
    }

    const bookings = db.get('bookings') || [];
    const newBooking = {
      id: 'bkg-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
      name: name.trim(),
      phone: phone.trim(),
      email: (email || '').trim(),
      date,
      guests: guestCount,
      durationId: durationId || 'dur-3h',
      durationLabel: durationLabel || '3 Hours Cruise',
      message: (message || '').trim(),
      status: 'new', // new | confirmed | cancelled
      createdAt: new Date().toISOString()
    };

    bookings.unshift(newBooking);
    db.set('bookings', bookings);

    console.log(`🛥️ New booking enquiry received: ${newBooking.name} for ${newBooking.date} (${newBooking.guests} guests)`);
    res.status(201).json({
      success: true,
      message: 'Booking enquiry submitted successfully! Sithara team will contact you shortly.',
      booking: newBooking
    });
  } catch (err) {
    console.error('Booking submission error:', err);
    res.status(500).json({ error: 'Failed to process booking enquiry. Please try again.' });
  }
});

// ==========================================
// 2. AUTHENTICATION ROUTES (CMS Login)
// ==========================================

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const admin = db.get('admin');
  if (!admin || admin.username !== username) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const isMatch = bcrypt.compareSync(password, admin.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { username: admin.username, role: admin.role || 'owner' },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    success: true,
    token,
    user: { username: admin.username, role: admin.role }
  });
});

app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

app.post('/api/auth/change-password', authenticateToken, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current and new password are required' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters' });
  }

  const admin = db.get('admin');
  const isMatch = bcrypt.compareSync(currentPassword, admin.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ error: 'Current password is incorrect' });
  }

  admin.passwordHash = bcrypt.hashSync(newPassword, 10);
  db.set('admin', admin);

  res.json({ success: true, message: 'Password updated successfully' });
});

// ==========================================
// 3. FILE UPLOAD ROUTE (Protected)
// ==========================================

app.post('/api/upload', authenticateToken, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({
    success: true,
    url: fileUrl,
    filename: req.file.filename,
    size: req.file.size
  });
});

// ==========================================
// 4. PROTECTED CONTENT MANAGEMENT ROUTES
// ==========================================

// HERO CONTENT
app.put('/api/hero', authenticateToken, (req, res) => {
  const { title, subtitle, tagline, description, backgroundImage, ctaText, ctaTarget } = req.body;
  const currentHero = db.get('hero') || {};
  const updatedHero = {
    ...currentHero,
    title: title !== undefined ? title : currentHero.title,
    subtitle: subtitle !== undefined ? subtitle : currentHero.subtitle,
    tagline: tagline !== undefined ? tagline : currentHero.tagline,
    description: description !== undefined ? description : currentHero.description,
    backgroundImage: backgroundImage !== undefined ? backgroundImage : currentHero.backgroundImage,
    ctaText: ctaText !== undefined ? ctaText : currentHero.ctaText,
    ctaTarget: ctaTarget !== undefined ? ctaTarget : currentHero.ctaTarget
  };
  db.set('hero', updatedHero);
  res.json({ success: true, hero: updatedHero });
});

// SHIKARA DETAILS
app.put('/api/shikara', authenticateToken, (req, res) => {
  const current = db.get('shikara') || {};
  const updated = {
    ...current,
    name: req.body.name !== undefined ? req.body.name : current.name,
    subtitle: req.body.subtitle !== undefined ? req.body.subtitle : current.subtitle,
    tagline: req.body.tagline !== undefined ? req.body.tagline : current.tagline,
    description: req.body.description !== undefined ? req.body.description : current.description,
    capacity: req.body.capacity !== undefined ? req.body.capacity : current.capacity,
    capacityDetails: req.body.capacityDetails !== undefined ? req.body.capacityDetails : current.capacityDetails,
    basePrice: req.body.basePrice !== undefined ? req.body.basePrice : current.basePrice,
    priceUnit: req.body.priceUnit !== undefined ? req.body.priceUnit : current.priceUnit,
    priceNote: req.body.priceNote !== undefined ? req.body.priceNote : current.priceNote,
    timings: req.body.timings !== undefined ? req.body.timings : current.timings,
    departureLocation: req.body.departureLocation !== undefined ? req.body.departureLocation : current.departureLocation,
    amenities: Array.isArray(req.body.amenities) ? req.body.amenities : current.amenities,
    durationOptions: Array.isArray(req.body.durationOptions) ? req.body.durationOptions : current.durationOptions
  };
  db.set('shikara', updated);
  res.json({ success: true, shikara: updated });
});

// GALLERY
app.post('/api/gallery', authenticateToken, (req, res) => {
  const { title, caption, imageUrl, category } = req.body;
  if (!imageUrl) {
    return res.status(400).json({ error: 'Image URL is required' });
  }

  const gallery = db.get('gallery') || [];
  const newItem = {
    id: 'gal-' + Date.now().toString(36),
    title: (title || 'Shikara View').trim(),
    caption: (caption || '').trim(),
    imageUrl,
    category: (category || 'Cruise').trim(),
    sortOrder: gallery.length + 1
  };

  gallery.push(newItem);
  db.set('gallery', gallery);
  res.status(201).json({ success: true, item: newItem });
});

app.put('/api/gallery/:id', authenticateToken, (req, res) => {
  const gallery = db.get('gallery') || [];
  const index = gallery.findIndex(g => g.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Gallery item not found' });
  }

  gallery[index] = {
    ...gallery[index],
    title: req.body.title !== undefined ? req.body.title : gallery[index].title,
    caption: req.body.caption !== undefined ? req.body.caption : gallery[index].caption,
    imageUrl: req.body.imageUrl !== undefined ? req.body.imageUrl : gallery[index].imageUrl,
    category: req.body.category !== undefined ? req.body.category : gallery[index].category,
    sortOrder: req.body.sortOrder !== undefined ? Number(req.body.sortOrder) : gallery[index].sortOrder
  };

  db.set('gallery', gallery);
  res.json({ success: true, item: gallery[index] });
});

app.delete('/api/gallery/:id', authenticateToken, (req, res) => {
  let gallery = db.get('gallery') || [];
  const exists = gallery.some(g => g.id === req.params.id);
  if (!exists) {
    return res.status(404).json({ error: 'Gallery item not found' });
  }

  gallery = gallery.filter(g => g.id !== req.params.id);
  // Re-index sort order
  gallery.forEach((g, idx) => { g.sortOrder = idx + 1; });
  db.set('gallery', gallery);
  res.json({ success: true, message: 'Gallery item deleted' });
});

app.put('/api/gallery-reorder', authenticateToken, (req, res) => {
  const { order } = req.body; // Array of IDs in requested order
  if (!Array.isArray(order)) {
    return res.status(400).json({ error: 'Order must be an array of IDs' });
  }

  const gallery = db.get('gallery') || [];
  const idMap = new Map(gallery.map(item => [item.id, item]));

  const reordered = [];
  order.forEach((id, idx) => {
    if (idMap.has(id)) {
      const item = idMap.get(id);
      item.sortOrder = idx + 1;
      reordered.push(item);
      idMap.delete(id);
    }
  });

  // Append any items not explicitly listed in order array
  idMap.forEach(item => {
    item.sortOrder = reordered.length + 1;
    reordered.push(item);
  });

  db.set('gallery', reordered);
  res.json({ success: true, gallery: reordered });
});

// FAQS
app.post('/api/faqs', authenticateToken, (req, res) => {
  const { question, answer } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ error: 'Question and answer are required' });
  }

  const faqs = db.get('faqs') || [];
  const newItem = {
    id: 'faq-' + Date.now().toString(36),
    question: question.trim(),
    answer: answer.trim(),
    sortOrder: faqs.length + 1
  };

  faqs.push(newItem);
  db.set('faqs', faqs);
  res.status(201).json({ success: true, item: newItem });
});

app.put('/api/faqs/:id', authenticateToken, (req, res) => {
  const faqs = db.get('faqs') || [];
  const index = faqs.findIndex(f => f.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'FAQ item not found' });
  }

  faqs[index] = {
    ...faqs[index],
    question: req.body.question !== undefined ? req.body.question.trim() : faqs[index].question,
    answer: req.body.answer !== undefined ? req.body.answer.trim() : faqs[index].answer,
    sortOrder: req.body.sortOrder !== undefined ? Number(req.body.sortOrder) : faqs[index].sortOrder
  };

  db.set('faqs', faqs);
  res.json({ success: true, item: faqs[index] });
});

app.delete('/api/faqs/:id', authenticateToken, (req, res) => {
  let faqs = db.get('faqs') || [];
  const exists = faqs.some(f => f.id === req.params.id);
  if (!exists) {
    return res.status(404).json({ error: 'FAQ not found' });
  }

  faqs = faqs.filter(f => f.id !== req.params.id);
  faqs.forEach((f, idx) => { f.sortOrder = idx + 1; });
  db.set('faqs', faqs);
  res.json({ success: true, message: 'FAQ deleted' });
});

app.put('/api/faqs-reorder', authenticateToken, (req, res) => {
  const { order } = req.body;
  if (!Array.isArray(order)) {
    return res.status(400).json({ error: 'Order must be an array of IDs' });
  }

  const faqs = db.get('faqs') || [];
  const idMap = new Map(faqs.map(item => [item.id, item]));

  const reordered = [];
  order.forEach((id, idx) => {
    if (idMap.has(id)) {
      const item = idMap.get(id);
      item.sortOrder = idx + 1;
      reordered.push(item);
      idMap.delete(id);
    }
  });

  idMap.forEach(item => {
    item.sortOrder = reordered.length + 1;
    reordered.push(item);
  });

  db.set('faqs', reordered);
  res.json({ success: true, faqs: reordered });
});

// FOOD MENU ITEMS
app.post('/api/food', authenticateToken, (req, res) => {
  const { name, description, price, imageUrl, category, isAvailable } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: 'Item name and price are required' });
  }

  const food = db.get('food') || [];
  const newItem = {
    id: 'food-' + Date.now().toString(36),
    name: name.trim(),
    description: (description || '').trim(),
    price: price.trim(),
    imageUrl: imageUrl || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    category: (category || 'Specialty').trim(),
    isAvailable: isAvailable !== false
  };

  food.push(newItem);
  db.set('food', food);
  res.status(201).json({ success: true, item: newItem });
});

app.put('/api/food/:id', authenticateToken, (req, res) => {
  const food = db.get('food') || [];
  const index = food.findIndex(f => f.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Food item not found' });
  }

  food[index] = {
    ...food[index],
    name: req.body.name !== undefined ? req.body.name.trim() : food[index].name,
    description: req.body.description !== undefined ? req.body.description.trim() : food[index].description,
    price: req.body.price !== undefined ? req.body.price.trim() : food[index].price,
    imageUrl: req.body.imageUrl !== undefined ? req.body.imageUrl : food[index].imageUrl,
    category: req.body.category !== undefined ? req.body.category.trim() : food[index].category,
    isAvailable: req.body.isAvailable !== undefined ? Boolean(req.body.isAvailable) : food[index].isAvailable
  };

  db.set('food', food);
  res.json({ success: true, item: food[index] });
});

app.delete('/api/food/:id', authenticateToken, (req, res) => {
  let food = db.get('food') || [];
  const exists = food.some(f => f.id === req.params.id);
  if (!exists) {
    return res.status(404).json({ error: 'Food item not found' });
  }

  food = food.filter(f => f.id !== req.params.id);
  db.set('food', food);
  res.json({ success: true, message: 'Food item deleted' });
});

// BOOKINGS MANAGEMENT
app.get('/api/admin/bookings', authenticateToken, (req, res) => {
  const { status } = req.query;
  let bookings = db.get('bookings') || [];

  if (status && status !== 'all') {
    bookings = bookings.filter(b => b.status === status);
  }

  // Sort newest first
  bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(bookings);
});

app.put('/api/admin/bookings/:id/status', authenticateToken, (req, res) => {
  const { status, adminNotes } = req.body;
  const allowed = ['new', 'confirmed', 'cancelled'];
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: 'Invalid status. Must be new, confirmed, or cancelled' });
  }

  const bookings = db.get('bookings') || [];
  const index = bookings.findIndex(b => b.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  bookings[index].status = status;
  if (adminNotes !== undefined) {
    bookings[index].adminNotes = adminNotes;
  }
  bookings[index].updatedAt = new Date().toISOString();

  db.set('bookings', bookings);
  res.json({ success: true, booking: bookings[index] });
});

app.delete('/api/admin/bookings/:id', authenticateToken, (req, res) => {
  let bookings = db.get('bookings') || [];
  const exists = bookings.some(b => b.id === req.params.id);
  if (!exists) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  bookings = bookings.filter(b => b.id !== req.params.id);
  db.set('bookings', bookings);
  res.json({ success: true, message: 'Booking enquiry deleted' });
});

// SETTINGS
app.put('/api/settings', authenticateToken, (req, res) => {
  const current = db.get('settings') || {};
  const updated = {
    ...current,
    ...req.body
  };
  db.set('settings', updated);
  res.json({ success: true, settings: updated });
});

// RESTORE DEFAULT SEED DATA
app.post('/api/admin/reset-defaults', authenticateToken, (req, res) => {
  const fresh = db.resetToDefault();
  res.json({ success: true, message: 'All content reset to original defaults', data: fresh });
});

// Admin Panel Catch-all: serve index.html for any subpath in /admin or direct
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🛥️  Sithara Shikara CMS & API running on port ${PORT}`);
  console.log(`   Admin Dashboard: http://localhost:${PORT}`);
  console.log(`   Public API:      http://localhost:${PORT}/api/content`);
  console.log(`======================================================\n`);
});
