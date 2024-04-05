const express = require('express');
const router = express.Router();
const request = require('request');
const jsSHA = require('jssha');
const { v4: uuid } = require('uuid');
const { isLoggedIn } = require('../middlewares/auth');
const Order = require('../models/Order');


router.post('/payment_gateway/payumoney', isLoggedIn, (req, res) => {

    req.body.txnid = uuid();//Here pass txnid and it should be different on every call

    req.body.email = req.user.email;

    req.body.firstname = req.user.username;

    //Here save all the details in pay object 
    const pay = req.body;

    const hashString = process.env.MERCHANT_KEY //store in in different file
        + '|' + pay.txnid
        + '|' + pay.amount
        + '|' + pay.productinfo
        + '|' + pay.firstname
        + '|' + pay.email
        + '|' + '||||||||||'
        + process.env.MERCHANT_SALT //store in in different file

    const sha = new jsSHA('SHA-512', "TEXT");

    sha.update(hashString);

    //Getting hashed value from sha module
    const hash = sha.getHash("HEX");

    //We have to additionally pass merchant key to API so remember to include it.

    pay.key = process.env.MERCHANT_KEY //store in in different file;
    pay.surl = 'http://localhost:3000/payment/sucess';
    pay.furl = 'http://localhost:3000/payment/fail';
    pay.hash = hash;

    //Making an HTTP/HTTPS call with request
    request.post({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: 'https://sandboxsecure.payu.in/_payment', //Testing url
        form: pay
    }, function (error, httpRes, body) {

        if (error)
            res.send(
                {
                    status: false,
                    message: error.toString()
                });

        if (httpRes.statusCode === 200) {
            res.send(body);
        } else if (httpRes.statusCode >= 300 &&
            httpRes.statusCode <= 400) {
            res.redirect(httpRes.headers.location.toString());
        }
    })
});


router.post('/payment/success', isLoggedIn, async (req, res) => {

    const { txnId, amount, productinfo } = req.body;

    //getting the current user
    const user = req.user;

    //creating a new order and storing the whole cart into orderedProduts
    const order = new Order({ txnId, productinfo, amount, orderedProducts: [...user.cart] })

    //pushing the new order into users orders array 
    user.orders.push(order)

    //saving the new order into database
    await user.save();

    //removing everything from cureent users cart
    user.cart.splice(0, user.cart.length);

    //saving the updated user to the database and assinging updated user to the req.user
    req.user = await user.save();

    req.flash('success', 'Placed your order successfully!!');
    res.redirect('/users/myOrders');
})

router.post('/payment/fail', isLoggedIn, (req, res) => {

    req.flash('error', `Oops! Can't place your order at the moment.Please try again after some time!`);
    res.redirect('/user/cart');

})











module.exports = router;