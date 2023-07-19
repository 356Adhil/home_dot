const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

// Get all books
router.get('/', booksController.getAllBooks);

// Get a specific book by ID
router.get('/:id', booksController.getBookById);

// Add a new book
router.post('/', booksController.createBook);

// Update an existing book
router.put('/:id', booksController.updateBook);

// Delete a book
router.delete('/:id', booksController.deleteBook);

module.exports = router;
