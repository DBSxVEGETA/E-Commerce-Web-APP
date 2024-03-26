const { number } = require('joi');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const cartSchema = new mongoose.Schema({
    _id: false,
    name: String,
    price: Number,
    productId: mongoose.Schema.Types.ObjectId,
    qty: {
        type: Number,
        default: 1
    },
    imgUrl: String
}, { versionKey: false, timestamps: true });

const userSchema = new mongoose.Schema({

    // username: {
    //     type: String,
    //     required: true
    // },
    // password: {
    //     type: String,
    //     required: true
    // },   // username and password is injected by passport local mongoose 
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['seller', 'buyer', 'admin']
    },
    cart: [cartSchema],
    wishList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
}, { timestamps: true, versionKey: false })

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);


module.exports = User;


