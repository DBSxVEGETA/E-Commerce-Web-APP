const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../../middlewares/auth');
const User = require('../../models/User');
const catchAsync = require('../../core/catchAsync');


router.post('/product/:productId/like', isLoggedIn, catchAsync(async (req, res) => {
    const { productId } = req.params;
    // grab the current login user
    const user = req.user;
    const isLiked = user.wishList.includes(productId);
    // if (isLiked) {
    //     req.user = await User.findByIdAndUpdate(req.user._id, { $pull: { wishList: productId } },{new:true});
    // }
    // else {
    //     req.user = await User.findByIdAndUpdate(req.user._id, { $addToSet: { wishList: productId } },{new:true});
    // }
    const option = isLiked ? '$pull' : '$addToSet';
    req.user = await User.findByIdAndUpdate(req.user._id, { [option]: { wishList: productId } }, { new: true })

    res.redirect('/cart');
})
)



module.exports = router;