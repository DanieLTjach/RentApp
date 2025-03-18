const sqlite3 = require(`sqlite3`).verbose();

module.exports = class db_manager {
    #db
    constructor(){
        this.#db = require("./db_init");
    }

    async add_into_catalog(landlord_id, price, about, landlor_number, img, catalogId) {
        return new Promise((resolve, reject) => {
            this.#db.run(
                `INSERT INTO item_desc (catalog_id, price, about, landlord_number, img, modified_by) VALUES (?, ?, ?, ?, ?, ?)`,
                [catalogId, price, about, landlor_number, img, landlord_id],
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
                    reject(err.message)
                }
                let result = (row.catalogID)
                resolve(result)
            })
        })
    }
    
    async catalog_add(landlord_id, price, about, landlor_number, img) {
        return new Promise((resolve, reject) => {
            this.#db.run(
                `INSERT INTO catalog (landlord_userid, modified_by) VALUES (?, ?)`,
                [landlord_id, landlord_id], 
                async function (err) { // Делаем `async`, так как внутри используется `await`
                    if (err) {
                        reject(err.message);
                        return;
                    }
    
                    try {
                        let catalogId = await this.get_last_id(); // Дожидаемся ID каталога
                        console.log("New Catalog ID:", catalogId);
    
                        // Ждем, пока товар добавится
                        await this.add_into_catalog(landlord_id, price, about, landlor_number, img, catalogId);
                        resolve(true);
                    } catch (error) {
                        reject(error);
                    }
                }.bind(this) // Привязываем контекст, чтобы `this.get_last_id()` работал
            );
        });
    }

}