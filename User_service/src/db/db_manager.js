const sqlite3 = require(`sqlite3`).verbose();
const bcrypt = require("bcryptjs");

module.exports = class db_manager {
    #db
    constructor(){
        this.#db = require("./db_init");
    }

    // Функции для работы с бд

    async user_register(email, password, username) {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        return new Promise((resolve, reject) => {
            this.#db.run(
                `INSERT INTO users (username, email, password_hash, modified_by) VALUES (?, ?, ?, ?) ON CONFLICT (email, username) DO NOTHING`, [username, email, hashedPassword, 1],
                (err) => {
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(true)
                    }
                } 
            )
        });
    }

    async user_login(login, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return new Promise((resolve, reject) => {
            this.#db.each(
                `SELECT password_hash AS password FROM users WHERE username = ? OR email = ?`, [login, login],
                (row, err) => {
                    if(err){
                        reject(err)
                    }
                    else{
                        let password_hash = row.password;
                        if(password_hash === hashedPassword){
                            resolve(true);
                        }
                    }
                }
            )
        });
    }
}