const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/auth');
const catchAsync = require('../core/catchAsync');
const cartController = require('../controllers/cartController')



// show cart page
router.get('/', isLoggedIn, catchAsync(cartController.getCartPage))

router.route('/:productId')
    // add product to cart
    .post(isLoggedIn, catchAsync(cartController.addProductToCart))
    //remove product from cart
    .patch(isLoggedIn, catchAsync(cartController.removeProductFromCart))


module.exports = router;