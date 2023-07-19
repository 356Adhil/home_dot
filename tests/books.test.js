const request = require('supertest');
const app = require('../app');

describe('Book API', () => {
  let bookId;

  // Test GET /books
  describe('GET /books', () => {
    it('should return all books', async () => {
      const res = await request(app).get('/books');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(3); // Assuming there are 3 books in the mock database
    });
  });

  // Test GET /books/:id
  describe('GET /books/:id', () => {
    it('should return a specific book', async () => {
      const res = await request(app).get('/books/1');
      expect(res.statusCode).toEqual(200);
      expect(res.body.id).toEqual(1);
      expect(res.body.title).toEqual('Book 1');
    });

    it('should return 404 if book is not found', async () => {
      const res = await request(app).get('/books/999');
      expect(res.statusCode).toEqual(404);
    });
  });

  // Test POST /books
  describe('POST /books', () => {
    it('should add a new book', async () => {
      const newBook = {
        title: 'New Book',
        author: 'John Doe',
        genre: 'Fiction',
      };
  
      const res = await request(app).post('/books').send(newBook);
      expect(res.statusCode).toEqual(201);
      expect(res.body.title).toEqual('New Book');
      expect(res.body.author).toEqual('John Doe');
  
      // Save the book ID for future tests
      bookId = res.body.id;
    });
  
    it('should return 400 if request body is invalid', async () => {
      const invalidBook = {
        author: 'John Doe',
        genre: 'Fiction',
      };
  
      const res = await request(app).post('/books').send(invalidBook);
      expect(res.statusCode).toEqual(400);
    });
  });
  
  // Test PUT /books/:id
  describe('PUT /books/:id', () => {
    it('should update an existing book', async () => {
      const updatedBook = {
        title: 'Updated Book',
        author: 'Jane Smith',
        genre: 'Non-fiction',
      };

      const res = await request(app).put(`/books/${bookId}`).send(updatedBook);
      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toEqual('Updated Book');
      expect(res.body.author).toEqual('Jane Smith');
    });

    it('should return 404 if book is not found', async () => {
      const res = await request(app).put('/books/999').send({ title: 'Invalid Book' });
      expect(res.statusCode).toEqual(404);
    });
  });

  // Test DELETE /books/:id
  describe('DELETE /books/:id', () => {
    it('should delete a book', async () => {
      const res = await request(app).delete(`/books/${bookId}`);
      expect(res.statusCode).toEqual(204);
    });

    it('should return 404 if book is not found', async () => {
      const res = await request(app).delete('/books/999');
      expect(res.statusCode).toEqual(404);
    });
  });
});