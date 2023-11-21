const Category = require("../models/CategoryModel")

const createCategory = (newCategory) => {
    return new Promise(async (resolve, reject) => {
        const { name, description } = newCategory
        try {
            const checkCategory = await Category.findOne({
                name: name
            })
            if (checkCategory !== null) {
                resolve({
                    code: 404,
                    success: false,
                    message: 'Category này đã tồn tại!'
                })
            }
            const newCategory = await Category.create({
                name,

                description

            })
            if (newCategory) {
                resolve({
                    code: 200,
                    success: true,
                    message: 'Thêm Category Thành Công!',
                    data: newCategory
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateCategory = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCategory = await Category.findOne({
                _id: id
            })
            if (checkCategory === null) {
                resolve({
                    code: 404,
                    success: false,
                    message: 'Category này không tồn tại!'
                })
            }

            const updatedCategory = await Category.findByIdAndUpdate(id, data, { new: true })
            resolve({
                code: 200,
                success: true,
                message: 'Sửa Category Thành Công!',

                data: updatedCategory
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCategory = await Category.findOne({
                _id: id
            })
            if (checkCategory === null) {
                resolve({
                    code: 404,
                    success: false,
                    message: 'Category này không tồn tại!'
                })
            }

            await Category.findByIdAndDelete(id)
            resolve({
                code: 200,
                success: true,
                message: 'Xóa Category thành công!'
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyCategory = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Category.deleteMany({ _id: ids })
            resolve({
                code: 200,
                success: true,
                message: 'Xóa nhiều Category thành công!'
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const dataCategory = await Category.findOne({
                _id: id
            })
            if (!dataCategory) {
                resolve({
                    code: 404,
                    success: false,
                    message: 'Category này không tồn tại!'
                })
            }

            resolve({
                code: 200,
                success: true,
                message: 'Lấy chi tiết Category thành công!',
                data: dataCategory
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllCategory = (limit, page) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalCategory = await Category.count()
            let allCategory = []
            if (!limit) {
                allCategory = await Category.find().sort({ createdAt: -1, updatedAt: -1 })
            } else {
                allCategory = await Category.find().limit(limit).skip(page * limit).sort({ createdAt: -1, updatedAt: -1 })
            }
            resolve({
                code: 200,
                success: true,
                message: 'Lấy danh sách Category thành công!',
                data: allCategory,
                total: totalCategory,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalCategory / limit)
            })
        } catch (e) {
            reject(e)
        }
    })
}



module.exports = {
    createCategory,
    updateCategory,
    getDetailCategory,
    deleteCategory,
    getAllCategory,
    deleteManyCategory,
    // getAllType
}