class CategoryRepository {
    constructor(db) {
        this.db = db;
    }

    async getAllCategories() {
        const categories = await this.db.query('SELECT * FROM categories');
        return categories.map(row => new Category(row.id, row.name, row.description, row.createdAt));
    }

    async getCategoryById(id) {
        const category = await this.db.query('SELECT * FROM categories WHERE id = ?', [id]);
        if (category.length === 0) {
            throw new Error('Category not found');
        }
        const row = category[0];
        return new Category(row.id, row.name, row.description, row.createdAt);
    }
    async createCategory(category) {
        const result = await this.db.query(
            'INSERT INTO categories (name, description) VALUES (?, ?)',
            [category.name, category.description]
        );
        return new Category(result.insertId, category.name, category.description, new Date());
    }
    async updateCategory(id, category) {
        const result = await this.db.query(
            'UPDATE categories SET name = ?, description = ? WHERE id = ?',
            [category.name, category.description, id]
        );
        if (result.affectedRows === 0) {
            throw new Error('Category not found');
        }
        return new Category(id, category.name, category.description, new Date());
    }
    async deleteCategory(id) {
        const result = await this.db.query('DELETE FROM categories WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            throw new Error('Category not found');
        }
    }
}