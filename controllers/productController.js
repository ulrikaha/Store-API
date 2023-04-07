const router = require('express').Router()
const productModel = require('../models/productModel')


//CREATE A NEW PRODUCT
router.post('/',productModel.createNewProduct)

//GET ALL PRODUCTS
router.get('/', productModel.getAllProducts)

//GET SINGLE PRODUCT
router.get('/:id', productModel.getSingleProduct)

//UPDATE A PRODUCT
router.put('/:id', productModel.updateProduct)

//DELETE A PRODUCT
router.delete('/:id', productModel.deleteProduct)


module.exports = router