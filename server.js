const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5014;

// KONFIGURASI CORS
app.use(
  cors({
    origin: ['http://localhost:1608'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json());

// --- IMPORT ROUTES ---
const bookRoutes = require('./routes/bookRoutes');

// --- ROUTES ---
app.use('/api/books', bookRoutes);

// Route
app.get('/', (req, res) => {
  res.send('API Logika Positif is Running...');
});

// --- ERROR HANDLING ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something broke!',
    details: err.message
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
