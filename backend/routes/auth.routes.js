// auth routes here

// * /signin or /login
// * /signup or /register (student and faculty seperately)

const express = require('express')

const authController = require('../controllers/auth.controller')

const router = express.Router()


// add routes here
router.get('/signup', authController.get_signup_page);
router.get('/login', authController.get_login_page);

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.use((req, res)=>{
    res.json({
        message: 'this is auth route'
    })
})

module.exports = router

