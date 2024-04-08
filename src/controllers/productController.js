const { BadRequestError } = require('../core/ApiError');
const Product = require('../models/Product');

const showAllProducts = async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', { products });
}

const getNewProductPage = (req, res) => {
    try {
        res.render('products/new');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
}

const createNewProduct = async (req, res) => {
    const { name, imgUrl, desc, price, discount } = req.body;
    const newProduct = await Product.create({ name, imgUrl, desc, price, discount, author: req.user._id });
    const discountedPrice = price - (price * discount / 100);
    newProduct.discountedPrice = discountedPrice;

    await newProduct.save();

    req.flash('success', 'Product added successfully');
    res.redirect('/products');
}

const showProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('reviews');
    if (!product) {
        throw new BadRequestError(`Product with this id: ${id} doesn't exists.`);
    }
    res.render('products/show', { product });
}

const showEditPage = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        throw new BadRequestError(`Product with this id: ${id} doesn't exists.`)
    }
    res.render('products/edit', { product });
}

const editProduct = async (req, res) => {
    const { id } = req.params;
    const { name, imgUrl, desc, price, discount } = req.body;
    const discountedPrice = price - (price * discount / 100);
    await Product.findByIdAndUpdate(id, { name, imgUrl, desc, price, discount, discountedPrice });

    req.flash('success', 'Edited your product successfully');
    res.redirect(`/products/${id}`);
}



const deleteProduct = async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);

    req.flash('success', 'Product deleted successfully');
    res.redirect('/products');
}

module.exports = {
    showAllProducts,
    getNewProductPage,
    createNewProduct,
    showProduct,
    showEditPage,
    editProduct,
    // searchProduct,
    deleteProduct
};
