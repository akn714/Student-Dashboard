// admin route here

const express = require('express')
const router = express.Router()


// add routes here
/**
 * ROUTES
 *  /admin/student/add/:data
 *  /admin/student/update/:data
 *  /admin/student/lookup
 *  /admin/student/delete/:key (key -> roll_no / email / enrollment_no)
 * 
 *  /admin/faculty/add/:data
 *  /admin/faculty/update/:data
 *  /admin/faculty/lookup
 *  /admin/faculty/delete/:key (key -> email)
 * 
 */


router.use((req, res)=>{
    res.json({
        message: 'this is admin route'
    })
})

module.exports = router

