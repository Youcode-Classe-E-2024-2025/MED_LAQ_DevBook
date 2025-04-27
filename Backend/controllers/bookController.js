import Book from '../models/Book.js';

export const getAllBooks = (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results.map(book => new Book(book.id, book.title, book.author, book.category, book.status)));
  });
};

export const addBook = (req, res) => {
  const { title, author, category, status } = req.body;
  const query = 'INSERT INTO books (title, author, category, status) VALUES (?, ?, ?, ?)';
  db.query(query, [title, author, category, status], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: '📚 Livre ajouté avec succès!' });
  });
};
