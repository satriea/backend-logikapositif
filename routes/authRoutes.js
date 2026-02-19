const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'Username dan Password wajib diisi' });
  }

  try {
    const sql = 'SELECT * FROM users WHERE username = ? LIMIT 1';
    const [rows] = await pool.execute(sql, [username]);

    if (rows.length > 0) {
      const user = rows[0];

      // Verifikasi Password Hash
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const token = jwt.sign(
          { id: user.id, username: user.username, role: user.role },
          process.env.JWT_SECRET || 'rahasia_logika_positif',
          { expiresIn: '1d' }
        );

        res.status(200).json({
          status: 'success',
          token,
          user: { username: user.username, role: user.role }
        });
      } else {
        res.status(401).json({ status: 'fail', message: 'Password Salah!' });
      }
    } else {
      res
        .status(401)
        .json({ status: 'fail', message: 'Username tidak terdaftar!' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

module.exports = router;
