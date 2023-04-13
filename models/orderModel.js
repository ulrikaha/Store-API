//Import order,user and product moduels
const Order = require("../schemas/orderSchema");
const User = require("../schemas/userSchema");
const Product = require("../schemas/productSchema");


//Create a new order if the user is logged in
const createNewOrder = async (req, res) => {
  try {
    if (!req.userData || !req.userData._id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await User.findById(req.userData._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const orderLines = req.body.orderLines;

    let totalPrice = 0;
    for (const orderLine of orderLines) {
      const product = await Product.findById(orderLine.product)
      

      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${orderLine.product}`,
        });
      }
      if (orderLine.quantity <= 0 || orderLine.quantity > product.quantity) {
        return res.status(400).json({
          message: `Invalid quantity for product: ${product.name}`,
        });
      }

      totalPrice += orderLine.quantity * product.price;
    }

    const newOrder = new Order({
      user: user._id,
      orderLines: orderLines,
      totalPrice: totalPrice,
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
      message: "Error creating order",
    });
  }
};



//Get all orders for a specific user
const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.userData._id;

    const orders = await Order.find({ user: userId }).populate({
      path: "orderLines.product",
      select: "name price _id",
    });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({
      message: "Error getting orders",
    });
  }
};


//Export modules
module.exports = {
  createNewOrder,
  getOrdersByUser,
};
