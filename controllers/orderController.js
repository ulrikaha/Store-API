//Import express,router, auth and orderModel
const router = require('express').Router()
const orderModel = require('../models/orderModel')
const auth = require('../authentication/auth')


//Create a new order, if user is logged in, send token
router.post('/', auth.verifyToken, orderModel.createNewOrder)


//Get all orders, if user is logged in, send token
router.get('/orders', auth.verifyToken, orderModel.getOrdersByUser)


//Export router
module.exports = router;