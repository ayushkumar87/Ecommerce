const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleWare");

router.post("/", authMiddleware, cartController.addToCart);

module.exports = router;