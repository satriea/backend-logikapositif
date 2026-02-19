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

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Izinkan pengiriman data JSON hingga 10MB (atau sesuaikan kebutuhan)
app.use(express.json({ limit: '10mb' }));

// Jika kamu menggunakan urlencoded juga, naikkan limitnya
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// --- IMPORT ROUTES ---
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');

// --- ROUTES ---
app.use('/api/books', bookRoutes);
app.use('/api', authRoutes);

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
