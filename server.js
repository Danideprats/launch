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

// Configure CORS to allow requests from your website's domain
// In a production environment, you should be specific about the allowed origins
const corsOptions = {
    origin: 'https://www.consciousnessfactory.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// A POST route to handle a catch-all for submission errors
app.post('/', (req, res) => {
    console.error('Submission to root URL received. This should not happen.');
    res.status(404).json({ success: false, message: 'Route not found' });
});

// A POST route to handle email submissions
app.post('/submit-email', (req, res) => {
    const { email, form } = req.body;
    const timestamp = new Date().toISOString();
    const data = `Timestamp: ${timestamp}, Email: ${email}, Form: ${form}\n`;

    // In a production environment, you would save this to a database.
    // For this demonstration, we'll log it to the console.
    console.log(`New email submitted: ${email}`);
    res.status(200).json({ success: true, message: 'Email submitted successfully!' });
});

// A POST route to handle feedback submissions
app.post('/submit-feedback', (req, res) => {
    const { feedback } = req.body;
    const timestamp = new Date().toISOString();
    const data = `Timestamp: ${timestamp}, Feedback: ${feedback}\n`;

    // In a production environment, you would save this to a database.
    // For this demonstration, we'll log it to the console.
    console.log(`New feedback submitted: ${feedback}`);
    res.status(200).json({ success: true, message: 'Feedback submitted successfully!' });
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
