// student routes here

// TODO : adding middleware to authorize users

// Routes:

/** PRIVATE ROUTES (id -> student id (roll number of student as it is unique))
 *  /:id
 *  /:id/profile
 *  /:id/secrets
 *  /:id/attendence-records
 *  /:id/end-sem-result
 *  /:id/assignments
 *  /:id/internal-marks-records
 */

/** PUBLIC ROUTES
 *  /get-avg-cgpa/[year]              -> returns avg. cgpa per year
 *  /get-avg-cgpa/[year]/[branch]     -> returns avg. cgpa per branch in a perticular year
 *  /get-students
 * 
 */

import express from 'express';
import student_controller from '../controllers/student.controller';
import studentModel from '../models/student.model';

const router = express.Router();

// router.get('/', (req, res)=>{
//     // redirect to student profile
//     // redirect to /:id/profile
//     // id -> student id
// })

// public routes
router.get('/get-avg-cgpa/:year', student_controller.get_avg_cgpa_per_year);
router.get('/get-avg-cgpa/:year/:branch', student_controller.get_avg_cgpa_per_year_per_branch);
router.get('/get-students', student_controller.getStudents);
// public profile of student, anyone can view (used when searching a student)
// router.get('/student/:roll_no', student_controller.getStudentPublicProfile); // implementing getStudentPublicProfile function

// private routes
router.use(student_controller.authorize_student);


router.get('/', student_controller.profile);
router.get('/get-data', student_controller.getStudentData);
router.get('/secrets', student_controller.secrets);
router.get('/attendence-records', student_controller.attendence_records);
router.get('/end-sem-result', student_controller.end_sem_result);
router.get('/assignments', student_controller.assignments);
router.get('/internal-marks-records', student_controller.internal_marks_records);

router.post('/secrets/add', student_controller.add_secret);
router.post('/end-sem-result/upload', student_controller.upload_end_sem_result);

router.post('/updateStudentDetails', student_controller.updateStudentDetails);

module.exports = router;


