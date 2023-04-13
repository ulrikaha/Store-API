//Import express,router and productModel
const router = require('express').Router()
const productModel = require('../models/productModel')


//Create a new product
router.post('/',productModel.createNewProduct)

//Get all products
router.get('/', productModel.getAllProducts)

//Get single product
router.get('/:id', productModel.getSingleProduct)

//Update a product
router.put('/:id', productModel.updateProduct)

//Delete a product
router.delete('/:id', productModel.deleteProduct)

//Export router
module.exports = router