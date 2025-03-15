const express = require(`express`);
const router = express.Router();
const catalog_service = require(`../services/catalog_service`)

// Пути АПИ для доступа к функциям

router.post(`add`, catalog_service.add);
router.post(`remove`, catalog_service.remove);
router.post(`get`, catalog_service.get);
router.post(`edit`, catalog_service.edit);

module.exports = router;