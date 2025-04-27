class BookRepository {
  constructor(db) {
    this.db = db;
  }

  findAll() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM books";
      this.db.query(query, (err, results) => {
        resolve(results);
      });
    });
  }
}

export default BookRepository;
