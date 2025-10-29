const express = require("express");
const router = express.Router();
const productController = require("../Controllers/productController");
const { autenticarToken, isAdmin } = require("../Middlewares/authMiddleware");

router.get("/", Authenticatoken, productController.getAllProducts);
router.get("/", Authenticatoken, isAdmin, productController.getAllProductsAdmin);

module.exports = router;
