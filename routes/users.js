const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

// @route   POST api/users
// @desc    Resgister a user
// @access  Public
router.post('/', 
    body('name', 'Please add a name').not().isEmpty(),
    body('email', 'You must type a valid Email').isEmail(),
    body('password', 'Password must be at least 4 characters').isLength({ min: 6}),

    async (req, res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }

        const {name, email, password} = req.body;
        try {
            let user = await User.findOne({email: email});
            if (user){
                return res.status(400).json({msg: 'User alredy exists'})
            }    
            
            user = new User({
                name: name,
                email: email,
                password: password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 360000
            }, (err, token)=>{
                if(err) throw err;
                res.json({token});
            });

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    })

module.exports = router;