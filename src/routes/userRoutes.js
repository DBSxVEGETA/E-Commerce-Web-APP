const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');

// router.get('/fakeuser', async (req, res) => {
//     const user = {
//         email: 'apurva@gmail.com',
//         username: 'apurva'
//     }
//     const newUser = await User.register(user, 'apurva123')
//     res.send(newUser);
// })

router.route('/register')
    // get register page
    .get(userController.getRegisterPage)
    // register user
    .post(userController.registerNewUser)

router.route('/login')
    // get login page
    .get(userController.getLoginPage)
    // login user
    .post(passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }), userController.loginUser)

// logout user
router.get('/logout', userController.logoutUser);



module.exports = router;