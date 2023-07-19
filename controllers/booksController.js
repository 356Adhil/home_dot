const books = require('../db');
const { validationResult } = require('express-validator');

exports.getAllBooks = async (req, res) => {
  try {
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = books.find((book) => book.id === parseInt(req.params.id));
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.json(book);
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;

    // Check if any field is missing
    if (!title || !author || !genre) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const id = books.length + 1;
    const book = { id, title, author, genre };
    books.push(book);

    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.updateBook = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, genre } = req.body;
    const bookIndex = books.findIndex((book) => book.id === parseInt(req.params.id));
    if (bookIndex === -1) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      const book = { ...books[bookIndex], title, author, genre };
      books[bookIndex] = book;
      res.json(book);
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const bookIndex = books.findIndex((book) => book.id === parseInt(req.params.id));
    if (bookIndex === -1) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      books.splice(bookIndex, 1);
      res.sendStatus(204);
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};