const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'info.riazulislam99@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD // Set this environment variable
  }
});

// Endpoint to handle user info
app.post('/send-info', async (req, res) => {
  try {
    const {
      userAgent,
      browserName,
      browserVersion,
      osName,
      deviceType,
      ip,
      location,
      timestamp
    } = req.body;

    if (!userAgent || !browserName || !osName || !deviceType || !ip || !timestamp) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const mailOptions = {
      from: 'info.riazulislam99@gmail.com',
      to: 'info.riazulislam99@gmail.com',
      subject: 'Hacker Mode Device Capture',
      html: `
        <h2>Hacker Mode Device Capture</h2>
        <p><strong>Timestamp:</strong> ${new Date(timestamp).toLocaleString()}</p>
        <p><strong>Browser:</strong> ${browserName} ${browserVersion || ''}</p>
        <p><strong>Operating System:</strong> ${osName}</p>
        <p><strong>Device Type:</strong> ${deviceType}</p>
        <p><strong>IP Address:</strong> ${ip}</p>
        <p><strong>Approximate Location:</strong> ${location || 'Not available'}</p>
        <p><strong>User Agent:</strong> ${userAgent}</p>
        <hr>
        <p>Collected for demo/analytics purposes during Hacker Mode activation.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.json({ success: true, message: 'Information sent successfully' });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});