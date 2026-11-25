/**
 * BookShikara - Admin CMS Client Script
 * Handles JWT auth, content updates, bookings management, reordering, and file uploads.
 */

const API_BASE = window.location.origin;
let authToken = localStorage.getItem('bookshikara_token') || null;
let currentContent = null;
let currentBookings = [];

// ==========================================
// Toast Notification Utility
// ==========================================
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let iconSvg = '';
  if (type === 'success') {
    iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d9488" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
  } else if (type === 'error') {
    iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
  } else {
    iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
  }

  toast.innerHTML = `${iconSvg} <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ==========================================
// Authenticated API Fetch Helper
// ==========================================
async function apiFetch(endpoint, options = {}) {
  const headers = options.headers || {};
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
    
    if (res.status === 401 || res.status === 403) {
      handleLogout('Session expired. Please log in again.');
      throw new Error('Unauthorized');
    }

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Request failed');
    }
    return data;
  } catch (err) {
    console.error(`API Error (${endpoint}):`, err);
    throw err;
  }
}

// ==========================================
// File Upload Helper
// ==========================================
async function uploadImageFile(file) {
  const formData = new FormData();
  formData.append('image', file);

  showToast('Uploading image...', 'info');
  const res = await apiFetch('/api/upload', {
    method: 'POST',
    body: formData
  });

  showToast('Image uploaded successfully!', 'success');
  return `${API_BASE}${res.url}`;
}

// ==========================================
// Auth Handling
// ==========================================
async function initAuth() {
  if (!authToken) {
    showLoginScreen();
    return;
  }

  try {
    const res = await apiFetch('/api/auth/verify');
    if (res.valid) {
      document.getElementById('display-username').textContent = res.user.username;
      showAppScreen();
      loadAllData();
    } else {
      showLoginScreen();
    }
  } catch (e) {
    showLoginScreen();
  }
}

function showLoginScreen() {
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('app').style.display = 'none';
}

function showAppScreen() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app').style.display = 'flex';
}

function handleLogout(msg = 'Signed out') {
  localStorage.removeItem('bookshikara_token');
  authToken = null;
  showToast(msg, 'info');
  showLoginScreen();
}

// ==========================================
// Data Loaders
// ==========================================
async function loadAllData() {
  try {
    const [content, bookings] = await Promise.all([
      apiFetch('/api/content'),
      apiFetch('/api/admin/bookings')
    ]);

    currentContent = content;
    currentBookings = bookings;

    renderDashboard();
    renderBookings();
    populateHeroForm();
    populateShikaraForm();
    renderGallery();
    renderFaqs();
    renderFood();
    populateSettingsForm();
  } catch (err) {
    showToast('Failed to load content from server', 'error');
  }
}

// ==========================================
// Tab Navigation
// ==========================================
function switchTab(tabId) {
  document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

  const targetPane = document.getElementById(tabId);
  if (targetPane) {
    targetPane.classList.add('active');
  }

  const targetNav = document.querySelector(`.nav-item[data-tab="${tabId}"]`);
  if (targetNav) {
    targetNav.classList.add('active');
  }

  // Update topbar titles
  const titles = {
    'tab-dashboard': ['Dashboard Overview', 'Manage bookings and content for BookShikara'],
    'tab-bookings': ['Booking Enquiries', 'Review incoming trip inquiries and update booking statuses'],
    'tab-hero': ['1. Hero Section Content', 'Customize brand title, tagline, and hero background visual'],
    'tab-shikara': ['2. Shikara Specifications', 'Exclusive Shikara boat details, capacity, pricing, and amenities'],
    'tab-gallery': ['3. Gallery Management', 'Upload high-resolution Shikara photos and reorder the display grid'],
    'tab-faqs': ['4. Frequently Asked Questions', 'Add, edit, or reorder helpful FAQs for prospective guests'],
    'tab-food': ['5. Food & Refreshment Menu', 'Manage authentic Kerala dishes, pricing, and food photos'],
    'tab-settings': ['Settings & Security', 'Configure business contact details and update your admin password']
  };

  if (titles[tabId]) {
    document.getElementById('page-title').textContent = titles[tabId][0];
    document.getElementById('page-subtitle').textContent = titles[tabId][1];
  }

  // Close mobile sidebar if open
  document.getElementById('sidebar').classList.remove('open');
}

// ==========================================
// 1. Dashboard Renderer
// ==========================================
function renderDashboard() {
  if (!currentBookings || !currentContent) return;

  const total = currentBookings.length;
  const newCount = currentBookings.filter(b => b.status === 'new').length;
  const confirmedCount = currentBookings.filter(b => b.status === 'confirmed').length;
  const galleryCount = (currentContent.gallery || []).length;

  document.getElementById('stat-total-bookings').textContent = total;
  document.getElementById('stat-new-bookings').textContent = newCount;
  document.getElementById('stat-confirmed-bookings').textContent = confirmedCount;
  document.getElementById('stat-gallery-count').textContent = galleryCount;

  // Update sidebar new bookings badge
  const badge = document.getElementById('badge-new-bookings');
  badge.textContent = newCount;
  badge.style.display = newCount > 0 ? 'inline-block' : 'none';

  // Recent 5 bookings
  const tbody = document.getElementById('dashboard-bookings-tbody');
  const recent = currentBookings.slice(0, 5);

  if (recent.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center py-6 text-muted">No booking inquiries yet.</td></tr>';
    return;
  }

  tbody.innerHTML = recent.map(b => `
    <tr>
      <td><strong>${escapeHtml(b.name)}</strong><br><small class="hint-text">${escapeHtml(b.phone)}</small></td>
      <td>${formatDate(b.date)}</td>
      <td>${escapeHtml(b.durationLabel || 'Standard')}</td>
      <td>${b.guests} Guests</td>
      <td><span class="badge badge-${b.status}">${b.status}</span></td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="viewBookingDetails('${b.id}')">View</button>
      </td>
    </tr>
  `).join('');
}

// ==========================================
// 2. Bookings Manager Renderer
// ==========================================
function renderBookings() {
  const filter = document.getElementById('booking-filter-status').value;
  let list = currentBookings || [];

  if (filter !== 'all') {
    list = list.filter(b => b.status === filter);
  }

  const tbody = document.getElementById('bookings-tbody');
  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center py-8 text-muted">No bookings found for filter "${filter}".</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(b => `
    <tr>
      <td><small class="hint-text">${new Date(b.createdAt).toLocaleDateString()}</small></td>
      <td><strong>${escapeHtml(b.name)}</strong></td>
      <td>
        <div>${escapeHtml(b.phone)}</div>
        <small class="hint-text">${escapeHtml(b.email || 'No email')}</small>
      </td>
      <td><strong>${formatDate(b.date)}</strong></td>
      <td>${escapeHtml(b.durationLabel || 'Cruise')}</td>
      <td>${b.guests} persons</td>
      <td>
        <select class="form-select status-select badge-${b.status}" onchange="updateBookingStatus('${b.id}', this.value)">
          <option value="new" ${b.status === 'new' ? 'selected' : ''}>New</option>
          <option value="confirmed" ${b.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
          <option value="cancelled" ${b.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
        </select>
      </td>
      <td>
        <div style="display:flex; gap:6px;">
          <button class="btn btn-secondary btn-sm" onclick="viewBookingDetails('${b.id}')" title="Details">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </button>
          <button class="btn btn-danger btn-sm" onclick="deleteBooking('${b.id}')" title="Delete">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

async function updateBookingStatus(id, newStatus) {
  try {
    await apiFetch(`/api/admin/bookings/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status: newStatus })
    });
    showToast(`Booking marked as ${newStatus}`, 'success');
    // Refresh bookings
    currentBookings = await apiFetch('/api/admin/bookings');
    renderDashboard();
    renderBookings();
  } catch (err) {
    showToast('Failed to update booking status', 'error');
  }
}

async function deleteBooking(id) {
  if (!confirm('Are you sure you want to delete this booking enquiry?')) return;
  try {
    await apiFetch(`/api/admin/bookings/${id}`, { method: 'DELETE' });
    showToast('Booking deleted', 'success');
    currentBookings = currentBookings.filter(b => b.id !== id);
    renderDashboard();
    renderBookings();
  } catch (err) {
    showToast('Failed to delete booking', 'error');
  }
}

function viewBookingDetails(id) {
  const b = currentBookings.find(x => x.id === id);
  if (!b) return;

  const modal = document.getElementById('booking-modal');
  const title = document.getElementById('modal-booking-title');
  const content = document.getElementById('modal-booking-content');

  title.textContent = `Booking Enquiry: ${b.name}`;
  content.innerHTML = `
    <div class="detail-row">
      <div class="detail-label">Status</div>
      <div class="detail-value"><span class="badge badge-${b.status}">${b.status.toUpperCase()}</span></div>
    </div>
    <div class="detail-row">
      <div class="detail-label">Customer Name</div>
      <div class="detail-value"><strong>${escapeHtml(b.name)}</strong></div>
    </div>
    <div class="detail-row">
      <div class="detail-label">Phone Number</div>
      <div class="detail-value">
        <a href="tel:${escapeHtml(b.phone)}" style="color:var(--teal-700); font-weight:600;">${escapeHtml(b.phone)}</a>
        <a href="https://wa.me/${b.phone.replace(/[^0-9]/g, '')}" target="_blank" style="margin-left:12px; color:var(--green-600); font-size:12px;">WhatsApp ↗</a>
      </div>
    </div>
    <div class="detail-row">
      <div class="detail-label">Email</div>
      <div class="detail-value"><a href="mailto:${escapeHtml(b.email)}">${escapeHtml(b.email || 'N/A')}</a></div>
    </div>
    <div class="detail-row">
      <div class="detail-label">Requested Date</div>
      <div class="detail-value"><strong>${formatDate(b.date)}</strong></div>
    </div>
    <div class="detail-row">
      <div class="detail-label">Number of Guests</div>
      <div class="detail-value">${b.guests} Guests (Max capacity 8)</div>
    </div>
    <div class="detail-row">
      <div class="detail-label">Duration Option</div>
      <div class="detail-value">${escapeHtml(b.durationLabel || 'Standard')}</div>
    </div>
    <div class="detail-row">
      <div class="detail-label">Special Message</div>
      <div class="detail-value">${b.message ? escapeHtml(b.message) : '<em class="hint-text">No special message provided</em>'}</div>
    </div>
    <div class="detail-row">
      <div class="detail-label">Received At</div>
      <div class="detail-value">${new Date(b.createdAt).toLocaleString()}</div>
    </div>
  `;

  modal.style.display = 'flex';
}

function closeBookingModal() {
  document.getElementById('booking-modal').style.display = 'none';
}

// ==========================================
// 3. Hero Section Manager
// ==========================================
function populateHeroForm() {
  if (!currentContent || !currentContent.hero) return;
  const h = currentContent.hero;

  document.getElementById('hero-title').value = h.title || '';
  document.getElementById('hero-subtitle').value = h.subtitle || '';
  document.getElementById('hero-tagline').value = h.tagline || '';
  document.getElementById('hero-description').value = h.description || '';
  document.getElementById('hero-bg').value = h.backgroundImage || '';
  document.getElementById('hero-cta-text').value = h.ctaText || 'Book Now';
  document.getElementById('hero-cta-target').value = h.ctaTarget || '#shikara-details';

  updateHeroLivePreview();
}

function updateHeroLivePreview() {
  const title = document.getElementById('hero-title').value || 'BookShikara';
  const subtitle = document.getElementById('hero-subtitle').value || 'SHIKARA CRUISE';
  const tagline = document.getElementById('hero-tagline').value || '';
  const bg = document.getElementById('hero-bg').value || '';
  const cta = document.getElementById('hero-cta-text').value || 'Book Now';

  document.getElementById('preview-hero-title').textContent = title;
  document.getElementById('preview-hero-subtitle').textContent = subtitle;
  document.getElementById('preview-hero-tagline').textContent = tagline;
  document.getElementById('preview-hero-cta').textContent = cta;
  if (bg) {
    document.getElementById('hero-preview-bg').style.backgroundImage = `url('${bg}')`;
  }
}

// ==========================================
// 4. Shikara Details Manager
// ==========================================
let editingAmenities = [];
let editingDurations = [];

function populateShikaraForm() {
  if (!currentContent || !currentContent.shikara) return;
  const s = currentContent.shikara;

  document.getElementById('shikara-name').value = s.name || '';
  document.getElementById('shikara-subtitle').value = s.subtitle || '';
  document.getElementById('shikara-description').value = s.description || '';
  document.getElementById('shikara-capacity').value = s.capacity || '';
  document.getElementById('shikara-baseprice').value = s.basePrice || '';
  document.getElementById('shikara-priceunit').value = s.priceUnit || '';
  document.getElementById('shikara-timings').value = s.timings || '';
  document.getElementById('shikara-location').value = s.departureLocation || '';
  document.getElementById('shikara-pricenote').value = s.priceNote || '';

  editingAmenities = [...(s.amenities || [])];
  editingDurations = JSON.parse(JSON.stringify(s.durationOptions || []));

  renderAmenitiesList();
  renderDurationsList();
}

function renderAmenitiesList() {
  const container = document.getElementById('amenities-container');
  container.innerHTML = editingAmenities.map((amenity, idx) => `
    <div class="amenity-row">
      <input type="text" value="${escapeHtml(amenity)}" oninput="updateAmenity(${idx}, this.value)" style="flex:1;">
      <button type="button" class="btn btn-danger btn-sm" onclick="removeAmenity(${idx})" title="Remove">&times;</button>
    </div>
  `).join('');
}

function updateAmenity(idx, val) {
  editingAmenities[idx] = val;
}

function removeAmenity(idx) {
  editingAmenities.splice(idx, 1);
  renderAmenitiesList();
}

function addAmenity() {
  editingAmenities.push('New Amenity Feature');
  renderAmenitiesList();
}

function renderDurationsList() {
  const container = document.getElementById('duration-list');
  container.innerHTML = editingDurations.map((d, idx) => `
    <div class="duration-item">
      <div>
        <label style="font-size:11px; font-weight:700; color:var(--gray-500);">PACKAGE NAME</label>
        <input type="text" value="${escapeHtml(d.name)}" oninput="updateDuration(${idx}, 'name', this.value)">
      </div>
      <div>
        <label style="font-size:11px; font-weight:700; color:var(--gray-500);">PRICE</label>
        <input type="text" value="${escapeHtml(d.price)}" oninput="updateDuration(${idx}, 'price', this.value)">
      </div>
      <div>
        <label style="font-size:11px; font-weight:700; color:var(--gray-500);">HIGHLIGHT TAG</label>
        <input type="text" value="${escapeHtml(d.highlight || '')}" placeholder="e.g. Popular" oninput="updateDuration(${idx}, 'highlight', this.value)">
      </div>
      <div style="display:flex; align-items:flex-end;">
        <button type="button" class="btn btn-danger btn-sm" onclick="removeDuration(${idx})">Delete</button>
      </div>
      <div style="grid-column: 1 / -1;">
        <label style="font-size:11px; font-weight:700; color:var(--gray-500);">DESCRIPTION</label>
        <input type="text" value="${escapeHtml(d.description || '')}" placeholder="Details of canals & route" oninput="updateDuration(${idx}, 'description', this.value)">
      </div>
    </div>
  `).join('');
}

function updateDuration(idx, field, val) {
  editingDurations[idx][field] = val;
}

function removeDuration(idx) {
  editingDurations.splice(idx, 1);
  renderDurationsList();
}

function addDuration() {
  editingDurations.push({
    id: 'dur-' + Date.now().toString(36),
    name: 'New Cruise Duration',
    duration: '2.5 Hours',
    price: '₹2,800',
    popular: false,
    highlight: '',
    description: 'Scenic cruise route along the backwaters'
  });
  renderDurationsList();
}

// ==========================================
// 5. Gallery Manager
// ==========================================
function renderGallery() {
  if (!currentContent || !currentContent.gallery) return;
  const list = currentContent.gallery;
  document.getElementById('gallery-total-count').textContent = list.length;

  const grid = document.getElementById('gallery-grid');
  if (list.length === 0) {
    grid.innerHTML = '<p class="text-center py-6 text-muted full-width">No gallery images added yet.</p>';
    return;
  }

  grid.innerHTML = list.map((item, idx) => `
    <div class="admin-gallery-card">
      <img src="${escapeHtml(item.imageUrl)}" class="gallery-card-img" alt="${escapeHtml(item.title)}" loading="lazy">
      <div class="gallery-card-body">
        <h4>${escapeHtml(item.title)}</h4>
        <span class="badge badge-teal" style="align-self:flex-start; margin:4px 0;">${escapeHtml(item.category || 'Shikara')}</span>
        <p>${escapeHtml(item.caption || '')}</p>
      </div>
      <div class="gallery-card-actions">
        <div>
          <button class="btn btn-secondary btn-sm" onclick="moveGalleryItem(${idx}, -1)" ${idx === 0 ? 'disabled' : ''} title="Move Earlier">▲</button>
          <button class="btn btn-secondary btn-sm" onclick="moveGalleryItem(${idx}, 1)" ${idx === list.length - 1 ? 'disabled' : ''} title="Move Later">▼</button>
        </div>
        <button class="btn btn-danger btn-sm" onclick="deleteGalleryItem('${item.id}')" title="Delete Image">Delete</button>
      </div>
    </div>
  `).join('');
}

async function moveGalleryItem(index, direction) {
  const gallery = currentContent.gallery;
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= gallery.length) return;

  const temp = gallery[index];
  gallery[index] = gallery[targetIndex];
  gallery[targetIndex] = temp;

  const order = gallery.map(item => item.id);
  try {
    await apiFetch('/api/gallery-reorder', {
      method: 'PUT',
      body: JSON.stringify({ order })
    });
    showToast('Gallery reordered', 'success');
    currentContent.gallery = gallery;
    renderGallery();
  } catch (err) {
    showToast('Failed to save gallery order', 'error');
  }
}

async function deleteGalleryItem(id) {
  if (!confirm('Are you sure you want to delete this gallery photo?')) return;
  try {
    await apiFetch(`/api/gallery/${id}`, { method: 'DELETE' });
    showToast('Image removed from gallery', 'success');
    currentContent.gallery = currentContent.gallery.filter(g => g.id !== id);
    renderGallery();
    renderDashboard();
  } catch (err) {
    showToast('Failed to delete image', 'error');
  }
}

// ==========================================
// 6. FAQs Manager
// ==========================================
function renderFaqs() {
  if (!currentContent || !currentContent.faqs) return;
  const list = currentContent.faqs;
  document.getElementById('faq-total-count').textContent = list.length;

  const container = document.getElementById('faq-list');
  if (list.length === 0) {
    container.innerHTML = '<p class="text-center py-6 text-muted">No FAQs created yet.</p>';
    return;
  }

  container.innerHTML = list.map((faq, idx) => `
    <div class="admin-faq-card">
      <div class="faq-header">
        <div style="flex:1;">
          <div class="faq-q-text">Q: ${escapeHtml(faq.question)}</div>
          <div class="faq-a-text mt-2">${escapeHtml(faq.answer)}</div>
        </div>
        <div class="faq-actions">
          <button class="btn btn-secondary btn-sm" onclick="moveFaqItem(${idx}, -1)" ${idx === 0 ? 'disabled' : ''}>▲</button>
          <button class="btn btn-secondary btn-sm" onclick="moveFaqItem(${idx}, 1)" ${idx === list.length - 1 ? 'disabled' : ''}>▼</button>
          <button class="btn btn-danger btn-sm" onclick="deleteFaqItem('${faq.id}')">Delete</button>
        </div>
      </div>
    </div>
  `).join('');
}

async function moveFaqItem(index, direction) {
  const faqs = currentContent.faqs;
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= faqs.length) return;

  const temp = faqs[index];
  faqs[index] = faqs[targetIndex];
  faqs[targetIndex] = temp;

  const order = faqs.map(item => item.id);
  try {
    await apiFetch('/api/faqs-reorder', {
      method: 'PUT',
      body: JSON.stringify({ order })
    });
    showToast('FAQs reordered', 'success');
    currentContent.faqs = faqs;
    renderFaqs();
  } catch (err) {
    showToast('Failed to save FAQ order', 'error');
  }
}

async function deleteFaqItem(id) {
  if (!confirm('Are you sure you want to delete this FAQ?')) return;
  try {
    await apiFetch(`/api/faqs/${id}`, { method: 'DELETE' });
    showToast('FAQ deleted', 'success');
    currentContent.faqs = currentContent.faqs.filter(f => f.id !== id);
    renderFaqs();
  } catch (err) {
    showToast('Failed to delete FAQ', 'error');
  }
}

// ==========================================
// 7. Food Menu Manager
// ==========================================
function renderFood() {
  if (!currentContent || !currentContent.food) return;
  const list = currentContent.food;
  document.getElementById('food-total-count').textContent = list.length;

  const grid = document.getElementById('food-grid');
  if (list.length === 0) {
    grid.innerHTML = '<p class="text-center py-6 text-muted full-width">No food items listed yet.</p>';
    return;
  }

  grid.innerHTML = list.map(item => `
    <div class="admin-food-card">
      <img src="${escapeHtml(item.imageUrl)}" class="food-card-img" alt="${escapeHtml(item.name)}" loading="lazy">
      <div class="food-card-body">
        <div class="food-card-header">
          <h4>${escapeHtml(item.name)}</h4>
          <span class="food-price">${escapeHtml(item.price)}</span>
        </div>
        <span class="food-category-badge">${escapeHtml(item.category || 'Specialty')}</span>
        <p class="food-description">${escapeHtml(item.description || '')}</p>
        <div class="food-card-actions">
          <button class="btn btn-danger btn-sm" onclick="deleteFoodItem('${item.id}')">Delete Item</button>
        </div>
      </div>
    </div>
  `).join('');
}

async function deleteFoodItem(id) {
  if (!confirm('Are you sure you want to delete this food item?')) return;
  try {
    await apiFetch(`/api/food/${id}`, { method: 'DELETE' });
    showToast('Menu item deleted', 'success');
    currentContent.food = currentContent.food.filter(f => f.id !== id);
    renderFood();
  } catch (err) {
    showToast('Failed to delete food item', 'error');
  }
}

// ==========================================
// 8. Settings & Security
// ==========================================
function populateSettingsForm() {
  if (!currentContent || !currentContent.settings) return;
  const s = currentContent.settings;

  document.getElementById('settings-bizname').value = s.businessName || '';
  document.getElementById('settings-phone').value = s.phone || '';
  document.getElementById('settings-whatsapp').value = s.whatsapp || '';
  document.getElementById('settings-email').value = s.email || '';
  document.getElementById('settings-address').value = s.address || '';
}

// ==========================================
// Setup Event Listeners
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initAuth();

  // Navigation tab clicks
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      if (tabId) switchTab(tabId);
    });
  });

  // Mobile sidebar toggle
  document.getElementById('mobile-toggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  // Refresh data button
  document.getElementById('btn-quick-refresh').addEventListener('click', () => {
    showToast('Refreshing content...', 'info');
    loadAllData();
  });

  // Logout button
  document.getElementById('logout-btn').addEventListener('click', () => {
    handleLogout();
  });

  // Filter bookings dropdown
  document.getElementById('booking-filter-status').addEventListener('change', () => {
    renderBookings();
  });

  // Login form submit
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('login-btn');
    btn.disabled = true;
    btn.textContent = 'Signing in...';

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
      const res = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });

      if (res.token) {
        authToken = res.token;
        localStorage.setItem('bookshikara_token', authToken);
        showToast('Welcome back, BookShikara Admin!', 'success');
        showAppScreen();
        loadAllData();
      }
    } catch (err) {
      showToast(err.message || 'Login failed. Please verify credentials.', 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Sign In to Dashboard';
    }
  });

  // Hero form live updates
  ['hero-title', 'hero-subtitle', 'hero-tagline', 'hero-bg', 'hero-cta-text'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateHeroLivePreview);
  });

  // Hero image file upload
  document.getElementById('hero-bg-file').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await uploadImageFile(file);
      document.getElementById('hero-bg').value = url;
      updateHeroLivePreview();
    } catch (err) {
      showToast('Image upload failed: ' + err.message, 'error');
    }
  });

  // Hero form submit
  document.getElementById('hero-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      title: document.getElementById('hero-title').value,
      subtitle: document.getElementById('hero-subtitle').value,
      tagline: document.getElementById('hero-tagline').value,
      description: document.getElementById('hero-description').value,
      backgroundImage: document.getElementById('hero-bg').value,
      ctaText: document.getElementById('hero-cta-text').value,
      ctaTarget: document.getElementById('hero-cta-target').value
    };

    try {
      await apiFetch('/api/hero', {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      showToast('Hero section updated successfully!', 'success');
      currentContent.hero = { ...currentContent.hero, ...payload };
    } catch (err) {
      showToast('Failed to save Hero section', 'error');
    }
  });

  // Shikara form buttons
  document.getElementById('btn-add-amenity').addEventListener('click', addAmenity);
  document.getElementById('btn-add-duration').addEventListener('click', addDuration);

  // Shikara form submit
  document.getElementById('shikara-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      name: document.getElementById('shikara-name').value,
      subtitle: document.getElementById('shikara-subtitle').value,
      description: document.getElementById('shikara-description').value,
      capacity: document.getElementById('shikara-capacity').value,
      basePrice: document.getElementById('shikara-baseprice').value,
      priceUnit: document.getElementById('shikara-priceunit').value,
      timings: document.getElementById('shikara-timings').value,
      departureLocation: document.getElementById('shikara-location').value,
      priceNote: document.getElementById('shikara-pricenote').value,
      amenities: editingAmenities.filter(a => a.trim().length > 0),
      durationOptions: editingDurations
    };

    try {
      await apiFetch('/api/shikara', {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      showToast('Shikara details updated successfully!', 'success');
      currentContent.shikara = payload;
    } catch (err) {
      showToast('Failed to save Shikara details', 'error');
    }
  });

  // Gallery image file upload
  document.getElementById('gallery-file').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await uploadImageFile(file);
      document.getElementById('gallery-url').value = url;
    } catch (err) {
      showToast('Image upload failed: ' + err.message, 'error');
    }
  });

  // Add gallery form submit
  document.getElementById('add-gallery-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      title: document.getElementById('gallery-title').value,
      caption: document.getElementById('gallery-caption').value,
      imageUrl: document.getElementById('gallery-url').value,
      category: document.getElementById('gallery-category').value
    };

    try {
      const res = await apiFetch('/api/gallery', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      showToast('New photo added to gallery!', 'success');
      currentContent.gallery.push(res.item);
      renderGallery();
      renderDashboard();
      document.getElementById('add-gallery-form').reset();
    } catch (err) {
      showToast('Failed to add gallery image: ' + err.message, 'error');
    }
  });

  // Add FAQ form submit
  document.getElementById('add-faq-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      question: document.getElementById('faq-question').value,
      answer: document.getElementById('faq-answer').value
    };

    try {
      const res = await apiFetch('/api/faqs', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      showToast('FAQ item added!', 'success');
      currentContent.faqs.push(res.item);
      renderFaqs();
      document.getElementById('add-faq-form').reset();
    } catch (err) {
      showToast('Failed to add FAQ: ' + err.message, 'error');
    }
  });

  // Food image file upload
  document.getElementById('food-file').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await uploadImageFile(file);
      document.getElementById('food-url').value = url;
    } catch (err) {
      showToast('Image upload failed: ' + err.message, 'error');
    }
  });

  // Add Food form submit
  document.getElementById('add-food-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      name: document.getElementById('food-name').value,
      price: document.getElementById('food-price').value,
      category: document.getElementById('food-category').value,
      imageUrl: document.getElementById('food-url').value,
      description: document.getElementById('food-description').value
    };

    try {
      const res = await apiFetch('/api/food', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      showToast('Food item added to menu!', 'success');
      currentContent.food.push(res.item);
      renderFood();
      document.getElementById('add-food-form').reset();
    } catch (err) {
      showToast('Failed to add food item: ' + err.message, 'error');
    }
  });

  // Settings form submit
  document.getElementById('settings-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      businessName: document.getElementById('settings-bizname').value,
      phone: document.getElementById('settings-phone').value,
      whatsapp: document.getElementById('settings-whatsapp').value,
      email: document.getElementById('settings-email').value,
      address: document.getElementById('settings-address').value
    };

    try {
      await apiFetch('/api/settings', {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      showToast('Contact settings saved!', 'success');
      currentContent.settings = payload;
    } catch (err) {
      showToast('Failed to save settings', 'error');
    }
  });

  // Password change submit
  document.getElementById('password-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;

    try {
      await apiFetch('/api/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword })
      });
      showToast('Password updated successfully! Please re-login.', 'success');
      document.getElementById('password-form').reset();
      setTimeout(() => handleLogout(), 1200);
    } catch (err) {
      showToast(err.message || 'Failed to update password', 'error');
    }
  });

  // Reset defaults button
  document.getElementById('btn-reset-defaults').addEventListener('click', async () => {
    if (!confirm('Are you sure you want to reset all website sections, gallery, FAQs, and food items to initial seed defaults? Any custom edits will be restored to default.')) {
      return;
    }

    try {
      const res = await apiFetch('/api/admin/reset-defaults', { method: 'POST' });
      showToast('System content restored to default seed values!', 'success');
      currentContent = res.data;
      loadAllData();
    } catch (err) {
      showToast('Failed to reset content: ' + err.message, 'error');
    }
  });
});

// Helper formatting functions
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatDate(dateStr) {
  if (!dateStr) return 'N/A';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch (e) {
    return dateStr;
  }
}
