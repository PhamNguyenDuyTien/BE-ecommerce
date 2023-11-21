const BrandService = require('../services/BrandService')

const createBrand = async (req, res) => {
    try {
        const { name } = req.body
       
        if (!name) {
            return res.status(404).json({
                code: 404,
                success: false,
             
                message: 'Yêu cầu nhập đủ dữ liệu!'
            })
        }
       
        const response = await BrandService.createBrand(req.body)
        return res.status(response.code).json(response)
    } catch (e) {
        console.log('có lỗi khi createBrand',e)
        return res.status(500).json({
            message: e.message
        })
    }
}

const updateBrand = async (req, res) => {
    try {
        const brandId = req.params.id
        const data = req.body
        if (!brandId) {
            return res.status(404).json({
                code: 404,
                success: false,
             
                message: 'Yêu cầu nhập đủ brandId!'
            })
        }
        const response = await BrandService.updateBrand(brandId, data)
        return res.status(response.code).json(response)
    }  catch (e) {
        console.log('có lỗi khi updateBrand',e)
        return res.status(500).json({
            message: e.message
        })
    }
}

const getDetailBrand = async (req, res) => {
    try {
        const brandId = req.params.id
        if (!brandId) {
            return res.status(404).json({
                code: 404,
                success: false,
             
                message: 'Yêu cầu nhập đủ brandId!'
            })
        }
        const response = await BrandService.getDetailBrand(brandId)
        return res.status(response.code).json(response)
    } catch (e) {
        console.log('có lỗi khi getDetailBrand',e)
        return res.status(500).json({
            message: e.message
        })
    }
}

const deleteBrand = async (req, res) => {
    try {
        const brandId = req.params.id
        if (!brandId) {
            return res.status(404).json({
                code: 404,
                success: false,
             
                message: 'Yêu cầu nhập đủ brandId!'
            })
        }
        const response = await BrandService.deleteBrand(brandId)
        return res.status(response.code).json(response)
    }  catch (e) {
        console.log('có lỗi khi deleteBrand',e)
        return res.status(500).json({
            message: e.message
        })
    }
}

const deleteManyBrand = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                code: 404,
                success: false,
             
                message: 'Yêu cầu nhập đủ dữ liệu!'
            })
        }
        const response = await BrandService.deleteManyBrand(ids)
        return res.status(response.code).json(response)
    } catch (e) {
        console.log('có lỗi khi deleteManyBrand',e)
        return res.status(500).json({
            message: e.message
        })
    }
}

const getAllBrand = async (req, res) => {
    try {
        const { limit, page } = req.query
        const response = await BrandService.getAllBrand(Number(limit) || null, Number(page) || 0)
        return res.status(response.code).json(response)
    } catch (e) {
        console.log('có lỗi khi getAllBrand', e)
        return res.status(500).json({
            message: e.message
        })
    }
}



module.exports = {
    createBrand,
    updateBrand,
    getDetailBrand,
    deleteBrand,
    getAllBrand,
    deleteManyBrand,
   
}
