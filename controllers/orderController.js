const router = require('express').Router()
const orderModel = require('../models/orderModel')
const auth = require('../authentication/auth')



//CREATE A NEW ORDER IF USER IS LOGGED IN
router.post('/', auth.verifyToken, orderModel.createNewOrder)


//GET ALL ORDERS BY USER IF USER IS LOGGED IN , SEND BEARER TOKEN 
router.get('/orders', auth.verifyToken, orderModel.getOrdersByUser)




module.exports = router;