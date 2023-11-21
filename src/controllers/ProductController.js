const ProductService = require('../services/ProductService')

const createProduct = async (req, res) => {
    try {
        const { name, countInStock, price,discount,brand_id,category_id } = req.body
        const image = req.file;
        if (!name  || !countInStock || !price ||  !discount ||  !brand_id ||  !category_id) {
            return res.status(404).json({
                code: 404,
                success: false,
             
                message: 'Yêu cầu nhập đủ dữ liệu!'
            })
        }
        if (!image) {
            return res.status(404).json({
                code: 404,
                success: false,
             
                message: 'Không nhập ảnh!'
            })
          }
          if (!image.mimetype.startsWith('image')) {
            return res.status(400).json({
                code: 404,
                success: false,
                message: 'Tệp tải lên không phải là hình ảnh hợp lệ!'
            });
        }
        const response = await ProductService.createProduct(req.body,req.file)
        return res.status(response.code).json(response)
    } catch (e) {
        console.log('có lỗi khi createProduct',e)
        return res.status(500).json({
            message: e.message
        })
    }
}
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body
        const image = req.file;
        if (!productId) {
            return res.status(404).json({
                code: 404,
                success: false,
             
                message: 'Yêu cầu nhập đủ productId!'
            })
        }
        if (!image) {
            return res.status(404).json({
                code: 404,
                success: false,

                message: 'Không nhập ảnh!'
            })
        }
        if (!image.mimetype.startsWith('image')) {
            return res.status(400).json({
                code: 404,
                success: false,
                message: 'Tệp tải lên không phải là hình ảnh hợp lệ!'
            });
        }
        const response = await ProductService.updateProduct(productId, data,image)
        return res.status(response.code).json(response)
    }  catch (e) {
        console.log('có lỗi khi updateProduct',e)
        return res.status(500).json({
            message: e.message
        })
    }
}

const getDetailProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(404).json({
                code: 404,
                success: false,
             
                message: 'Yêu cầu nhập đủ productId!'
            })
        }
        const response = await ProductService.getDetailProduct(productId)
        return res.status(response.code).json(response)
    } catch (e) {
        console.log('có lỗi khi getDetailProduct',e)
        return res.status(500).json({
            message: e.message
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(404).json({
                code: 404,
                success: false,
             
                message: 'Yêu cầu nhập đủ productId!'
            })
        }
        const response = await ProductService.deleteProduct(productId)
        return res.status(response.code).json(response)
    }  catch (e) {
        console.log('có lỗi khi deleteProduct',e)
        return res.status(500).json({
            message: e.message
        })
    }
}

const deleteManyProduct = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                code: 404,
                success: false,
             
                message: 'Yêu cầu nhập đủ dữ liệu!'
            })
        }
        const response = await ProductService.deleteManyProduct(ids)
        return res.status(response.code).json(response)
    } catch (e) {
        console.log('có lỗi khi deleteManyProduct',e)
        return res.status(500).json({
            message: e.message
        })
    }
}

const getAllProduct = async (req, res) => {
    try {
        const { limit, page } = req.query
        const response = await ProductService.getAllProduct(Number(limit) || null, Number(page) || 0)
        return res.status(response.code).json(response)
    } catch (e) {
        console.log('có lỗi khi getAllProduct', e)
        return res.status(500).json({
            message: e.message
        })
    }
}



module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProduct,
    deleteManyProduct,
   
}
