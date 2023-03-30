const express = require('express');
const router = express.Router();

const {getAllProducts, getSingleProduct, createNewProduct, updateProduct, deleteProduct} = require('../controllers/productController');


router.route('/').get(getAllProducts);

router.route('/:id').get(getSingleProduct);

router.route('/').post(createNewProduct);

router.route('/:id').put(updateProduct);

router.route('/:id').delete(deleteProduct);


module.exports = router;