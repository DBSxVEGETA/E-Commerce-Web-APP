const { BadRequestError } = require('../core/ApiError');
const User = require('../models/User');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


const getCartPage = async (req, res) => {
    const user = await User.findById(req.user._id).populate('cart');
    if (!user) {
        throw new BadRequestError(`User with this id: ${req.user._id} doesn't exists.`)
    }
    const totalCartAmount = user.cart.reduce((total, item) => total + item.discountedPrice * item.qty, 0)
    const productInfo = user.cart.map((product) => product.name).join(',');

    res.render('cart/cart', { productInfo, totalCartAmount, cart: user.cart });
}

const addProductToCart = async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
        throw new BadRequestError(`Product with this id: ${productId} doesn't exists.`)
    }
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new BadRequestError(`User with this id: ${req.user._id} doesn't exists.`)
    }
    const existingCartItem = user.cart.find((item) => item.productId.equals(product._id));
    if (existingCartItem) {
        existingCartItem.qty = existingCartItem.qty + 1;
    } else {
        user.cart.push({ productId: product._id, name: product.name, price: product.price, imgUrl: product.imgUrl, discount: product.discount, discountedPrice: product.discountedPrice });
    }

    await user.save();

    req.flash('success', 'Product added to cart successfully');
    res.redirect(`/products/${productId}`);
}

const removeProductFromCart = async (req, res) => {
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

const saveForLater = (async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;
    // grab the current login user
    const currentUser = req.user;
    const isLiked = currentUser.wishList.includes(productId);

    if (isLiked) {
        // req.user = await User.findByIdAndUpdate(req.user._id, { $pull: { wishList: productId } }, { new: true });
        req.flash('success', `Product is already present in your wishlist`)
    }
    else {
        req.user = await User.findByIdAndUpdate(req.user._id, { $addToSet: { wishList: productId } }, { new: true });
        req.flash('success', `Product added to wishlist successfully`);
    }
    // const option = isLiked ? '$pull' : '$addToSet';
    // req.user = await User.findByIdAndUpdate(req.user._id, { [option]: { wishList: productId } }, { new: true })

    const productIdObj = new ObjectId(productId);

    await User.updateOne(
        { _id: userId },
        { $pull: { cart: { productId: productIdObj } } }
    );
    res.redirect('/cart');
})


module.exports = {
    getCartPage,
    addProductToCart,
    removeProductFromCart,
    saveForLater
}