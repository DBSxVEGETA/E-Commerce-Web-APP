const express = require('express');
const router = express.Router();
const Product = require('../models/Product')
const validateProduct = require('../middlewares/validate');
const { isLoggedIn, isSeller, isProductAuthor } = require('../middlewares/auth');
// const isSeller = require('../middlewares/auth');
// const isProductAuthor = require('../middlewares/auth');

//display all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});

        res.render('products/index', { products });
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
})

//get new product page
router.get('/products/new', isLoggedIn, isSeller, (req, res) => {

    try {
        res.render('products/new');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
})


//add a new product
router.post('/products', isLoggedIn, isSeller, validateProduct, async (req, res) => {
    try {
        const { name, imgUrl, desc, price } = req.body;
        await Product.create({ name, imgUrl, desc, price, author: req.user._id });

        req.flash('success', 'Product added successfully');
        res.redirect('/products');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }

})

// show product

router.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('reviews');

        res.render('products/show', { product });
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
})

//show edit page
router.get('/products/:id/edit', isLoggedIn, isProductAuthor, async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        res.render('products/edit', { product });
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
})

//edit and update product
router.patch('/products/:id', isLoggedIn, isProductAuthor, validateProduct, async (req, res) => {
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
})

//delete a product
router.delete('/products/:id', isLoggedIn, isProductAuthor, async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);

        req.flash('success', 'Product deleted successfully');
        res.redirect('/products');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
})

module.exports = router;