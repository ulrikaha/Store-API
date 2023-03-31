//Require express and cors and initialize app
const express = require('express');
const app = express();
const cors = require('cors');
require('express-async-errors');




//middlewear
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use('/api/products', require('./controllers/productController'));


module.exports = app;



