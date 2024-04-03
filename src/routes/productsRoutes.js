const express = require('express');
const router = express.Router();
const Product = require('../models/Product')
const { validateProduct } = require('../middlewares/validate');
const { isLoggedIn, isSeller, isProductAuthor } = require('../middlewares/auth');
const productController = require('../controllers/productController');

router.route('/')
    //display all products
    .get(productController.showAllProducts)
    //add a new product
    .post(isLoggedIn, isSeller, validateProduct, productController.createNewProduct)

//get new product page
router.get('/new', isLoggedIn, isSeller, productController.getNewProductPage)

router.route('/:id')
    // show product
    .get(productController.showPoduct)
    //edit and update product
    .patch(isLoggedIn, isProductAuthor, validateProduct, productController.editProduct)
    //delete a product
    .delete(isLoggedIn, isProductAuthor, productController.deleteProduct)

//show edit page
router.get('/:id/edit', isLoggedIn, isProductAuthor, productController.showEditPage)



module.exports = router;