const express = require('express');
const router = express.Router();
const upload = require('../src/middleware/uploadMiddleware');
const bookController = require('../controllers/bookController');

const verifyToken = require('../src/middleware/authMiddleware');

// URL: /api/books
router.get('/', verifyToken, bookController.getAllBooks);

// URL: /api/books (POST)
router.post(
  '/',
  verifyToken,
  upload.single('image'),
  bookController.createBook
);

// URL: /api/books/:id (DELETE)
router.delete('/:id', verifyToken, bookController.deleteBook);

module.exports = router;
