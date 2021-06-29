const express = require('express');
const router = express.Router();

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', (req, res)=>{
    res.send('get route for log in')
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Plubic
router.post('/', (req, res)=>{
    res.send('log in user')
});

module.exports = router;