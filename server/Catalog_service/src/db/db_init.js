const sqlite3 = require(`sqlite3`).verbose();
const db = new sqlite3.Database(`src/db/storage/catalog.db`);

db.serialize(function(){
    db.run(
        `
        CREATE TABLE IF NOT EXISTS catalog (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            landlord_userid INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modified_by INTEGER
        )
        `
    );
    
    db.run(
        `
        CREATE TABLE IF NOT EXISTS item_desc (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            catalog_id INTEGER,
            price INTEGER,
            name TEXT,
            about TEXT,
            landlord_number TEXT,
            img TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modified_by INTEGER,
            FOREIGN KEY (catalog_id) REFERENCES catalog (id)
        )        
        `
    );
});

module.exports = db;