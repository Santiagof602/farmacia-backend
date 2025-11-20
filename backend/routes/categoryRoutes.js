const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { validateCreateCategory, validateUpdateCategory } = require("../middlewares/validateCategory");
const { authenticateToken } = require("../middlewares/authJWT");
const requireAdmin = require("../middlewares/requireAdmin");

/*
 * API endpoints relacionados a las categorías.
 *
 * Notar que todos estos endpoints tienen como prefijo el string "/categories",
 * tal como se definió en el archivo `routes/index.js`.
 */

router.get("/", categoryController.index);
router.post("/", authenticateToken, requireAdmin, validateCreateCategory, categoryController.store);
router.get("/:id", categoryController.show);
router.patch("/:id", authenticateToken, requireAdmin, validateUpdateCategory, categoryController.update);
router.delete("/:id", authenticateToken, requireAdmin, categoryController.destroy);

module.exports = router;
