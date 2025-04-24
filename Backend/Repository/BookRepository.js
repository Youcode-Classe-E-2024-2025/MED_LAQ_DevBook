class BookRepository extends BaseRepository {
    constructor(dbConnection) {
        super(dbConnection, 'books');
    }

    async findByStatus(status) {
        const [rows] = await this.db.query('SELECT * FROM books WHERE status = ?', [status]);
        return rows;
    }

    async findByCategory(categoryId) {
        const [rows] = await this.db.query('SELECT * FROM books WHERE category_id = ?', [categoryId]);
        return rows;
    }

    async searchByTitleOrAuthor(query) {
        const [rows] = await this.db.query(
            'SELECT * FROM books WHERE title LIKE ? OR author LIKE ?',
            [`%${query}%`, `%${query}%`]
        );
        return rows;
    }
}