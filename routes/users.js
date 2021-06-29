const express = require('express');
const router = express.Router();

// @route   POST api/users
// @desc    Resgister a user
// @access  Public
router.post('/', (req, res)=>{
    res.send('post route for users')
})

module.exports = router;