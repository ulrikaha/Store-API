
const getAllProductsStatic = async (req, res) => {
    throw new Error('testing static error')
    res.status(200).json({ message: 'products testing route' })
}

const getAllProducts = async (req, res) => {
    res.status(200).json({ message: 'products route' })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts,
}