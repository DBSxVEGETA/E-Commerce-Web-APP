const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const { isLoggedIn } = require('../middlewares/auth');



router.get('/cart', isLoggedIn, async (req, res) => {

    const user = await User.findById(req.user._id).populate('cart');
    const totalCartAmount = user.cart.reduce((total, item) => total + item.price * item.qty, 0)
    const productInfo = user.cart.map((product) => product.name).join(',');

    res.render('cart/cart', { productInfo, totalCartAmount, cart: user.cart });

})


router.post('/cart/:productId', isLoggedIn, async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        const user = await User.findById(req.user._id);

        const existingCartItem = user.cart.find((item) => item.productId.equals(product._id));
        if (existingCartItem) {
            existingCartItem.qty = existingCartItem.qty + 1;
        } else {
            user.cart.push({ productId: product._id, name: product.name, price: product.price, imgUrl: product.imgUrl });
        }

        await user.save();

        req.flash('success', 'Product added to cart successfully');
        res.redirect(`/products/${productId}`);
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})



module.exports = router;