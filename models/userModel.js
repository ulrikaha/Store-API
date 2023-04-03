const User = require('../schemas/userSchema');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

const secretKey = process.env.SECRET_KEY;


const createNewUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const newUser = await User.create(req.body);
        
        const savedUser = await newUser.save();

        const token = jwt.sign({ id: savedUser._id }, secretKey, { expiresIn: '10d' });

        res.status(201).json({ token, user: savedUser });

    } catch (err) {
        res.status(400).json({ err: 'User could not be added' });
    };
};









module.exports = {
  createNewUser,  
}