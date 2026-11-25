const http = require('http');
const express = require('express');

async function testAll() {
  console.log('--- Starting CMS API Verification ---');
  
  // Require our configured express app from server.js logic or launch server
  const serverProcess = require('./server'); // This starts listening on 5000

  // Wait 1 second for port binding
  await new Promise(r => setTimeout(r, 1000));

  function request(method, path, body = null, headers = {}) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'localhost',
        port: 5000,
        path,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      };

      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(data) });
          } catch (e) {
            resolve({ status: res.statusCode, raw: data });
          }
        });
      });

      req.on('error', reject);
      if (body) req.write(JSON.stringify(body));
      req.end();
    });
  }

  try {
    // 1. Test GET /api/content
    console.log('1. Testing GET /api/content ...');
    const contentRes = await request('GET', '/api/content');
    console.log(`   Status: ${contentRes.status}`);
    console.log(`   Hero Title: ${contentRes.body.hero.title}`);
    console.log(`   Shikara Name: ${contentRes.body.shikara.name}`);
    console.log(`   Gallery Items: ${contentRes.body.gallery.length}`);
    console.log(`   FAQ Items: ${contentRes.body.faqs.length}`);
    console.log(`   Food Items: ${contentRes.body.food.length}`);
    if (contentRes.status !== 200) throw new Error('GET /api/content failed');

    // 2. Test POST /api/bookings (Public booking enquiry)
    console.log('\n2. Testing POST /api/bookings (Public Booking Enquiry) ...');
    const bookingRes = await request('POST', '/api/bookings', {
      name: 'Rohan Sharma',
      phone: '+91 98765 43210',
      email: 'rohan.sharma@example.com',
      date: '2026-12-10',
      guests: 4,
      durationId: 'dur-3h',
      durationLabel: '3 Hours Classic Heritage Cruise',
      message: 'Looking forward to sunset cruise with Karimeen pollichathu.'
    });
    console.log(`   Status: ${bookingRes.status}`);
    console.log(`   Success: ${bookingRes.body.success}`);
    console.log(`   Booking ID: ${bookingRes.body.booking.id}`);
    if (bookingRes.status !== 201) throw new Error('POST /api/bookings failed');

    // 3. Test POST /api/auth/login (CMS Login)
    console.log('\n3. Testing POST /api/auth/login (Admin Login) ...');
    const loginRes = await request('POST', '/api/auth/login', {
      username: 'admin',
      password: 'admin123'
    });
    console.log(`   Status: ${loginRes.status}`);
    console.log(`   Token received: ${!!loginRes.body.token}`);
    if (!loginRes.body.token) throw new Error('Login failed');
    const token = loginRes.body.token;

    // 4. Test GET /api/admin/bookings (Protected)
    console.log('\n4. Testing GET /api/admin/bookings (Protected) ...');
    const bookingsListRes = await request('GET', '/api/admin/bookings', null, {
      'Authorization': `Bearer ${token}`
    });
    console.log(`   Status: ${bookingsListRes.status}`);
    console.log(`   Total Bookings: ${bookingsListRes.body.length}`);
    const found = bookingsListRes.body.some(b => b.name === 'Rohan Sharma');
    console.log(`   Contains Rohan Sharma: ${found}`);
    if (!found) throw new Error('New booking not found in admin bookings list');

    // 5. Test PUT /api/admin/bookings/:id/status (Confirm booking)
    const bookingId = bookingRes.body.booking.id;
    console.log(`\n5. Testing PUT /api/admin/bookings/${bookingId}/status ...`);
    const statusRes = await request('PUT', `/api/admin/bookings/${bookingId}/status`, {
      status: 'confirmed'
    }, {
      'Authorization': `Bearer ${token}`
    });
    console.log(`   Status: ${statusRes.status}`);
    console.log(`   Updated status: ${statusRes.body.booking.status}`);
    if (statusRes.body.booking.status !== 'confirmed') throw new Error('Status update failed');

    console.log('\n✨ ALL CMS API TESTS PASSED SUCCESSFULLY! ✨');
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Test Error:', err);
    process.exit(1);
  }
}

testAll();
