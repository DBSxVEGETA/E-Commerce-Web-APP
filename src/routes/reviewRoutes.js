const express = require('express');
const router = express.Router();
const { validateReview } = require('../middlewares/validate');
const { isLoggedIn } = require('../middlewares/auth');
const reviewController = require('../controllers/reviewController')



router.route('/:id/reviews')
    // creating a review
    .post(isLoggedIn, validateReview, reviewController.createReview)

router.route('/:id/reviews/:reviewId')
    .patch(isLoggedIn, reviewController.deleteReview)


module.exports = router;