const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

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
    }
}, { timestamps: true, versionKey: false })

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);


module.exports = User;


