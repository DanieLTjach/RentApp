const sqlite3 = require(`sqlite3`).verbose();

module.exports = class db_manager {
    #db
    constructor(){
        this.#db = require("./db_init");
    }

    async add_into_catalog(landlord_id, price, about, landlord_number, img, catalogId, name) {
        return new Promise((resolve, reject) => {
            this.#db.run(
                `INSERT INTO item_desc (catalog_id, price, about, landlord_number, img, modified_by, name) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [catalogId, price, about, landlord_number, img, landlord_id, name],
                function (err) {
                    if (err) {
                        reject(err.message);
                        return;
                    }
                    resolve(true);
                }
            );
        });
    }
    
    async get_last_id(){
        return new Promise((resolve, reject) => {
            this.#db.get(`SELECT MAX(id) AS catalogID FROM catalog;`, (err, row) => {
                if(err){
                    reject(err.message);
                    return;
                }
                resolve(row.catalogID);
            });
        });
    }
    
    async catalog_add(landlord_id, price, about, landlord_number, img, name) {
        return new Promise((resolve, reject) => {
            this.#db.run(
                `INSERT INTO catalog (landlord_userid, modified_by) VALUES (?, ?)`,
                [landlord_id, landlord_id], 
                async function (err) {
                    if (err) {
                        reject(err.message);
                        return;
                    }
                    try {
                        // Получаем id нового каталога
                        let catalogId = await this.get_last_id();
                        // Добавляем запись в item_desc
                        await this.add_into_catalog(landlord_id, price, about, landlord_number, img, catalogId, name);
                        resolve(true);
                    } catch (error) {
                        reject(error);
                    }
                }.bind(this)
            );
        });
    }

        async remove(catalog_id) {
            return new Promise((resolve, reject) => {
                this.#db.run(
                    `DELETE FROM item_desc WHERE catalog_id = ?`,
                    [catalog_id],
                    (err) => {
                        if (err) {
                            reject(err.message);
                            return;
                        }
                        this.#db.run(
                            `DELETE FROM catalog WHERE id = ?`,
                            [catalog_id],
                            (err2) => {
                                if (err2) {
                                    reject(err2.message);
                                    return;
                                }
                                resolve(true);
                            }
                        );
                    }
                );
            });
        }


    async edit(catalog_id, name, description, landlord_number, price, img) {
        return new Promise((resolve, reject) => {
            this.#db.run(
                `UPDATE item_desc SET name = ?, about = ?, landlord_number = ?, price = ?, img = ? WHERE catalog_id = ?`,
                [name, description, landlord_number, price, img, catalog_id],
                function (err) {
                    if (err) {
                        reject(err.message);
                        return;
                    }
                    resolve(true);
                }
            );
        });
    }

    async get(catalog_id) {
        return new Promise((resolve, reject) => {
            this.#db.all(
                `SELECT * FROM item_desc WHERE catalog_id = ?`,
                [catalog_id],
                function (err, rows) {
                    if (err) {
                        reject(err.message);
                        return;
                    }
                    resolve(rows);
                }
            );
        });
    }

    async get_all() {
        return new Promise((resolve, reject) => {
            this.#db.all(
                `SELECT * FROM catalog c JOIN item_desc i ON c.id = i.catalog_id`,
                [],
                function (err, rows) {
                    if (err) {
                        reject(err.message);
                        return;
                    }
                    resolve(rows);
                }
            );
        });
    }



}
