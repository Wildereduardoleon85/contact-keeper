const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   POST api/users
// @desc    Resgister a user
// @access  Public
router.post('/', 
    body('name', 'Please add a name').not().isEmpty(),
    body('email', 'You must type a valid Email').isEmail(),
    body('password', 'Password must be at least 4 characters').isLength({ min: 4}),

    (req, res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }

        res.send('user created!!')
    })

module.exports = router;