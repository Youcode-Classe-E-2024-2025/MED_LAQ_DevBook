class BookRepository {
  constructor(db) {
    this.db = db;
  }

  findAll() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * , c.name AS category_name FROM books b JOIN categories c ON b.category_id = c.id";
      this.db.query(query, (err, results) => {
        resolve(results);
      });
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * , c.name AS category_name FROM books b JOIN categories c ON b.category_id = c.id WHERE id = ?";
      this.db.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
  }


  create(book) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO books (title, author, description, category_id, published_date, isbn) VALUES (?, ?, ?, ?, ?, ?)";
      this.db.query(query, [book.title, book.author, book.description, book.category_id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.insertId);
        }
      });
    });
  }
}

export default BookRepository;
