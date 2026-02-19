// db.js
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

// Pastikan file .env di-root project
dotenv.config({ path: path.resolve(__dirname, '.env') });

// koneksi pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Cek koneksi
(async () => {
  try {
    const conn = await pool.getConnection();
    //console.log(`✅ Connected to database: ${process.env.DB_NAME}`);
    conn.release();
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  }
})();

module.exports = pool;
