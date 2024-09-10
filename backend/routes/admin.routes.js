// admin route here

import express from 'express'
import admin_controller from '../controllers/admin.controller'

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

router.post('/student_add', admin_controller.student_add);
router.post('/student_update', admin_controller.student_update);
router.post('/student_lookup', admin_controller.student_lookup);
router.post('/student_delete', admin_controller.student_delete);

router.post('/faculty_add', admin_controller.faculty_add);
router.post('/faculty_update', admin_controller.faculty_update);
router.post('/faculty_lookup', admin_controller.faculty_lookup);
router.post('/faculty_delete', admin_controller.faculty_delete);

module.exports = router

