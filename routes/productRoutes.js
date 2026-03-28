const express = require("express");
const router = express.Router();

const productController = require("../controllers/productContoller");
const authMiddleware = require("../middleware/authMiddleWare");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload=require("../middleware/uploadMiddleware")
//Admin
router.post("/",authMiddleware,adminMiddleware,upload.single("image"),productController.addProduct)
router.put("/:id", authMiddleware, adminMiddleware, productController.updateProduct);
router.delete("/:id", authMiddleware, adminMiddleware, productController.deleteProduct);

// PUBLIC
router.get("/", productController.getProducts);

module.exports = router;
