const Brand = require("../models/BrandModel")

const createBrand = (newBrand) => {
    return new Promise(async (resolve, reject) => {
        const { name, description } = newBrand
        try {
            const checkBrand = await Brand.findOne({
                name: name
            })
            if (checkBrand !== null) {
                resolve({
                    code: 404,
                    success: false,
                    message: 'Brand này đã tồn tại!'
                })
            }
            const newBrand = await Brand.create({
                name,

                description

            })
            if (newBrand) {
                resolve({
                    code: 200,
                    success: true,
                    message: 'Thêm Brand Thành Công!',
                    data: newBrand
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateBrand = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkBrand = await Brand.findOne({
                _id: id
            })
            if (checkBrand === null) {
                resolve({
                    code: 404,
                    success: false,
                    message: 'Brand này không tồn tại!'
                })
            }

            const updatedBrand = await Brand.findByIdAndUpdate(id, data, { new: true })
            resolve({
                code: 200,
                success: true,
                message: 'Sửa Brand Thành Công!',

                data: updatedBrand
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteBrand = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkBrand = await Brand.findOne({
                _id: id
            })
            if (checkBrand === null) {
                resolve({
                    code: 404,
                    success: false,
                    message: 'Brand này không tồn tại!'
                })
            }

            await Brand.findByIdAndDelete(id)
            resolve({
                code: 200,
                success: true,
                message: 'Xóa Brand thành công!'
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyBrand = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Brand.deleteMany({ _id: ids })
            resolve({
                code: 200,
                success: true,
                message: 'Xóa nhiều Brand thành công!'
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailBrand = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const dataBrand = await Brand.findOne({
                _id: id
            })
            if (!dataBrand) {
                resolve({
                    code: 404,
                    success: false,
                    message: 'Brand này không tồn tại!'
                })
            }

            resolve({
                code: 200,
                success: true,
                message: 'Lấy chi tiết Brand thành công!',
                data: dataBrand
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllBrand = (limit, page) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalBrand = await Brand.count()
            let allBrand = []
            if (!limit) {
                allBrand = await Brand.find().sort({ createdAt: -1, updatedAt: -1 })
                resolve({
                    code: 200,
                    success: true,
                    message: 'Lấy danh sách Brand thành công!',
                    data: allBrand,
                    total: totalBrand,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(1)
                })
            } else {
                allBrand = await Brand.find().limit(limit).skip(page * limit).sort({ createdAt: -1, updatedAt: -1 })
                resolve({
                    code: 200,
                    success: true,
                    message: 'Lấy danh sách Brand thành công!',
                    data: allBrand,
                    total: totalBrand,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalBrand / limit)
                })
            }
            
        } catch (e) {
            reject(e)
        }
    })
}



module.exports = {
    createBrand,
    updateBrand,
    getDetailBrand,
    deleteBrand,
    getAllBrand,
    deleteManyBrand,
    // getAllType
}