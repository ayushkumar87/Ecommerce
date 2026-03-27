const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleWare");

router.post("/", authMiddleware, cartController.addToCart);
router.get("/",authMiddleware,cartController.getCart)
router.put("/",authMiddleware,cartController.updateQuantity)
router.delete("/",authMiddleware,cartController.removeFromCart)

module.exports = router;