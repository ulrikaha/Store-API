const User = require('../schemas/userSchema');
const bcrypt = require('bcryptjs');
const auth = require('../authentication/auth');
const Order = require('../schemas/orderSchema');


//Register a new user
const registerNewUser = async (req, res) => {
        const { firstName, lastName, email, password } = req.body;
        
        if(!firstName || !lastName || !email || !password) {
            return res.status(400).json({ 
                err: 'Please fill in all fields' 
            });
        };
         
        const salt = bcrypt.genSaltSync(10);

        bcrypt.hash(password, salt, (err, hash) => {
            if(err) {
                return res.status(500).json({
                    message: 'Error hashing password'
                })  
            };

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

    })
}


//Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({
            message: 'Please fill in all fields'
        })
    };

    User.findOne({ email })
    .then(user => {

        if(!user) {
            return res.status(401).json({
                message: 'Incorrect email or password'
            })
        };

        bcrypt.compare(password, user.passwordHash, (err, result) => {
            if(err) {
                return res.status(500).json({
                    message: 'Error comparing passwords'
                })
            };

            if(!result) {
                return res.status(401).json({
                    message: 'Incorrect email or password'
                })
            };
                res.status(200).json({
                    token: auth.generateToken(user)
                })
            
                })
            })
        }
    


        //Get user data and orders
        const getUserData = async (req, res) => {
        const user = await User.findById(req.params.id);

            if (!user) {
              return res.status(404).json({
                message: 'Could not find this user'
              });

            }
            
           res.status(200).json({
              _id: user._id,
              firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                //Todo connect the orders to the user
            });
            }

         
            const getAllUsers = async (req, res) => {
            const allUsers = await User.find();
            if (!allUsers) {
                return res.status(400).json({ 
                    message: 'The users could not be found' });

            } else {
            return res.status(200).json({ allUsers });
            }
        };


        
        
        
    






module.exports = {
  registerNewUser, 
    loginUser,
    getUserData,
    getAllUsers,
    }
