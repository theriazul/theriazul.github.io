const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./visitors.db');

db.serialize(() => {
  // Visitors: one row per unique visitor (identified by cookie-generated visitor_id)
  db.run(`CREATE TABLE IF NOT EXISTS visitors (
    visitor_id TEXT PRIMARY KEY,
    first_seen TEXT,
    last_ip TEXT
  )`);

  // Daily visits: track which visitor_id visited on which date
  db.run(`CREATE TABLE IF NOT EXISTS daily_visits (
    visitor_id TEXT,
    ip TEXT,
    date TEXT,
    PRIMARY KEY (visitor_id, date)
  )`);

  // For legacy fallback (when no visitor_id available), keep an IP-only table
  db.run(`CREATE TABLE IF NOT EXISTS daily_visits_by_ip (
    ip TEXT,
    date TEXT,
    PRIMARY KEY (ip, date)
  )`);

  console.log('Database initialized (visitors + daily_visits)');
});

db.close();