//Require dotenv and config
require('dotenv').config();

// async errors

//Require express and initialize app
const express = require('express');
const app = express();

const notFoundMiddlewear = require('./middleware/not-found');
const errorMiddlewear = require('./middleware/error-handler');

//middlewear
app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.send('Store Api');
});
    