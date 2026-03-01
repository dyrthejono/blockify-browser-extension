const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

let lastLocation = null;

// Parse JSON body
app.use(express.json());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Receive location from frontend
app.post('/location', (req, res) => {
    lastLocation = req.body;
    console.log('Received coordinates:', lastLocation);
    res.status(200).json({ message: 'Location received successfully' });
});

// Admin route to view last location
app.get('/admin', (req, res) => {
    res.json({
        location: lastLocation,
        note: "Temporary storage only. Clears on restart."
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});