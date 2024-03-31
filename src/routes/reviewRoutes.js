const express = require('express');
const router = express.Router();

const Product = require('../models/Product');
const Review = require('../models/Review');
const { validateReview } = require('../middlewares/validate');
const { isLoggedIn } = require('../middlewares/auth');


router.post('/products/:productId/review', isLoggedIn, validateReview, async (req, res) => {
    try {
        const { productId } = req.params;
        const { rating, comment } = req.body;
        const product = await Product.findById(productId);
        const review = new Review({ rating, comment });

        // Average rating logic
        const newAverageRating = ((product.avgRating * product.reviews.length) + parseInt(rating)) / (product.reviews.length + 1);
        product.avgRating = parseFloat(newAverageRating.toFixed(1));

        product.reviews.push(review);

        await review.save();
        await product.save();

        req.flash('success', 'Your review was added successfully');
        res.redirect(`/products/${productId}`);
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})

router.delete('/products/:id/reviews', isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        const existingReview = product.review.find((item) => { item })
        const reviewId = product.review._id;
        console.log(reviewId);


        // const review = await Product.findById(reviewId);


        // req.flash('success', 'Deleted your review successfully');
        // res.render(`/products/${id}`);
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
})

module.exports = router;