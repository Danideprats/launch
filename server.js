// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    'https://www.consciousnessfactory.com',
    'https://consciousnessfactory.com',
    'http://localhost:3000' // Local dev support
  ],
  optionsSuccessStatus: 200
}));

// Serve static files (HTML/CSS/JS)
app.use(express.static(path.join(__dirname, 'public')));

// Email submission route
app.post('/submit-email', (req, res) => {
  const { email, form } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required.' });
  }

  const entry = `${new Date().toISOString()} - ${email} (${form || 'unknown'})\n`;
  const filePath = path.join(__dirname, 'subscribers.txt');

  fs.appendFile(filePath, entry, (err) => {
    if (err) {
      console.error('Error saving email:', err);
      return res.status(500).json({ success: false, message: 'Failed to save email.' });
    }
    console.log('Saved:', email);
    return res.status(200).json({ success: true, message: 'Email submitted successfully!' });
  });
});

// Feedback route (optional)
app.post('/submit-feedback', (req, res) => {
  const { feedback } = req.body;
  const entry = `${new Date().toISOString()} - ${feedback}\n`;
  fs.appendFileSync(path.join(__dirname, 'feedback.txt'), entry);
  res.status(200).json({ success: true, message: 'Feedback submitted!' });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});