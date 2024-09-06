// faculty routes here
const express = require('express')
const router = express.Router()


// add routes here

/**
 * PRIVATE
 */


router.use((req, res)=>{
    res.json({
        message: 'this is faculty route'
    })
})

module.exports = router

