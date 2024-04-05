const User = require('../models/User');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


const getCartPage = async (req, res) => {

    const user = await User.findById(req.user._id).populate('cart');
    const totalCartAmount = user.cart.reduce((total, item) => total + item.price * item.qty, 0)
    const productInfo = user.cart.map((product) => product.name).join(',');

    res.render('cart/cart', { productInfo, totalCartAmount, cart: user.cart });

}

const addProductToCart = async (req, res) => {
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
}

const removeProductFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user._id;

        const productIdObj = new ObjectId(productId);

        await User.updateOne(
            { _id: userId },
            { $pull: { cart: { productId: productIdObj } } }
        );
        req.flash('success', 'Product removed from the cart successfully');
        res.redirect('/cart');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
}



module.exports = {
    getCartPage,
    addProductToCart,
    removeProductFromCart
}