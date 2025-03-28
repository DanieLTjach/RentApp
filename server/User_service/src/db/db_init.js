const sqlite3 = require(`sqlite3`).verbose();
const db = new sqlite3.Database(`src/db/storage/users.db`);

db.serialize(function(){
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            username TEXT UNIQUE,
            password_hash TEXT,
            is_admin BOOL DEFAULT false,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modified_by INTEGER
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS user_info (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            about_me TEXT,
            img TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modified_by INTEGER,
            FOREIGN KEY (user_id) REFERENCES users (user_id)
        )
        `)

    db.run(`
        INSERT OR IGNORE INTO users(user_id, is_admin, username) VALUES (0, true, "admin")
        `)
});


module.exports = db;