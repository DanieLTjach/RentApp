const sqlite3 = require(`sqlite3`).verbose();

module.exports = class db_manager {
    #db
    constructor(){
        this.#db = require("./db_init");
    }

    async catalog_add(landlord_id, price, about, landlor_number, img){
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO catalog (landlord_user_id, modified_by) VALUES (?, ?)`,
                [landlord_id],
                function (err) {
                    if (err) {
                        reject(console.error(err.message))
                    }
                    const catalogId = this.lastID; // Получаем ID вставленной записи
            
                    db.run(
                        `INSERT INTO item_desc (catalog_id, price, about, landlor_number, img, modified_by) VALUES (?, ?, ?, ?, ?)`,
                        [catalogId, price, about, landlor_number, img, landlord_id],
                        function (err) {
                            if (err) {
                                reject(console.error(err.message))
                            }
                            resolve(true)
                        }
                    );
                }
            );
        });
    };

}