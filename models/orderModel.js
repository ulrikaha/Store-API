const bcrypt = require('bcryptjs');
const Order = require('../schemas/orderSchema');
const User = require('../schemas/userSchema');
const Product = require('../schemas/productSchema');


const createNewOrder = async (req, res) => {
    try {
        const user = await User.findById(req.userData._id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const orderLines = req.body.orderLines;
        let totalPrice = 0;
        for (const orderLine of orderLines) {
            const product = await Product.findById(orderLine.product);
            totalPrice += orderLine.quantity * product.price;
        }

        const newOrder = new Order({
            user: user._id,
            orderLines: orderLines,
            totalPrice: totalPrice
        });

        const savedOrder = await newOrder.save();

        if (user.orders) {
            user.orders.push(savedOrder._id);
        } else {
            user.orders = [savedOrder._id];
        }
        await user.save();

        return res.status(201).json(savedOrder);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error creating order'
        });
    }
};




  

const getOrdersByUser = async (req, res) => {
    try {
        const userId = req.userData._id;

        const orders = await Order.find({ user: userId });

        return res.status(200).json(orders);

    } catch (error) {
        return res.status(500).json({
            message: 'Error getting orders'
        })
    }
}





    module.exports = {
    createNewOrder,
    getOrdersByUser
}

