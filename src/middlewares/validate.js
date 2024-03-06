const { productSchema } = require('../schemas');
const { reviewSchema } = require('../schemas');

const validateProduct = (req, res, next) => {
    const { name, imgUrl, desc, price } = req.body;
    const { error } = productSchema.validate({ name, imgUrl, desc, price });
    if (error) {
        const msg = error.details.map((err) => { err.message }).join(',');
        res.render('error', { err: msg })
    }
    next();
}

const validateReview = (req, res, next) => {
    const { rating, comment } = req.body;
    const { error } = reviewSchema.validate({ rating, comment });
    if (error) {
        const msg = error.details.map((err) => { err.message }).join(',');
        res.render('error', { err: msg })
    }
    next();
}

module.exports = validateProduct, validateReview 