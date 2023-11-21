const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: Buffer, required: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        description: { type: String },
        brand_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Brands', required: true },
        category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories', required: true },
        discount: { type: Number },
        sold: { type: Number }
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
