const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const { isLoggedIn } = require('../middlewares/auth');
const cartController = require('../controllers/cartController')


// show cart page
router.get('/', isLoggedIn, cartController.getCartPage)

// add product to cart
router.post('/:productId', isLoggedIn, cartController.addProductToCart)


module.exports = router;