const { use } = require(`../controllers/catalog_routes`);
const db_manager = require(`../db/db_manager`);
const db = new db_manager;

exports.add = async (req, res) => {
    const { landlord_id, name, description, landlord_number, price, category, img } = req.body;

    try {
        if (!landlord_number || !landlord_id || !name || !description || !price || !category || !img) {
            return res.status(400).send(`Missing required fields`);
        }

        let result = db.catalog_add(landlord_id, price, description, landlord_number, img)

        if (result === true) {
            return res.status(200).send(`Product added successfully`);
        }
    }
    catch (error) {
        return res.status(500).send(`Error adding product`);
    }
}

exports.remove = async (req, res) => {

}

exports.edit = async (req, res) => {

}

exports.get = async (req, res) => {

}