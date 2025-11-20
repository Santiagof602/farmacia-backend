const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const { validateCreateArticle, validateUpdateArticle } = require("../middlewares/validateArticle");

/*
 * API endpoints relacionados a los artículos.
 *
 * Notar que todos estos endpoints tienen como prefijo el string "/articles",
 * tal como se definió en el archivo `routes/index.js`.
 */

router.get("/", articleController.index);
router.post("/", validateCreateArticle, articleController.store);
router.get("/:id", articleController.show);
router.patch("/:id", validateUpdateArticle, articleController.update);
router.delete("/:id", articleController.destroy);

module.exports = router;
