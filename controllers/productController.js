const router = require('express').Router()
const productModel = require('../models/productModel')


//CREATE
router.post('/',productModel.createNewProduct)

//READ
router.get('/', productModel.getAllProducts)
router.get('/:id', productModel.getSingleProduct)

//UPDATE
router.put('/:id', productModel.updateProduct)

//DELETE
router.delete('/:id', productModel.deleteProduct)


module.exports = router