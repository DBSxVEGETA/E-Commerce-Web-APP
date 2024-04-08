const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');
const { BadRequestError } = require('../core/ApiError');
const catchAsync = require('../core/catchAsync');


router.get('/wishlist', catchAsync(async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
        throw new BadRequestError(`User with ID: ${userId} not found`);
    }

    // Extracting product IDs from the user's wishlist
    const wishlistItemIds = user.wishList;

    // Finding products based on the wishlistItemIds
    const products = await Product.find({ _id: { $in: wishlistItemIds } });

    res.render('wishlists/wishlist', { products });
}));



module.exports = router;