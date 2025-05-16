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
        // TODO: Проверка на уникальность нужна
        return new Promise((resolve, reject) => {
            this.#db.run(
                `INSERT INTO users (username, email, password_hash, modified_by) VALUES (?, ?, ?, ?)`, [username, email, hashedPassword, 1],
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
        return new Promise((resolve, reject) => {
            this.#db.each(
                `SELECT password_hash AS password FROM users WHERE username = ? OR email = ?`, [login, login],
                (err, row) => {
                    if(err){
                        console.log("db err " + err);
                        reject(err)
                    }
                    else{
                        let result = bcrypt.compareSync(password, row.password);
                        console.log("result " + result);
                        if(!result){
                            resolve(false);
                        }
                        else if(result == true){
                            resolve(true);
                        }
                    }
                }
            )
        });
    }

    async user_edit(user_id, email, password, username) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return new Promise((resolve, reject) => {
            this.#db.run(
                `UPDATE users SET email = ?, password_hash = ?, username = ? WHERE user_id = ?`, [email, hashedPassword, username, user_id],
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

    async user_get(user_id) {
        return new Promise((resolve, reject) => {
            this.#db.get(
                `SELECT * FROM users WHERE user_id = ?`, [user_id],
                (err, row) => {
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(row)
                    }
                } 
            )
        });
    }

    async get_userID(username){
        return new Promise((resolve, reject) => {
            this.#db.get(
                `SELECT user_id FROM users WHERE username = ? OR email = ?`, [username, username],
                (err, row) => {
                    if(err){
                        reject(err)
                    }
                    else{
                        console.log("row " + row.user_id);
                        resolve(row.user_id)
                    }
                } 
            )
        });
    }

    async get_by_email(email) {
        return new Promise((resolve, reject) => {
            this.#db.get(
                `SELECT * FROM users WHERE email = ?`, [email],
                (err, row) => {
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(row)
                    }
                } 
            )
        });
    }

    async user_remove(user_id) {
        return new Promise((resolve, reject) => {
            this.#db.run(
                `DELETE FROM users WHERE user_id = ?`, [user_id],
                (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(true);
                    }
                }
            );
        });
    }
}
