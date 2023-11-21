const express = require("express");
const router = express.Router()
const BrandController = require('../controllers/BrandController');
const { authMiddleWareAdmin } = require("../middleware/authMiddleware");




router.post('/create-brand',authMiddleWareAdmin, BrandController.createBrand)
router.put('/update-brand/:id', authMiddleWareAdmin, BrandController.updateBrand)
router.get('/get-detail-brand/:id',authMiddleWareAdmin, BrandController.getDetailBrand)
router.delete('/delete-brand/:id', authMiddleWareAdmin, BrandController.deleteBrand)
router.get('/get-all-brand', BrandController.getAllBrand)
router.post('/delete-many-brand', authMiddleWareAdmin, BrandController.deleteManyBrand)


module.exports = router