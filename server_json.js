const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'visitors.json');

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) return { visitors: {}, daily: {} };
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) || { visitors: {}, daily: {} };
  } catch (e) {
    console.error('readData error', e);
    return { visitors: {}, daily: {} };
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('writeData error', e);
  }
}

function parseCookies(req) {
  const header = req.headers.cookie || '';
  return header.split(';').map(c => c.trim()).filter(Boolean).reduce((acc, pair) => {
    const idx = pair.indexOf('=');
    if (idx < 0) return acc;
    const key = decodeURIComponent(pair.slice(0, idx).trim());
    const val = decodeURIComponent(pair.slice(idx + 1).trim());
    acc[key] = val;
    return acc;
  }, {});
}

app.get('/api/stats', (req, res) => {
  const data = readData();
  const today = new Date().toISOString().split('T')[0];
  const total = Object.keys(data.visitors || {}).length;
  const todayVisitors = data.daily && data.daily[today] ? Object.keys(data.daily[today]).length : 0;
  console.log('[api] GET /api/stats ->', { total, todayVisitors });
  res.json({ total, today: todayVisitors });
});

app.post('/api/visit', (req, res) => {
  const data = readData();
  const cookies = parseCookies(req);
  let visitorId = cookies['visitor_id'];
  const ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0].trim() : req.ip;
  const today = new Date().toISOString().split('T')[0];
  let createdVisitor = false;

  if (!visitorId) {
    // generate a simple id
    visitorId = Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
    createdVisitor = true;
  }

  if (!data.visitors) data.visitors = {};
  if (!data.daily) data.daily = {};

  if (!data.visitors[visitorId]) {
    data.visitors[visitorId] = { first_seen: new Date().toISOString(), last_ip: ip };
    console.log('[api] new visitor recorded', visitorId);
  } else {
    data.visitors[visitorId].last_ip = ip;
  }

  if (!data.daily[today]) data.daily[today] = {};
  if (!data.daily[today][visitorId]) {
    data.daily[today][visitorId] = true;
    console.log('[api] counted today visit for', visitorId);
  }

  writeData(data);

  // send cookie if newly created
  if (createdVisitor) {
    // set cookie for 1 year
    res.cookie('visitor_id', visitorId, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: false });
  }

  const total = Object.keys(data.visitors).length;
  const todayCount = Object.keys(data.daily[today] || {}).length;
  res.json({ success: true, total, today: todayCount });
});

app.listen(PORT, () => {
  console.log(`Simple visitor JSON API running on port ${PORT}`);
  console.log('Data file:', DATA_FILE);
});
