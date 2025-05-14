const db_manager = require(`../db/db_manager`);
const { logger } = require(`../middleware/loggin`);
const db = new db_manager();

// Добавление
exports.add = async (req, res) => {
    const { landlord_id, name, description, landlord_number, price } = req.body;

    logger.info(`Попытка добавить: ${JSON.stringify(req.body)}`);

    try {
        if (!landlord_number || !landlord_id || !name || !description || !price) {
            console.log("landlord_number", landlord_number, "landlord_id", landlord_id, "name", name, "description", description, "price", price);
            logger.warn(`Добавление не удалось — неполные данные`);
            return res.status(400).send(`Missing required fields`);
        }

        const result = await db.catalog_add(landlord_id, price, description, landlord_number, null, name);

        if (result === true) {
            logger.info(`Успешно добавлен: ${name}`);
            return res.status(200).send(`Product added successfully`);
        } else {
            logger.warn(`Не удалось добавить: ${name}`);
            return res.status(500).send(`Failed to add product`);
        }
    } catch (error) {
        logger.error(`Ошибка при добавлении: ${error.message}`);
        return res.status(500).send(`Error adding product`);
    }
};

// Удаление
exports.remove = async (req, res) => {
    const { catalog_id } = req.body;

    logger.info(`Попытка удалить: id=${catalog_id}`);

    try {
        if (!catalog_id) {
            logger.warn(`Удаление не удалось — отсутствует catalog_id`);
            return res.status(400).send(`Missing required fields`);
        }

        const result = await db.remove(catalog_id);

        if (result === true) {
            logger.info(`Успешно удалён: id=${catalog_id}`);
            return res.status(200).send(`Product removed successfully`);
        } else {
            logger.warn(`Не удалось удалить: id=${catalog_id}`);
            return res.status(500).send(`Failed to remove product`);
        }
    } catch (error) {
        logger.error(`Ошибка при удалении id=${catalog_id}: ${error.message}`);
        return res.status(500).send(`Error removing product`);
    }
};

// Редактирование
exports.edit = async (req, res) => {
    const { catalog_id, name, description, landlord_number, price, img } = req.body;

    logger.info(`Попытка редактировать: id=${catalog_id}`);

    try {
        if (!catalog_id || !name || !description || !landlord_number || !price || !img) {
            logger.warn(`Редактирование не удалось — неполные данные`);
            return res.status(400).send(`Missing required fields`);
        }

        const result = await db.edit(catalog_id, name, description, landlord_number, price, img);

        if (result === true) {
            logger.info(`Отредактирован: id=${catalog_id}`);
            return res.status(200).send(`Product edited successfully`);
        } else {
            logger.warn(`Не удалось отредактировать: id=${catalog_id}`);
            return res.status(500).send(`Failed to edit product`);
        }
    } catch (error) {
        logger.error(`Ошибка при редактировании id=${catalog_id}: ${error.message}`);
        return res.status(500).send(`Error editing product`);
    }
};

// Получение
exports.get = async (req, res) => {
    const { catalog_id } = req.body;

    logger.info(`Попытка получить : id=${catalog_id}`);

    try {
        if (!catalog_id) {
            logger.warn(`Получение не удалось — отсутствует catalog_id`);
            return res.status(400).send(`Missing required fields`);
        }

        const result = await db.get(catalog_id);

        if (result) {
            logger.info(`Данные получены: id=${catalog_id}`);
            return res.status(200).json(result);
        } else {
            logger.warn(`Не найден: id=${catalog_id}`);
            return res.status(404).send(`Product not found`);
        }
    } catch (error) {
        logger.error(`Ошибка при получении id=${catalog_id}: ${error.message}`);
        return res.status(500).send(`Error getting product`);
    }
};

exports.get_all = async (req, res) => {
    try{
        const result = await db.get_all();

        if (result) {
            logger.info(`Данные получены`);
            return res.status(200).json(result);
        } else {
            logger.warn(`Не найдено`);
            return res.status(404).send(`Products not found`);
        }
    }
    catch (error) {
    logger.error(`Ошибка при получении всех продуктов: ${error.message}`);
    return res.status(500).send(`Error getting all products`);
}
};
