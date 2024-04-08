const catchAsync = require('../core/catchAsync');
const Product = require('../models/Product');



const isLoggedIn = (req, res, next) => {

    if (req.xhr && !req.isAuthenticated()) {
        return res.status(401).json({ msg: 'You need to login first' });
    }

    req.session.returnUrl = req.originalUrl;

    if (!req.isAuthenticated()) {
        req.flash('error', 'Please login first to perform that action!!');
        return res.redirect('/login');
    }
    next();
}


const isSeller = (req, res, next) => {

    if (!(req.user.role && req.user.role === 'seller')) {
        req.flash('error', 'You don\'t have permissions to do that');
        return res.redirect('/products');
    }

    next();
}

const isProductAuthor = catchAsync(async (req, res, next) => {
    const { id: productId } = req.params;
    const product = await Product.findById(productId);
    const currentUser = req.user._id;
    if (!(product.author && product.author.equals(currentUser))) {
        req.flash('error', 'You do not have the permision to do that')
        return res.redirect(`/products/${productId}`);
    }
    next();
});

module.exports = { isLoggedIn, isSeller, isProductAuthor };

