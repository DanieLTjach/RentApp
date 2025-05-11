const db_manager = require(`../db/db_manager`);
const { logger } = require(`../middleware/loggin`);
const jwt = require(`jsonwebtoken`);
const db = new db_manager();

// Регистрация
exports.register = async (req, res) => {
    const { email, password, username } = req.body;

    logger.info(`Попытка регистрации: email=${email}, username=${username}`);

    try {
        if (!email || !password || !username) {
            logger.warn(`Регистрация не удалась — неполные данные`);
            return res.status(400).json({ error: "All fields are required" });
        }

        const result = await db.user_register(email, password, username);

        if (result === true) {
            const user_id = await db.get_userID(email);
            logger.info(`Пользователь зарегистрирован: ${email}`);
            res.cookie("user_id", user_id, {});
            return res.status(200).json({ message: "Login successful"});
        } else {
            logger.warn(`Регистрация не удалась для ${email}`);
            return res.status(500).json({ error: "Registration failed" });
        }
    } catch (error) {
        logger.error(`Ошибка при регистрации ${email}: ${error.message}`);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Вход
exports.login = async (req, res) => {
    const { login, password } = req.body;

    logger.info(`Попытка входа: login=${login}`);

    try {
        if (!login || !password) {
            logger.warn(`Вход не удался — неполные данные`);
            return res.status(400).json({ error: "All fields are required" });
        }

        const result = await db.user_login(login, password);
        console.log(result);

        if (result === true) {
            const user_id = await db.get_userID(login);
            logger.info(`Успешный вход: ${login}`);
            res.cookie("user_id", user_id, {});
            return res.status(200).json({ message: "Login successful", user_id: user_id });
        } else {
            logger.warn(`Неудачная попытка входа: ${login}`);
            return res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        console.log("catch err " + error);
        logger.error(`Ошибка при входе ${login}: ${error}`);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Редактирование
exports.edit = async (req, res) => {
    const { user_id, email, password, username } = req.body;

    logger.info(`Попытка редактирования пользователя: id=${user_id}`);

    try {
        if (!user_id || !email || !password || !username) {
            logger.warn(`Редактирование не удалось — неполные данные`);
            return res.status(400).json({ error: "All fields are required" });
        }

        const result = await db.user_edit(user_id, email, password, username);

        if (result === true) {
            logger.info(`Пользователь отредактирован: id=${user_id}`);
            return res.status(200).json({ message: "Edit successful" });
        } else {
            logger.warn(`Редактирование не удалось: id=${user_id}`);
            return res.status(500).json({ error: "Edit failed" });
        }
    } catch (error) {
        logger.error(`Ошибка при редактировании id=${user_id}: ${error.message}`);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Получение
exports.get = async (req, res) => {
    const user_id = req.params.id;

    logger.info(`Получение данных пользователя: id=${user_id}`);

    try {
        if (!user_id) {
            logger.warn(`Получение не удалось — отсутствует user_id`);
            return res.status(400).json({ error: "All fields are required" });
        }

        const result = await db.user_get(user_id);

        if (result) {
            logger.info(`Данные получены для пользователя: id=${user_id}`);
            return res.status(200).json(result);
        } else {
            logger.warn(`Пользователь не найден: id=${user_id}`);
            return res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        logger.error(`Ошибка при получении пользователя id=${user_id}: ${error.message}`);
        return res.status(500).json({ error: "Internal server error" });
    }
};

exports.getByEmail = async (req, res) => {
    const { email } = req.body;

    logger.info(`Получение данных пользователя по email: email=${email}`);

    try {
        if (!email) {
            logger.warn(`Получение не удалось — отсутствует email`);
            return res.status(400).json({ error: "All fields are required" });
        }

        const result = await db.get_by_email(email);

        if (result) {
            logger.info(`Данные получены для пользователя: email=${email}`);
            return res.status(200).json(result);
        } else {
            logger.warn(`Пользователь не найден: email=${email}`);
            return res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        logger.error(`Ошибка при получении пользователя email=${email}: ${error.message}`);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// удаление

exports.delete = async (req, res) => {
    const { user_id } = req.body;

    logger.info(`Попытка удаления пользователя: id=${user_id}`);

    try {
        if (!user_id) {
            logger.warn(`Удаление не удалось — отсутствует user_id`);
            return res.status(400).json({ error: "All fields are required" });
        }

        const result = await db.user_delete(user_id);

        if (result === true) {
            logger.info(`Пользователь удален: id=${user_id}`);
            return res.status(200).json({ message: "Delete successful" });
        } else {
            logger.warn(`Удаление не удалось: id=${user_id}`);
            return res.status(500).json({ error: "Delete failed" });
        }
    } catch (error) {
        logger.error(`Ошибка при удалении пользователя id=${user_id}: ${error.message}`);
        return res.status(500).json({ error: "Internal server error" });
    }
}
