const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/auth');
const cartController = require('../controllers/cartController')



// show cart page
router.get('/', isLoggedIn, cartController.getCartPage)

router.route('/:productId')
    // add product to cart
    .post(isLoggedIn, cartController.addProductToCart)
    //remove product from cart
    .patch(isLoggedIn, cartController.removeProductFromCart)


module.exports = router;