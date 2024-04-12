const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/auth');
const catchAsync = require('../core/catchAsync');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const User = require('../models/User');
const Order = require('../models/Order');
const { BadRequestError } = require('../core/ApiError');
const CLIENT_URL = process.env.CLIENT_URL;




router.post('/create-checkout-session', isLoggedIn, catchAsync(async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
        throw new BadRequestError(`User with this id: ${userId} doesn't exist.`);
    }
    // const customer = await stripe.customers.create({
    //     metadata: {
    //         userId: userId,
    //         cart: JSON.stringify(user.cart)
    //     }
    // })
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        billing_address_collection: 'required',
        shipping_address_collection: {
            allowed_countries: ['US', 'CA'],
        },
        shipping_options: [
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 0,
                        currency: 'inr',
                    },
                    display_name: 'Free Shipping',
                    //Delivers between 5-7 business days
                    delivery_estimate: {
                        minimum: {
                            unit: 'business_day',
                            value: 5,
                        },
                        maximum: {
                            unit: 'business_day',
                            value: 7,
                        },
                    }
                }
            },
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 15000,
                        currency: 'inr',
                    },
                    display_name: 'Next Day Air',
                    //Delivers in exactly 1 business day
                    delivery_estimate: {
                        minimum: {
                            unit: 'business_day',
                            value: 1,
                        },
                        maximum: {
                            unit: 'business_day',
                            value: 1,
                        },
                    }
                }
            },
        ],
        phone_number_collection: {
            enabled: true,
        },
        line_items: user.cart.map(item => {
            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.name,
                        images: [item.imgUrl],
                        metadata: {
                            id: item.productId
                        }
                    },
                    unit_amount: (item.discountedPrice) * 100,
                },
                quantity: item.quantity || 1,
            }
        }),
        // customer: customer.id,
        mode: 'payment',
        success_url: `${CLIENT_URL}/success`,
        cancel_url: `${CLIENT_URL}/fail`,
    });

    res.redirect(303, session.url);
}));


//stripe webhook for viewing orders

// This is your Stripe CLI webhook secret for testing your endpoint locally.
// let endpointSecret;
// endpointSecret = process.env.ENDPOINT_SECRET;


// router.post('/webhook', express.raw({ type: 'application/json' }),
//     (req, res) => {
//         const sig = req.headers['stripe-signature'];

//         let data;
//         let eventType;

//         if (endpointSecret) {
//             let event;

//             try {
//                 event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//                 console.log("Webhook verified")
//             } catch (err) {
//                 console.log(`Webhook Error: ${err.message}`)
//                 res.status(400).send(`Webhook Error: ${err.message}`);
//                 return;
//             }

//             data = event.data.object;
//             eventType = event.type;
//         } else {
//             data = req.body.data.object;
//             eventType = req.body.type;
//         }

//         // Handle the event
//         if (eventType === "checkout.session.completed") {
//             stripe.customers
//                 .retrieve(data.customer)
//                 .then((customer) => {
//                     console.log(customer);
//                     console.log("data:", data);
//                 })
//                 .catch((err) => console.log(err.message));
//         }

//         // Return a 200 res to acknowledge receipt of the event
//         res.send().end();
//     });

router.get('/success', isLoggedIn, (req, res) => {
    res.render('payment/success')
})

router.get('/fail', isLoggedIn, (req, res) => {
    res.render('payment/fail')
})

router.post('/payment/success', isLoggedIn, catchAsync(async (req, res) => {

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
    res.redirect('/user/myOrders');
}))

router.post('/payment/fail', isLoggedIn, (req, res) => {

    req.flash('error', `Oops! Can't place your order at the moment.Please try again after some time!`);
    res.redirect('/user/cart');

})

module.exports = router;