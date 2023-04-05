const router = require('express').Router()
const userModel = require('../models/userModel')
const auth = require('../authentication/auth')


//CREATE A NEW USER
router.post('/register', userModel.createNewUser)

//READ
//router.get('/', userModel.getAllUsers)
//router.get('/:id', userModel.getSingleUser)

//UPDATE
//router.put('/:id', userModel.updateUser)

//DELETE
//router.delete('/:id', userModel.deleteUser)


module.exports = router;