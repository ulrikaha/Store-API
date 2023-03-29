//Require express and initialize app
const express = require('express');
const app = express();
const cors = require('cors');



//middlewear
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.send('Store API');
});
    

module.exports = app;



