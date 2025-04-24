class UserRepository extends BaseRepository {
    constructor(dbConnection) {
        super(dbConnection, 'users');
    }

    async findByUsername(username) {
        const [rows] = await this.db.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0] || null;
    }

    async create(user) {
        const result = await this.db.query(
            'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)',
            [user.username, user.password, user.email, user.role]
        );
        return result[0].insertId;
    }
}