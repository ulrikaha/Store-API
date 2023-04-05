const User = require('../schemas/userSchema');
const bcrypt = require('bcryptjs');
const auth = require('../authentication/auth');






const createNewUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        
        if(!firstName || !lastName || !email || !password) {
            return res.status(400).json({ err: 'Please fill in all fields' });
        };

        const salt = bcrypt.genSaltSync(10);

        bcrypt.hash(password, salt, (err, hash) => {
            if(err) {
                return res.status(500).json({
                    message: 'Error hashing password'
                })  
            };
        });

        User.create({
            firstName,
            lastName,
            email,
            passwordHash: hash,
        })

        .then(user => {
            res.status(201).json({ 
            token: auth.generateToken(user)
        })

        })

    } catch (err) {
        res.status(500).json({ err: 'Server error' });
    };
};









module.exports = {
  createNewUser,  
}