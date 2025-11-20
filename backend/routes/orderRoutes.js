const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { authenticateToken } = require("../middlewares/authJWT");
const requireAdmin = require("../middlewares/requireAdmin");
const { validateCreateOrder } = require("../middlewares/validateOrder");

/*
 * API endpoints relacionados a las órdenes.
 *
 * Notar que todos estos endpoints tienen como prefijo el string "/orders",
 * tal como se definió en el archivo `routes/index.js`.
 */

// List orders for the authenticated user (or use ?userId= for admins)
router.get("/", authenticateToken, orderController.index);
// Create an order (authenticated users)
router.post("/", authenticateToken, validateCreateOrder, orderController.store);
// Get specific order (authenticated)
router.get("/:id", authenticateToken, orderController.show);
// Update order status (admin only)
router.patch("/:id", authenticateToken, requireAdmin, orderController.update);
// Cancel order (owner or admin)
router.delete("/:id", authenticateToken, orderController.destroy);

module.exports = router;
