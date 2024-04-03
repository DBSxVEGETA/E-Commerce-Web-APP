const Product = require('../models/Product');


const showAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});

        res.render('products/index', { products });
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
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
    try {
        const { name, imgUrl, desc, price } = req.body;
        await Product.create({ name, imgUrl, desc, price, author: req.user._id });

        req.flash('success', 'Product added successfully');
        res.redirect('/products');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
}

const showPoduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('reviews');

        res.render('products/show', { product });
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
}

const showEditPage = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        res.render('products/edit', { product });
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
}

const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, imgUrl, desc, price } = req.body;
        await Product.findByIdAndUpdate(id, { name, imgUrl, desc, price });

        req.flash('success', 'Edited your product successfully');
        res.redirect(`/products/${id}`);
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);

        req.flash('success', 'Product deleted successfully');
        res.redirect('/products');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
}

module.exports = {
    showAllProducts,
    getNewProductPage,
    createNewProduct,
    showPoduct,
    showEditPage,
    editProduct,
    deleteProduct
};
