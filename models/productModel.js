const Product = require('../schemas/productSchema');


const createNewProduct = async (req, res) => {
    try {
        const { name, description, price, imgURL } = req.body;

        const newProduct = await Product.create(req.body);
        res.status(200).json({ newProduct }); 

    } catch (err) {
        res.status(400).json({ err: 'Product could not be added' });
    };
};

const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find();
        res.status(200).json({ allProducts });
    } catch (err) {
        res.status(400).json({ err: 'Products could not be found' });
    };
};















module.exports = {
    createNewProduct,
    getAllProducts,
}