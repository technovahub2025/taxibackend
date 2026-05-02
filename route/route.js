const express = require('express');
const router = express.Router();
const { registerUser } = require('../controller/registercontroller');
const { loginuser } = require('../controller/logincontroller');
const { forgotPassword } = require('../controller/forgotpasswordcontroller');


router.post('/register', registerUser);

router.post('/login',loginuser)

router.post('/forgot-password', forgotPassword)

module.exports = router;
