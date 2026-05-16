from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from datetime import datetime

app = Flask(__name__)
CORS(app)

def get_db():
    conn = sqlite3.connect('visitors.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with get_db() as conn:
        conn.execute('''CREATE TABLE IF NOT EXISTS total_visits (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            count INTEGER DEFAULT 0
        )''')
        conn.execute('''CREATE TABLE IF NOT EXISTS today_visits (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            count INTEGER DEFAULT 0,
            date TEXT
        )''')
        conn.execute('''CREATE TABLE IF NOT EXISTS daily_visits (
            ip TEXT,
            date TEXT,
            PRIMARY KEY (ip, date)
        )''')
        conn.execute('INSERT OR IGNORE INTO total_visits (id, count) VALUES (1, 0)')
        today = datetime.now().strftime('%Y-%m-%d')
        conn.execute('INSERT OR IGNORE INTO today_visits (id, count, date) VALUES (1, 0, ?)', (today,))

init_db()

@app.route('/api/stats', methods=['GET'])
def get_stats():
    today = datetime.now().strftime('%Y-%m-%d')
    with get_db() as conn:
        total_row = conn.execute('SELECT count FROM total_visits WHERE id = 1').fetchone()
        today_row = conn.execute('SELECT count, date FROM today_visits WHERE id = 1').fetchone()
        
        if today_row['date'] != today:
            conn.execute('UPDATE today_visits SET count = 0, date = ? WHERE id = 1', (today,))
            today_row = {'count': 0, 'date': today}
        
        return jsonify({
            'total': total_row['count'] if total_row else 0,
            'today': today_row['count'] if today_row else 0
        })

@app.route('/api/visit', methods=['POST'])
def record_visit():
    ip = request.remote_addr
    today = datetime.now().strftime('%Y-%m-%d')
    
    with get_db() as conn:
        # Increment total visits
        conn.execute('UPDATE total_visits SET count = count + 1 WHERE id = 1')
        
        # Check if IP visited today
        existing = conn.execute('SELECT 1 FROM daily_visits WHERE ip = ? AND date = ?', (ip, today)).fetchone()
        if not existing:
            conn.execute('INSERT INTO daily_visits (ip, date) VALUES (?, ?)', (ip, today))
            conn.execute('UPDATE today_visits SET count = count + 1, date = ? WHERE id = 1', (today,))
    
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True, port=3000)