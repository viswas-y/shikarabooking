const fs = require('fs');
const path = require('path');
const seedData = require('./seedData');

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize database with seedData if db.json doesn't exist
function initDb() {
  if (!fs.existsSync(DB_FILE)) {
    saveDb(seedData);
    console.log('🌱 Database initialized with default Sithara Shikara seed data');
  }
}

// Read database
function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      initDb();
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading database, restoring seed data:', err.message);
    saveDb(seedData);
    return JSON.parse(JSON.stringify(seedData));
  }
}

// Atomic save database
function saveDb(data) {
  const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
  try {
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('Error saving database:', err.message);
    try {
      if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
    } catch (_) {}
    throw err;
  }
}

// Helper methods
const db = {
  get: (key) => {
    const data = readDb();
    return key ? data[key] : data;
  },

  set: (key, value) => {
    const data = readDb();
    data[key] = value;
    saveDb(data);
    return data[key];
  },

  update: (key, patch) => {
    const data = readDb();
    if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
      data[key] = { ...data[key], ...patch };
    } else {
      data[key] = patch;
    }
    saveDb(data);
    return data[key];
  },

  getAll: () => readDb(),

  resetToDefault: () => {
    saveDb(seedData);
    return readDb();
  }
};

initDb();

module.exports = db;
