// functions for backend logic of student role for every perticular route will be written here


// imports
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const studentModel = require('../models/student.model')
const { ROLES, COOKIES, S_KEYS, F_KEYS, COLLEGE } = require('../utility/util')

dotenv.config();
let JWT_KEY = process.env.JWT_KEY

function is_student_authentic(token){
    try {
        let payload = jwt.verify(token, JWT_KEY);
        return payload.payload
    } catch (error) {
        console.log('error:', error)
        return false
    }
}

// middleware to authorize student
// middleware to protect private routes from an unauthorized access
const authorize_student = async (req, res, next) => {
    // if authorized -> next()
    // else responsed -> 'action not allowed'

    try {
        let token = req.cookies.login;
        let id = is_student_authentic(token);
        if(!id) return res.redirect('/auth/login');
        let student = await studentModel.findById(id);
        if(student){
            req.id = id;
            next();
        }
        else{
            return res.redirect('/auth/login');
            // return res.status(404).json({
            //     message: 'student not found'
            // })
        }
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

// PRIVATE ROUTES
const profile = async (req, res) => {
    // student profile
    // -> sending student data for there profile
    try {
        // let id = req.id;
        // let student = await studentModel.findById(id);
    
        // let data = {
        //     'name': student.name,
        //     'roll_no': student.roll_no,
        //     'branch': student.branch,
        //     'year': student.year,
        //     'profileImage': student.profileImage,
        //     'cgpa': student.cgpa
        // }
        res.sendFile('/home/pio/Desktop/coding/github/Student-Dashboard/backend/views/html/student/profile.html');
    
        // res.json({
        //     message: 'student data for student profile',
        //     data: data
        // })
    } catch (error) {
        res.status(500).json({
            message: 'some error occured',
            error: error
        })
    }
}

const getStudentData = async (req, res) => {
    try {
        let id = req.id;
        let student = await studentModel.findById(id);

        let data = {
            'name': student[S_KEYS.NAME],
            'email': student[S_KEYS.EMAIL],
            'dob': student[S_KEYS.DOB],
            'roll_no': student[S_KEYS.ROLL_NO],
            'branch': student[S_KEYS.BRANCH],
            'year': student[S_KEYS.YEAR],
            'profileImage': student[S_KEYS.PROFILE_IMAGE],
            'cgpa': student[S_KEYS.CGPA],
            'enrollment_no': student[S_KEYS.ENROLLMENT_NO]
        }

        res.json(data);
    } catch (error) {
        res.json({
            error: error
        })
    }
}

const secrets = async (req, res) => {
    // secret info of student

    // asking the student for his password and checking if the password is correct or not
    // if password correct -> send secrets
    // else -> send error message="can't fetch secrets"

    try {
        const id = req.id;
        const password = req.body.password;
    
        const student = await studentModel.findById(id);
        // implementing encryption and decryption
        let isValid = await bcrypt.compare(password, student.password);
        if(isValid){
            res.json({
                message: 'student secrets fetched',
                data: student.secrets
            })
        }
        else{
            res.status(401).json({
                message: "can't fetch secrets at the moment"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'some error occured',
            error: error
        })
    }
}

// implementation incomplete
const add_secret = async (req, res) => {
    try {
        const id = req.id;
        const password = req.body.password;
    
        const student = await studentModel.findById(id);
        // implementing encryption and decryption
        let isValid = await bcrypt.compare(password, student.password);
        if(isValid){
            let secrets = req.body.secrets;
            
            res.json({
                message: 'student secrets added',
                data: student.secrets
            })
        }
        else{
            res.status(401).json({
                message: "can't add secrets at the moment"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'some error occured',
            error: error
        })
    }
}

const attendence_records = async (req, res) => {
    // attendence records of student
    try {
        let id = req.id;
        let student = await studentModel.findById(id);

        // this will return percentage of attendence student had in his previous years (that's why -1)
        // later we will track attendence semester wise
        let attendence = student.attendence[student.year-1];
        if(attendence){
            res.json({
                message: 'attendence record fetched',
                data: attendence
            })
        }
        else{
            res.status(404).json({
                message: "attendence record not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'some error occurect',
            error: error
        })
    }
}

const end_sem_result = (req, res) => {
    // end sem result of student 

    // sending end sem result
    res.json({
        message: 'implementation left'
    })
}

const upload_end_sem_result = (req, res) => {
    res.json({
        message: 'implementation left'
    })
}

const assignments = (req, res) => {
    // assignment records of student
    res.json({
        message: 'implementation left'
    })
}

const internal_marks_records = (req, res) => {
    // internal marks records of student
    
    /*
    // Data Template
    {
        SUBJECT_CODE: {
            CT: { type: String, default: "" },
            AT: { type: String, default: "" },
            ATTENDENCE_MARKS: { type: String, default: "" },
            ASSIGNMENT_MARKS: { type: String, default: "" },
            TOTAL: { type: String, default: "" }
        }
    }
    */

    try {
        let id = req.id;
        let student = studentModel.findById(id);
        if(student){
            let internal_marks = student.internal_marks_records;
            return res.status(200).json({
                data: internal_marks
            })
        }
        else{
            return res.status(404).json({
                message: 'Student not found!'
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

// PUBLIC ROUTES (pending)
const get_avg_cgpa_per_year = async (req, res) => {
    try {
        // return average cgpa per year
        let year = req.params.year;
        console.log("year", 2);
        let student = await studentModel.find({[S_KEYS.YEAR]: year}, S_KEYS.CGPA);
        // let student = await studentModel.find({[S_KEYS.YEAR]: year}, S_KEYS.NAME);
        if(student){
            return res.status(200).json({
                message: student
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

// (pending) (mearging both function -> this fucntion + above function)
const get_avg_cgpa_per_year_per_branch = (req, res) => {
    // return average cgpa per year per branch
    let year = req.params.year;
    let branch = req.params.branch;

    res.json({
        message: 'implementation left'
    })
}

// updating student details -> accepts objects of fields -> eg. {name: 'asdfad', roll_no: 2343}
const updateStudentDetails = async (req, res) => {
    try {
        let id = req.id;
        let student = await studentModel.findById(id);
        
        let data = req.body;
        for(key in data){
            value = data[key];
            if(value!='' && value!=null && value!=undefined) student[key] = data[key];
        }
        await student.save();

        res.json({
            message: "Student data updated successfully!"
        })
    } catch (error) {
        res.json({
            message: "Can not update the data at the moment!"
        })
    }
}

const getStudents = async (req, res)=>{
    try {
        let student = await studentModel.find({}, `${S_KEYS.NAME} ${S_KEYS.ROLL_NO} ${S_KEYS.BRANCH} ${S_KEYS.YEAR}`);
        if(student){
            return res.status(200).json({
                data: student
            })
        }
        else{
            return res.json({
                message: 'No student found!'
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

module.exports = {
    'authorize_student': authorize_student,
    'is_student_authentic': is_student_authentic,
    'profile': profile,
    'getStudentData': getStudentData,
    'secrets': secrets,
    'add_secret': add_secret,
    'attendence_records': attendence_records,
    'end_sem_result': end_sem_result,
    'upload_end_sem_result': upload_end_sem_result,
    'assignments': assignments,
    'internal_marks_records': internal_marks_records,
    'get_avg_cgpa_per_year': get_avg_cgpa_per_year,
    'get_avg_cgpa_per_year_per_branch': get_avg_cgpa_per_year_per_branch,
    'updateStudentDetails': updateStudentDetails,
    'getStudents': getStudents
}
