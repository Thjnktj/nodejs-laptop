const express = require('express')

//call controller
const signupController = require('../controllers/auth/sign-up')
const signinController = require('../controllers/auth/sign-in')

const router = express.Router();

//router sign-in page
router.get('/sign-in', signinController.index)

router.post('/sign-in', signinController.postSignin)

//roter sign-up page
router.get('/sign-up', signupController.index)

router.post('/sign-up', signupController.postSignup)

module.exports = router;