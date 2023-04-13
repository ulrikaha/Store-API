//Import the mongoose module and schema.
const mongoose = require('mongoose');
const { Schema } = mongoose;


//Product schema
const productSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    category: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    imgURL: {
        type: String, 
        required: true
    },
    quantity: {
        type: Number, 
        required: true
    },
   
},

{timestamps: true});


//Creating Product model and exporting it
const Product = mongoose.model('Product', productSchema);

module.exports = Product;

