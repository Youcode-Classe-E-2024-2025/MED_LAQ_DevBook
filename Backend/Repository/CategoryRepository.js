class categoryRepository {
  constructor(db) {
    this.db = db;
  }

  findAll() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM categories";
      this.db.query(query, (err, results) => {
        resolve(results);
      });
    });
  }
}

export { categoryRepository }; 