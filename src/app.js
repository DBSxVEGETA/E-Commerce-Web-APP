if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User');

//routes
const productRoutes = require('./routes/productsRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// APIs
const productApi = require('./routes/api/productapi');


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true, limit: '10mb', parameterLimit: 5000 }));
app.use(methodOverride('_method'));



const sessionConfig = {
    secret: 'we need a better secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        //secure: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}


app.use(session(sessionConfig));
app.use(flash());



// this is used to initialize passport middleware for authentication 
app.use(passport.initialize());

//this tells express to use express session for passport persistent login
app.use(passport.session());

//this is used to serialize(store in string form) into the express session.
passport.serializeUser(User.serializeUser());

//this is used to deserialize(change user in string format to actual JS object) from express session. 
passport.deserializeUser(User.deserializeUser());

//Auth middlewares related to passport 
//this tells express to use local strategy
passport.use(new LocalStrategy(User.authenticate()));

// This middleware should be added after : passport.deserializeUser(User.deserializeUser());
// Since User is populated in the request only after it is deserialized from the session
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error');
    next();
})

app.use(productRoutes);
app.use(reviewRoutes);
app.use(userRoutes);
app.use(cartRoutes);
app.use(paymentRoutes);

app.use(productApi);


module.exports = app;