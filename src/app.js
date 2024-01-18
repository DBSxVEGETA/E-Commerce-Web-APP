const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');

const productRoutes = require('./routes/productsRoutes');
const reviewRoutes = require('./routes/reviewRoutes')

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true, limit: '10mb', parameterLimit: 5000 }));
app.use(methodOverride('_method'));




app.use(productRoutes);
app.use(reviewRoutes);






module.exports = app;