// student routes here

// Routes:

// * PRIVATE ROUTES (id -> student id (roll number of student as it is unique))
//      * /:id
//      * /:id/profile
//      * /:id/secrets
//      * /:id/attendence-records
//      * /:id/end-sem-result
//      * /:id/assignments
//      * /:id/internal-marks-records

// * PUBLIC ROUTES
//      * /get-avg-cgpa/[year]              -> returns avg. cgpa per year
//      * /get-avg-cgpa/[year]/[branch]     -> returns avg. cgpa per branch in a perticular year

const express = requier('express')
const router = express.Router()

const student_controller = require('../controllers/student.controller')

router.get('/', (req, res)=>{
    // redirect to student profile
    // redirect to /:id/profile
    // id -> student id
})

// private routes
router.get('/:id', student_controller.profile)
router.get('/:id/secrets', student_controller.secrets)
router.get('/:id/attendence-records', student_controller.attendence_records)
router.get('/:id/end-sem-result', student_controller.end_sem_result)
router.get('/:id/assignments', student_controller.assignments)
router.get('/:id/internal-marks-records', student_controller.internal_marks_records)

// public routes
router.get('/get-avg-cgpa/:year', student_controller.get_avg_cgpa_per_year)
router.get('/get-avg-cgpa/:year/:branch', student_controller.get_avg_cgpa_per_year_per_branch)

module.exports = router


