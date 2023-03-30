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
            const allProducts = await Product.find({});
            res.status(200).json({ allProducts });
        } catch (err) {
            res.status(400).json({ err: 'Products could not be found' });
        }
    };

    const getSingleProduct = async (req, res) => {
        try {
            const { id: productId } = req.params;

            const product = await Product.findOne({ _id: productId });

            res.status(200).json({ product });
        } catch (err) {
            res.status(400).json({ err: 'Product could not be found' });
        }
    };

    const updateProduct = async (req, res) => {
        try {
            const { id: productId } = req.params;
         
            const Product = await Product.findOneAndUpdate({ _id: productId }, req.body ,{
                new: true,
                runValidators: true,
           });
            res.status(200).json({ Product });
        } catch (err) {
            res.status(400).json({ err: 'Product could not be updated' });
        }
    };

    const deleteProduct = async (req, res) => {
        try {
            const { id: productId } = req.params;

            const product = await Product.findOne({ _id: productId });

            await product.remove();

            res.status(200).json({ product });
        } catch (err) {
            res.status(400).json({ err: 'Product could not be deleted' });
        }
    };

          

    module.exports = {
   createNewProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,

};