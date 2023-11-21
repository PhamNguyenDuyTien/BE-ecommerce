const express = require("express");
const router = express.Router()
const CategoryController = require('../controllers/CategoryController');
const { authMiddleWareAdmin } = require("../middleware/authMiddleware");




router.post('/create-category',authMiddleWareAdmin, CategoryController.createCategory)
router.put('/update-category/:id', authMiddleWareAdmin, CategoryController.updateCategory)
router.get('/get-detail-category/:id',authMiddleWareAdmin, CategoryController.getDetailCategory)
router.delete('/delete-category/:id', authMiddleWareAdmin, CategoryController.deleteCategory)
router.get('/get-all-category', CategoryController.getAllCategory)
router.post('/delete-many-category', authMiddleWareAdmin, CategoryController.deleteManyCategory)


module.exports = router