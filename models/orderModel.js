const bcrypt = require('bcryptjs');
const Order = require('../schemas/orderSchema');
const User = require('../schemas/userSchema');
const Product = require('../schemas/productSchema');
const auth = require('../authentication/auth')

const createNewOrder = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if(!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        };

        let totalPrice = 0;
        for(const orderLine of orderLines) {
            const product = await Product.findById(orderLine.product);
          totalPrice += orderLine.quantity * product.price;
        }

        const newOrder = new Order({
            user: user._id,
            orderLines: orderLines,
            totalPrice: totalPrice
        });

        const savedOrder = await newOrder.save();

        return res.status(201).json(savedOrder);
        
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating order'
        })
    }
}

module.exports = {
    createNewOrder
}

