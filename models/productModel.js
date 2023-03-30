const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, 'Please provide a product name'] },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        imgURL: { type: String, required: true }
    },
    { timestamps: true }
);

const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;
