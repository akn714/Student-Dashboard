// faculty routes here
const express = require('express')
const router = express.Router()


// add routes here

/** PRIVATE ROUTES ()
 *  /faculty
 *  /faculty/get-data
 *  /faculty/updateInternMarks/:year/:branch/:sem
 * 
 *  /faculty/notify (this will notify to whole college)
 *  /faculty/notify/:year/:branch
 *  /faculty/notify/:branch/:year
 *  /faculty/notify/:branch
 *  /faculty/notify/:year
 * 
 *  /faculty/assignments
 * 
 *  /faculty/myClasses
 *  /faculty/myClasses/update
 * 
 */

/** PUBLIC ROUTES
 *  /faculty/:id
 *  /faculty/allFaculties/:branch (will list all faculties in a perticular branch)
 *  /
 */
// profile

router.use((req, res)=>{
    res.json({
        message: 'this is faculty route'
    })
})

module.exports = router

