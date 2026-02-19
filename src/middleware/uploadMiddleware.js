const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Nama folder tujuan
  },
  filename: (req, file, cb) => {
    // Nama file: timestamp + nama asli (untuk menghindari nama duplikat)
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // Limit 5MB
});

module.exports = upload;
