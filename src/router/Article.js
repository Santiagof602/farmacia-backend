const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
router.get("/", articleController.index);
router.get("/:id", articleController.show);
router.post("/", articleController.create);
router.put("/:id", articleController.update);
router.delete("/:id", articleController.delete);
module.exports = router;
