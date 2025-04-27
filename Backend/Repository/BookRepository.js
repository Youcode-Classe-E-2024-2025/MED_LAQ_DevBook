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
}

export default BookRepository;
