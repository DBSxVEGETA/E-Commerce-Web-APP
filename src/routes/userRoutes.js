const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');


router.get('/fakeuser', async (req, res) => {
    const user = {
        email: 'apurva@gmail.com',
        username: 'apurva'
    }
    const newUser = await User.register(user, 'apurva123')
    res.send(newUser);
})


router.get('/register', (req, res) => {

    res.render('users/signup')
})

router.post('/register', async (req, res) => {
    try {
        const { username, password, email, role } = req.body;
        const newUser = new User({ username, email, role });
        await User.register(newUser, password);

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
})

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), (req, res) => {
    // console.log(req.user);
    req.flash('success', `Hello ${req.user.username} Welcome Back!!`)
    console.log('Inside login route')
    res.redirect('/products');
});

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            req.flash('error', 'Cannot logout at the moment!!');
            return res.redirect('/products');
        }
        req.flash('success', `Goodbye!! see you soon.`);
        res.redirect('/products');
    });
});





module.exports = router;