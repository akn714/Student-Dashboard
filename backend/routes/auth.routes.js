// auth routes here

// * /signin or /login
// * /signup or /register (student and faculty seperately)

const express = require('express')
const router = express.Router()

router.use((req, res)=>{
    res.json({
        message: 'this is auth route'
    })
})

module.exports = router

