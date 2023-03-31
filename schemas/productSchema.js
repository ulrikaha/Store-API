const mongoose = require('mongoose');
const { Schema } = mongoose;

const tagSchema = new Schema({
    name: {type: String},
    category: {type: String}
});

const productSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    imgURL: {type: String, required: true},
    tags: [tagSchema]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;