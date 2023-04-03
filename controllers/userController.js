const router = require('express').Router()
const userModel = require('../models/userModel')


//CREATE A NEW USER
router.post('/users',userModel.createNewUser)

//READ
//router.get('/', userModel.getAllUsers)
//router.get('/:id', userModel.getSingleUser)

//UPDATE
//router.put('/:id', userModel.updateUser)

//DELETE
//router.delete('/:id', userModel.deleteUser)


module.exports = router;