const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../../middlewares/auth');
const User = require('../../models/User');


router.post('/product/:productid/like', isLoggedIn, async (req, res) => {

    const { productid } = req.params;
    // grab the current login user
    const user = req.user;
    const isLiked = user.wishList.includes(productid);

    // if (isLiked) {
    //     req.user = await User.findByIdAndUpdate(req.user._id, { $pull: { wishList: productid } },{new:true});
    // }
    // else {
    //     req.user = await User.findByIdAndUpdate(req.user._id, { $addToSet: { wishList: productid } },{new:true});
    // }

    const option = isLiked ? '$pull' : '$addToSet';
    req.user = await User.findByIdAndUpdate(req.user._id, { [option]: { wishList: productid } }, { new: true })


    res.send('like API');
})



module.exports = router;