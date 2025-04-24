class BaseRepository {
    constructor(dbConnection, tableName) {
        this.db = dbConnection;
        this.table = tableName;
    }

    async findById(id) {
        const [rows] = await this.db.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id]);
        return rows[0] || null;
    }

    async findAll() {
        const [rows] = await this.db.query(`SELECT * FROM ${this.table}`);
        return rows;
    }

}
