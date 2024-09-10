// auth routes here

// * /signin or /login
// * /signup or /register (student and faculty seperately)

import express from 'express'
import authController from '../controllers/auth.controller'

const router = express.Router()

router.get('/logout', authController.logout);

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

