const router = require('express').Router()
const userModel = require('../models/userModel')
const auth = require('../authentication/auth')



//CREATE A NEW USER
router.post('/register', userModel.registerNewUser)

//LOGIN USER
router.post('/login', userModel.loginUser)

//GET ALL USERS
router.get('/', userModel.getAllUsers)

//GET SINGLE USER
router.get('/:id', userModel.getUserData)

//UPDATE A USER
//router.put('/:id', auth.userModel.updateUser)

//DELETE A USER
//router.delete('/:id', auth.userModel.deleteUser)


module.exports = router;