const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
     
        description: { type: String },
       
    },
    {
        timestamps: true,
    }
);
const Brands = mongoose.model('Brands', brandSchema);

module.exports = Brands;
