// faculty routes here
const express = require('express')
const router = express.Router()

router.use((req, res)=>{
    res.json({
        message: 'this is faculty route'
    })
})

module.exports = router

