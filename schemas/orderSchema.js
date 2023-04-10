const mongoose = require('mongoose');
const { Schema } = mongoose;
const Product = require('./productSchema');
const User = require('./userSchema');

const orderLineSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    quantity: {type: Number, required: true},
});



const orderSchema = new Schema({
    user: {type: Schema.Types.ObjectId, 
        ref: 'User',
    },
    orderLines: {
        type: [orderLineSchema],
        require: true
    },
    totalPrice: {
        type: Number, 
        required: true
    },
},
{timestamps: true});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;



  