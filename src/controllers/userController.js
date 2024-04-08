const User = require('../models/User');


const getRegisterPage = (req, res) => {
    res.render('users/signup')
}

const registerNewUser = async (req, res) => {
    try {
        const { username, password, email, role } = req.body;
        const user = new User({ username, email, role });
        const newUser = await User.register(user, password);

        req.login(newUser, function (err) {
            if (err) {
                return next(err);
            }
            req.flash('success', `Welcome ${req.user.username}, you are registered successfully`)
            return res.redirect('/products');
        });
    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

const getLoginPage = (req, res) => {
    res.render('users/login');
}

const loginUser = (req, res) => {

    req.flash('success', `Hello ${req.user.username} Welcome Back!!`)

    // console.log(req.session);
    let redirectUrl = req.session.returnUrl || '/products';

    if (redirectUrl && redirectUrl.indexOf('review') !== -1) {
        redirectUrl = redirectUrl.split('/');
        redirectUrl.pop();
        redirectUrl = redirectUrl.join('/');
    }
    delete req.session.returnUrl;
    res.redirect(redirectUrl);
}

const logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
            req.flash('error', 'Cannot logout at the moment!!');
            return res.redirect('/products');
        }
        req.flash('success', `Goodbye!! see you soon.`);
        res.redirect('/products');
    });
}

module.exports = {
    getRegisterPage,
    registerNewUser,
    getLoginPage,
    loginUser,
    logoutUser
}