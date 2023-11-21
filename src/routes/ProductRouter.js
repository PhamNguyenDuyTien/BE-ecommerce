const express = require("express");
const router = express.Router()
const ProductController = require('../controllers/ProductController');
const { authMiddleWareAdmin } = require("../middleware/authMiddleware");




router.post('/create-product',authMiddleWareAdmin, ProductController.createProduct)
router.put('/update-product/:id', authMiddleWareAdmin, ProductController.updateProduct)
router.get('/get-detail-product/:id',authMiddleWareAdmin, ProductController.getDetailProduct)
router.delete('/delete-product/:id', authMiddleWareAdmin, ProductController.deleteProduct)
router.get('/get-all-product', ProductController.getAllProduct)
router.post('/delete-many-product', authMiddleWareAdmin, ProductController.deleteManyProduct)


module.exports = router