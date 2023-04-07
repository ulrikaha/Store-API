const User = require('../schemas/userSchema');
const bcrypt = require('bcryptjs');
const auth = require('../authentication/auth');



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

        const getUserData = (req, res) => {
       const { _id, displayName } = req.userData;

       User.findById(_id)
         .then(user => {
            res.status(200).json({
            })
            })
        }



    const getAllUsers = async (req, res) => {
            try {
                const allUsers = await User.find();
                res.status(200).json({ allUsers });
            } catch (err) {
                res.status(400).json({ err: 'The users could not be found' });
            };
        };


        const updateUser = async (req, res) => {
            try {
                const data = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
                if (!data) {
                    res.status(404).json({
                        message: 'Could not find this user'
                    });
                    return;
                }
                res.status(200).json(data);
            } catch (err) {
                res.status(500).json({
                    message: 'Something went wrong when updating this user!',
                    err: err.message
                });
            }
        };
        
        const deleteUser = async (req, res) => {
            try {
                const data = await User.findByIdAndDelete(req.params.id);
                if (!data) {
                    res.status(404).json({
                        message: 'Could not find this user'
                    });
                    return;
                }
                res.status(200).json(data);
            } catch (err) {
                res.status(500).json({
                    message: 'Something went wrong when deleting this user!',
                    err: err.message
                });
            }
        };






module.exports = {
  registerNewUser, 
    loginUser,
    getUserData,
    getAllUsers,
    updateUser,
    deleteUser

}