const express = require('express');
const router = express.Router();

const Product = require('../models/Product');
const Review = require('../models/Review');
const { validateReview } = require('../middlewares/validate');
const { isLoggedIn } = require('../middlewares/auth');
const reviewController = require('../controllers/reviewController')


router.route('/:id/reviews')
    // creating a review
    .post(isLoggedIn, validateReview, reviewController.createReview)
    // deleting a review
    .delete(isLoggedIn, reviewController.deleteReview)

module.exports = router;