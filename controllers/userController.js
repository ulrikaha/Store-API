//Import router and userModel
const router = require('express').Router()
const userModel = require('../models/userModel')


//Create a new user
router.post('/register', userModel.registerNewUser)

//Login a user
router.post('/login', userModel.loginUser)

//Get all users
router.get('/', userModel.getAllUsers)

//GET a single user
router.get('/:id', userModel.getUserData)


//Export router
module.exports = router;