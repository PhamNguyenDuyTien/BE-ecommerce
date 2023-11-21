const CategoryService = require('../services/CategoryService')

const createCategory = async (req, res) => {
    try {
        const { name } = req.body
       
        if (!name) {
            return res.status(404).json({
                code: 404,
                success: false,
             
                message: 'Yêu cầu nhập đủ dữ liệu!'
            })
        }
       
        const response = await CategoryService.createCategory(req.body)
        return res.status(response.code).json(response)
    } catch (e) {
        console.log('có lỗi khi createCategory',e)
        return res.status(500).json({
            message: e.message
        })
    }
}

const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id
        const data = req.body
        if (!categoryId) {
            return res.status(404).json({
                code: 404,
                success: false,
             
                message: 'Yêu cầu nhập đủ categoryId!'
            })
        }
        const response = await CategoryService.updateCategory(categoryId, data)
        return res.status(response.code).json(response)
    }  catch (e) {
        console.log('có lỗi khi updateCategory',e)
        return res.status(500).json({
            message: e.message
        })
    }
}

const getDetailCategory = async (req, res) => {
    try {
        const categoryId = req.params.id
        if (!categoryId) {
            return res.status(404).json({
                code: 404,
                success: false,
             
                message: 'Yêu cầu nhập đủ categoryId!'
            })
        }
        const response = await CategoryService.getDetailCategory(categoryId)
        return res.status(response.code).json(response)
    } catch (e) {
        console.log('có lỗi khi getDetailCategory',e)
        return res.status(500).json({
            message: e.message
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id
        if (!categoryId) {
            return res.status(404).json({
                code: 404,
                success: false,
             
                message: 'Yêu cầu nhập đủ categoryId!'
            })
        }
        const response = await CategoryService.deleteCategory(categoryId)
        return res.status(response.code).json(response)
    }  catch (e) {
        console.log('có lỗi khi deleteCategory',e)
        return res.status(500).json({
            message: e.message
        })
    }
}

const deleteManyCategory = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                code: 404,
                success: false,
             
                message: 'Yêu cầu nhập đủ dữ liệu!'
            })
        }
        const response = await CategoryService.deleteManyCategory(ids)
        return res.status(response.code).json(response)
    } catch (e) {
        console.log('có lỗi khi deleteManyCategory',e)
        return res.status(500).json({
            message: e.message
        })
    }
}

const getAllCategory = async (req, res) => {
    try {
        const { limit, page } = req.query
        const response = await CategoryService.getAllCategory(Number(limit) || null, Number(page) || 0)
        return res.status(response.code).json(response)
    } catch (e) {
        console.log('có lỗi khi getAllCategory', e)
        return res.status(500).json({
            message: e.message
        })
    }
}



module.exports = {
    createCategory,
    updateCategory,
    getDetailCategory,
    deleteCategory,
    getAllCategory,
    deleteManyCategory,
   
}
