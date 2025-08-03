// Import the necessary modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// Create an Express application
const app = express();
const port = process.env.PORT || 3000; // Use Render's port or default to 3000 for local development

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// Enable CORS for development. This allows your HTML file to communicate with the server.
// In a production environment, you would configure this to be more restrictive.
app.use(cors());

// Define the file where the data will be stored.
const emailsFilePath = path.join(__dirname, 'emails.txt');
const feedbackFilePath = path.join(__dirname, 'feedback.txt');

// A POST route to handle email submissions
app.post('/submit-email', (req, res) => {
    const { email, form } = req.body;
    const timestamp = new Date().toISOString();
    const data = `Timestamp: ${timestamp}, Email: ${email}, Form: ${form}\n`;

    // Append the new data to the emails.txt file
    fs.appendFile(emailsFilePath, data, (err) => {
        if (err) {
            console.error('Failed to write email to file:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        console.log(`New email submitted: ${email}`);
        res.status(200).json({ success: true, message: 'Email submitted successfully!' });
    });
});

// A POST route to handle feedback submissions
app.post('/submit-feedback', (req, res) => {
    const { feedback } = req.body;
    const timestamp = new Date().toISOString();
    const data = `Timestamp: ${timestamp}, Feedback: ${feedback}\n`;

    // Append the new data to the feedback.txt file
    fs.appendFile(feedbackFilePath, data, (err) => {
        if (err) {
            console.error('Failed to write feedback to file:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        console.log(`New feedback submitted: ${feedback}`);
        res.status(200).json({ success: true, message: 'Feedback submitted successfully!' });
    });
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
