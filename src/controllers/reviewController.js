const Product = require('../models/Product');
const Review = require('../models/Review');

const createReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;
        const product = await Product.findById(id);
        const review = new Review({ rating, comment });

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
}


const deleteReview = async (req, res) => {
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
}


module.exports = {
    createReview,
    deleteReview
}