const { BadRequestError } = require('../core/ApiError');
const Product = require('../models/Product');
const Review = require('../models/Review');

const createReview = async (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const product = await Product.findById(id);
    if (!product) {
        throw new BadRequestError(`Product with this id: ${id} doesn't exist`);
    }
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

const deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;

    //Remove the review from the reviews collection
    await Review.deleteOne({ _id: reviewId });
    // Remove the review from the products reviews array
    await Product.updateOne(
        { _id: id },
        { $pull: { reviews: reviewId } }
    )

    // Fetch the product again to reflect the updated reviews array
    const product = await Product.findById(id).populate('reviews');

    // Recalculate the average rating
    let totalRating = 0;
    product.reviews.forEach(review => {
        totalRating += review.rating;
    });

    const newAvgRating = product.reviews.length > 0 ? totalRating / product.reviews.length : 0;

    // Update the avgRating
    product.avgRating = parseFloat(newAvgRating.toFixed(1));

    // Save the updated product
    await product.save();

    req.flash('success', 'Review deleted successfully');
    res.redirect(`/products/${id}`);
}

module.exports = {
    createReview,
    deleteReview
}