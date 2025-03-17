const express = require(`express`);
const router = express.Router();
const user_service = require(`../services/user_service`)

// Пути АПИ для доступа к функциям

router.post(`/register`, user_service.register);
router.post(`/login`, user_service.login);
router.post(`/edit`, user_service.edit);

module.exports = router;