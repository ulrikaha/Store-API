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



const getSingleProduct = async (req, res) => {
    try {
      const data = await Product.findById(req.params.id);
      if (!data) {
        res.status(404).json({
          message: 'Could not find this product'
        });
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({
        message: 'Something went wrong when getting this product!',
        err: err.message
      });
    }
  };
  

  const updateProduct = async (req, res) => {
    try {
        const data = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!data) {
            res.status(404).json({
                message: 'Could not find this product'
            });
            return;
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong when updating this product!',
            err: err.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const data = await Product.findByIdAndDelete(req.params.id);
        if (!data) {
            res.status(404).json({
                message: 'Could not find this product'
            });
            return;
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong when deleting this product!',
            err: err.message
        });
    }
};




module.exports = {
    createNewProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}