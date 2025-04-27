class categoryRepository {
  constructor(db) {
    this.db = db;
  }

  findAll() {
    return new Promise((resolve, reject) => {
      const query = "SELECT c.id, c.name, c.description FROM categories AS c";
      this.db.query(query, (err, results) => {
        resolve(results);
      });
    });
  }
}