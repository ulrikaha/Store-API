//Require express and cors and initialize app
const express = require('express');
const app = express();
const cors = require('cors');
require('express-async-errors')

const errorHandlerMiddleware = require('./middleware/error-handler');

const productsRouter = require('./routes/products');

//middlewear
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.send('Store API');
});

app.use('api/v1/products', productsRouter);
    

module.exports = app;



