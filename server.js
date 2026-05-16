const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database
const db = new sqlite3.Database('./visitors.db');

// Helper to get client IP
function getClientIP(req) {
  return req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
}

// API to get stats
app.get('/api/stats', (req, res) => {
  const today = new Date().toISOString().split('T')[0];

  db.get(`SELECT count FROM total_visits WHERE id = 1`, (err, totalRow) => {
    if (err) return res.status(500).json({ error: err.message });

    db.get(`SELECT count, date FROM today_visits WHERE id = 1`, (err, todayRow) => {
      if (err) return res.status(500).json({ error: err.message });

      // Reset today's count if date changed
      if (todayRow.date !== today) {
        db.run(`UPDATE today_visits SET count = 0, date = ? WHERE id = 1`, [today], (err) => {
          if (err) console.error('Error resetting today count:', err);
        });
        todayRow.count = 0;
        todayRow.date = today;
      }

      res.json({
        total: totalRow ? totalRow.count : 0,
        today: todayRow ? todayRow.count : 0
      });
    });
  });
});

// API to record a visit
app.post('/api/visit', (req, res) => {
  const ip = getClientIP(req);
  const today = new Date().toISOString().split('T')[0];

  // Increment total visits
  db.run(`UPDATE total_visits SET count = count + 1 WHERE id = 1`, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    // Check if IP already visited today
    db.get(`SELECT 1 FROM daily_visits WHERE ip = ? AND date = ?`, [ip, today], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });

      if (!row) {
        // New unique visit today
        db.run(`INSERT INTO daily_visits (ip, date) VALUES (?, ?)`, [ip, today], (err) => {
          if (err) return res.status(500).json({ error: err.message });

          // Increment today's count
          db.run(`UPDATE today_visits SET count = count + 1, date = ? WHERE id = 1`, [today], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true });
          });
        });
      } else {
        // Already visited today, just total incremented
        res.json({ success: true });
      }
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});