const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({
      status: 'fail',
      message: 'Akses ditolak! Token tidak ditemukan.'
    });
  }

  try {
    const secretKey = process.env.JWT_SECRET || 'rahasia_logika_positif';
    const decoded = jwt.verify(token, secretKey);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      status: 'fail',
      message: 'Token tidak valid atau sudah kadaluwarsa.'
    });
  }
};

module.exports = verifyToken;
