const express = require("express");
const router = express.Router();
const catalog_service = require("../services/catalog_service");

console.log("Catalog routes initializing...");

router.post("/add", catalog_service.add);
router.post("/remove", catalog_service.remove);
router.post("/get", catalog_service.get);
router.post("/edit", catalog_service.edit);
router.post("/get_all", catalog_service.get_all);



console.log("Catalog routes loaded");

module.exports = router;