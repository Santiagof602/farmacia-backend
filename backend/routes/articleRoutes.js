const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const { validateCreateArticle, validateUpdateArticle } = require("../middlewares/validateArticle");
const { authenticateToken } = require("../middlewares/authJWT");
const requireAdmin = require("../middlewares/requireAdmin");

/*
 * API endpoints relacionados a los artículos.
 *
 * Notar que todos estos endpoints tienen como prefijo el string "/articles",
 * tal como se definió en el archivo `routes/index.js`.
 */

router.get("/", articleController.index);
router.post("/", authenticateToken, requireAdmin, validateCreateArticle, articleController.store);
router.get("/:id", articleController.show);
router.patch("/:id", authenticateToken, requireAdmin, validateUpdateArticle, articleController.update);
router.delete("/:id", authenticateToken, requireAdmin, articleController.destroy);

module.exports = router;
