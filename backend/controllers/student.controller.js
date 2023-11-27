// functions for backend logic of student role for every perticular route will be written here


// imports
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const studentModel = require('../models/student.model')

dotenv.config();
let JWT_KEY = process.env.JWT_KEY



// middleware to authorize student
// middleware to protect private routes from an unauthorized access
const authorize_student = async (req, res, next) => {
    // if authorized -> next()
    // else response -> 'action not allowed'

    try {
        let token = req.cookies.login;
        let payload = jwt.verify(token, JWT_KEY);
        let id = payload.payload;
    
        let student = await studentModel.findById(id);
        if(student){
            req.id = id;
            next();
        }
        else{
            res.status(404).json({
                message: 'student not found'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

// PRIVATE ROUTES
const profile = async (req, res) => {
    // student profile
    // -> sending student data for there profile
    try {
        let id = req.id;
        let student = await studentModel.findById(id);
    
        let data = {
            'name': student.name,
            'roll_no': student.roll_no,
            'branch': student.branch,
            'year': student.year,
            'profileImage': student.profileImage,
            'cgpa': student.cgpa
        }
    
        res.json({
            message: 'student data for student profile',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: 'some error occured',
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
        if(password==student.passowrd){
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

const add_secret = (req, res) => {
    res.json({
        message: 'implementation left'
    })
}

const attendence_records = async (req, res) => {
    // attendence records of student
    try {
        let id = req.id;
        let student = await studentModel.findById(id);

        let attendence = student.attendence[student.year]
        if(attendence){
            res.json({
                message: 'attendence record fetched',
                data: attendence
            })
        }
        else{
            res.json({
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
    res.json({
        message: 'implementation left'
    })
}

// PUBLIC ROUTES
const get_avg_cgpa_per_year = (req, res) => {
    // return average cgpa per year
    let year = req.params.year;

    res.json({
        message: 'implementation left'
    })
}

const get_avg_cgpa_per_year_per_branch = (req, res) => {
    // return average cgpa per year per branch
    let year = req.params.year;
    let branch = req.params.branch;
    
    res.json({
        message: 'implementation left'
    })
}

module.exports = {
    'authorize_student': authorize_student,
    'profile': profile,
    'secrets': secrets,
    'add_secret': add_secret,
    'attendence_records': attendence_records,
    'end_sem_result': end_sem_result,
    'upload_end_sem_result': upload_end_sem_result,
    'assignments': assignments,
    'internal_marks_records': internal_marks_records,
    'get_avg_cgpa_per_year': get_avg_cgpa_per_year,
    'get_avg_cgpa_per_year_per_branch': get_avg_cgpa_per_year_per_branch
}