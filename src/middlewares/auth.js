const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'Please login first to perform that action!!');
        return res.redirect('/login');
    }
    return next();
}


module.exports = isLoggedIn;