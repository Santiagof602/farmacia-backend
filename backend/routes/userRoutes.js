const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { authenticateToken } = require("../middlewares/authJWT");

/*
 * API endpoints relacionados a los usuarios.
 *
 * Notar que todos estos endpoints tienen como prefijo el string "/users",
 * tal como se definió en el archivo `routes/index.js`.
 */


router.post("/login", userController.login);
router.post("/register", userController.store);
// Rutas protegidas:
router.get("/", authenticateToken, userController.index);
router.post("/", authenticateToken, userController.store); // Solo admin podra crear usuarios aqu
router.get("/:id", authenticateToken, userController.show);
router.patch("/:id", authenticateToken, userController.update);
router.delete("/:id", authenticateToken, userController.destroy);

module.exports = router;
