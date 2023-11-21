const Product = require("../models/ProductModel")
const Brand = require("../models/BrandModel")
const Category = require("../models/CategoryModel")

const createProduct = (newProduct,image) => {
    return new Promise(async (resolve, reject) => {
        const { name, countInStock, price,discount,brand_id,category_id,description }= newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    code: 404,
                        success: false,
                        message: 'Product này đã tồn tại!'
                })
            }
            const existingBrand = await Brand.findById(brand_id);
            const existingCategory = await Category.findById(category_id);

            if (!existingBrand || !existingCategory) {
                resolve({
                    code: 400,
                    success: false,
                    message: 'Brand hoặc Category không tồn tại!'
                });
              
            }else{
                const newProduct = await Product.create({
                    name, 
                    image: image.buffer,
                    brand_id,
                    category_id,
                    countInStock: Number(countInStock), 
                    price, 
                  
                    description,
                    discount: Number(discount),
                })

                if (newProduct) {
                    const {
                        id,
                        name,
                        brand_id,
                        category_id,
                        countInStock,
                        price,
                        description,
                        discount,
                        createdAt,
                        updatedAt
                    } = newProduct;
                    resolve({
                        code: 200,
                        success: true,
                        message: 'Thêm sản phẩm thành công!',
                        data: {
                            id,
                            name,
                            brand_id,
                            category_id,
                            countInStock,
                            price,
                            description,
                            discount,
                            createdAt,
                            updatedAt
                        }
                    })
                }
            }
           
        } catch (e) {
            reject(e)
        }
    })
}


const updateProduct = (id, data,image) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(id)
            const checkProduct = await Product.findOne({
                _id: id
            })
           
            if (checkProduct === null) {
                resolve({
                    code: 404,
                    success: false,
                    message: 'Product này không tồn tại!'
                })
            }
            const duplicateProduct = await Product.findOne({
                _id: { $ne: id }, // Loại trừ sản phẩm hiện tại
                name: data.name // Giả sử thông tin tên sản phẩm nằm trong data.name
            });

            if (duplicateProduct) {
                resolve({
                    code: 400,
                    success: false,
                    message: 'Tên sản phẩm đã bị trùng!'
                });
                return; // Kết thúc sớm nếu tên bị trùng
            }

            const updatedProduct = await Product.findByIdAndUpdate(id,{image:image.buffer,...data} , { new: true },)
            if (updatedProduct) {
                const {
                    id,
                    name,
                    price,
                    countInStock,
                    brand_id,
                    category_id,
                    discount,
                    createdAt,
                    updatedAt
                } = updatedProduct;
            resolve({
                code: 200,
                success: true,
                message: 'Sửa Product Thành Công!',

                data: {
                    id,
                    name,
                    price,
                    countInStock,
                    brand_id,
                    category_id,
                    discount,
                    createdAt,
                    updatedAt
                }
            })
        }
        } catch (e) {
            reject(e)
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    code: 404,
                    success: false,
                    message: 'Product này không tồn tại!'
                })
            }

            await Product.findByIdAndDelete(id)
            resolve({
                code: 200,
                success: true,
                message: 'Xóa Product thành công!'
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({ _id: ids })
            resolve({
                code: 200,
                success: true,
                message: 'Xóa nhiều Product thành công!'
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const dataProduct = await Product.findOne({
                _id: id
            })
            if (!dataProduct) {
                resolve({
                    code: 404,
                    success: false,
                    message: 'Product này không tồn tại!'
                })
            }

            resolve({
                code: 200,
                success: true,
                message: 'Lấy chi tiết Product thành công!',
                data: dataProduct
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllProduct = (limit, page) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.count()
            let allProduct = []
            if (!limit) {
                allProduct = await Product.find().sort({ createdAt: -1, updatedAt: -1 })
                resolve({
                    code: 200,
                success: true,
                message: 'Lấy danh sách Product thành công!',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(1)
                })
            } else {
                allProduct = await Product.find().limit(limit).skip(page * limit).sort({ createdAt: -1, updatedAt: -1 })
                resolve({
                    code: 200,
                    success: true,
                    message: 'Lấy danh sách Product thành công!',
                    data: allProduct,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
           
        } catch (e) {
            reject(e)
        }
    })
}



module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProduct,
    deleteManyProduct,
  
}