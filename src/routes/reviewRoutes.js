const express = require('express');
const router = express.Router();

const Product = require('../models/Product');
const Review = require('../models/Review');
const { validateReview } = require('../middlewares/validate');
const { isLoggedIn } = require('../middlewares/auth');


router.post('/products/:id/reviews', isLoggedIn, validateReview, async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;
        const review = new Review({ rating, comment });
        const product = await Product.findById(id);

        // Average rating logic
        const newAverageRating = ((product.avgRating * product.reviews.length) + parseInt(rating)) / (product.reviews.length + 1);
        product.avgRating = parseFloat(newAverageRating.toFixed(1));

        product.reviews.push(review);

        await review.save();
        await product.save();

        req.flash('success', 'Your review was added successfully');
        res.redirect(`/products/${id}`);
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})

router.delete('/products/:id/reviews/:id', isLoggedIn, async (req, res) => {
    try {
        const { reviewId } = req.params;
        const review = await Product.findByIdAndDelete(reviewId);
        console.log(review);

        req.flash('success', 'Deleted your review successfully');
        res.render('/products/show');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
})

module.exports = router;