const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { validateCreateCategory, validateUpdateCategory } = require("../middlewares/validateCategory");

/*
 * API endpoints relacionados a las categorías.
 *
 * Notar que todos estos endpoints tienen como prefijo el string "/categories",
 * tal como se definió en el archivo `routes/index.js`.
 */

router.get("/", categoryController.index);
router.post("/", validateCreateCategory, categoryController.store);
router.get("/:id", categoryController.show);
router.patch("/:id", validateUpdateCategory, categoryController.update);
router.delete("/:id", categoryController.destroy);

module.exports = router;
