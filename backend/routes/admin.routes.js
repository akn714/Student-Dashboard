// admin route here

const express = require('express')
const router = express.Router()


// add routes here


router.use((req, res)=>{
    res.json({
        message: 'this is admin route'
    })
})

module.exports = router

