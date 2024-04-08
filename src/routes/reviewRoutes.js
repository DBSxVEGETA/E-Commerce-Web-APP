const express = require('express');
const router = express.Router();
const catchAsync = require('../core/catchAsync');
const { validateReview } = require('../middlewares/validate');
const { isLoggedIn } = require('../middlewares/auth');
const reviewController = require('../controllers/reviewController')



router.route('/:id/reviews')
    // creating a review
    .post(isLoggedIn, validateReview, catchAsync(reviewController.createReview))

router.route('/:id/reviews/:reviewId')
    .patch(isLoggedIn, catchAsync(reviewController.deleteReview))


module.exports = router;