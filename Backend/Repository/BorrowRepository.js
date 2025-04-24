class BorrowRepository {
    constructor(db) {
      this.db = db;
    }
  
    async getAllBorrows() {
      const sql = 'SELECT * FROM borrow';
      const [rows] = await this.db.execute(sql);
      return rows;
    }
  
    async getBorrowById(id) {
      const sql = 'SELECT * FROM borrow WHERE id = ?';
      const [rows] = await this.db.execute(sql, [id]);
      return rows[0];
    }
  
    async createBorrow(borrow) {
      const sql = 'INSERT INTO borrow (user_id, book_id, borrow_date, return_date) VALUES (?, ?, ?, ?)';
      const [result] = await this.db.execute(sql, [
        borrow.user_id,
        borrow.book_id,
        borrow.borrow_date,
        borrow.return_date,
      ]);
      return result.insertId;
    }
    async updateBorrow(id, borrow) {
      const sql = 'UPDATE borrow SET user_id = ?, book_id = ?, borrow_date = ?, return_date = ? WHERE id = ?';
      await this.db.execute(sql, [
        borrow.user_id,
        borrow.book_id,
        borrow.borrow_date,
        borrow.return_date,
        id,
      ]);
    }
    async deleteBorrow(id) {
      const sql = 'DELETE FROM borrow WHERE id = ?';
      await this.db.execute(sql, [id]);
    }
    async getBorrowsByUserId(userId) {
      const sql = 'SELECT * FROM borrow WHERE user_id = ?';
      const [rows] = await this.db.execute(sql, [userId]);
      return rows;
    }
    async getBorrowsByBookId(bookId) {
      const sql = 'SELECT * FROM borrow WHERE book_id = ?';
      const [rows] = await this.db.execute(sql, [bookId]);
      return rows;
    }
  }
  