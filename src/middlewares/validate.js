const { productSchema } = require('../schemas');
const { reviewSchema } = require('../schemas');

const validateProduct = (req, res, next) => {
    const { id } = req.params;
    const { name, imgUrl, price, desc } = req.body;
    const { error } = productSchema.validate({ name, imgUrl, price, desc });
    if (error) {
        const msg = error.details.map((err) => err.message).join(',');
        return res.render('error', { err: msg });
    }
    next();
}

const validateReview = (req, res, next) => {

    const { rating, comment } = req.body;
    const { error } = reviewSchema.validate({ rating, comment });

    if (error) {
        const msg = error.details.map((err) => err.message).join(',')
        // console.log(msg);
        return res.render('error', { err: msg });
    }
    next();
}



module.exports = { validateProduct, validateReview };