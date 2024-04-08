const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/auth');
const catchAsync = require('../core/catchAsync');
const User = require('../models/User');



router.get('/user/myOrders', isLoggedIn, catchAsync(async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId).populate({
        path: 'orders',
        populate: {
            path: 'orderProducts'
        }
    });
    res.render('orders/myOrder', { order: user.orders });
})
)

module.exports = router;