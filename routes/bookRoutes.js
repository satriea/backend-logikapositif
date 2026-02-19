const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// URL: /api/books
router.get('/', bookController.getAllBooks);

// URL: /api/books (POST)
router.post('/', bookController.createBook);

// URL: /api/books/:id (DELETE)
router.delete('/:id', bookController.deleteBook);

module.exports = router;
