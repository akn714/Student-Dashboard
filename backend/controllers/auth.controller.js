// functions for backend logic of auth

// saving the role of the user in cookies
// and attaching the role and id of user in request object
// in the authorize middleware

// imports
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

const studentModel = require('../models/student.model');
const facultyModel = require('../models/faculty.model');
const sendMail = require('../utility/nodemailer')

dotenv.config();
let JWT_KEY = process.env.JWT_KEY;

module.exports.get_signup_page = function get_signup_page(req, res){
    if(req.cookies.login){
        return res.send({
            message: 'Ongoing session detecetd!'
        });
    }
    // returning signup page
    res.sendFile('/home/pio/Desktop/coding/github/Student-Dashboard/backend/views/html/signup.html');
}

module.exports.get_login_page = function get_login_page(req, res){
    if(req.cookies.login){
        return res.send({
            message: 'User Already Logged In'
        });
    }
    // returning login page
    res.sendFile('/home/pio/Desktop/coding/github/Student-Dashboard/backend/views/html/login.html');
}

function validateUserData(req, res, role, data){
    if(role=='student'){
        if(
            data.name==undefined ||
            data.email==undefined ||
            data.roll_no==undefined ||
            data.branch==undefined ||
            data.year==undefined ||
            data.password==undefined ||
            data.confirmPassword==undefined
        ) return res.json({
            message: 'An error occured!'
        })
    }
    else if(roll=='faculty'){
        if(
            data.name==undefined ||
            data.email==undefined ||
            data.password==undefined ||
            data.confirmPassword==undefined
        ) return res.json({
            message: 'An error occured!'
        })
    }
}

module.exports.signup = async function signup(req, res){
    try {
        let role = req.body.role;
        console.log('[+]', role);
        if(role=='student'){
            let data = {
                'name': req.body.name,
                'email': req.body.email,
                'roll_no': req.body.roll_no,
                'branch': req.body.branch,
                'year': req.body.year,
                'password': req.body.password,
                'confirmPassword': req.body.confirmPassword
            }
            validateUserData(req, res, role, data);
            let student;
            try {
                student = await studentModel.create(data);
            } catch (error) {
                console.log('[+]', 'error:', error);
            }
            if(student){
                let uid = student['_id'];
                let token = jwt.sign({ payload: uid }, JWT_KEY);
                console.log('[+]', uid, token);
                res.cookie('login', token, { maxAge: 24 * 60 * 60 * 1000, secure: true, httpOnly: true });
                res.cookie('role', 'student', { maxAge: 24 * 60 * 60 * 1000, secure: true, httpOnly: true });
    
                sendMail("signup", student);
    
                return res.json({
                    message: 'student signed up',
                    data: student
                })
            }
        }
        else if(role=='faculty'){
            let data = {
                'name': req.body.name,
                'email': req.body.email,
                'password': req.body.password,
                'confirmPassword': req.body.confirmPassword
            }
            validateUserData(req, res, role, data);
            
            let faculty = await facultyModel.create(data);
            if(faculty){
                let uid = faculty['_id'];
                let token = jwt.sign({ payload: uid }, JWT_KEY);
                console.log('[+]', uid, token);
                res.cookie('login', token, { maxAge: 24 * 60 * 60 * 1000, secure: true, httpOnly: true });
                res.cookie('role', 'faculty', { maxAge: 24 * 60 * 60 * 1000, secure: true, httpOnly: true });
    
                sendMail("signup", faculty);
    
                return res.json({
                    message: 'faculty signed up',
                    data: faculty
                })
            }
        }
        else{
            return res.json({
                message: 'Invalid role!'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

module.exports.login = async function login(req, res){
    try {
        if(req.cookies.login){
            return res.send({
                message: 'User Already Logged In'
            });
        }
        
        let role = req.body.role;

        if(role=='student'){
            let student = await studentModel.findOne({ 'roll_no': req.body.roll_no });
            
            
            if(!student) return res.status(404).json({
                message: 'Student not found'
            });
            
            let isValid = await bcrypt.compare(req.body.password, student.password);
            if(isValid){
                let uid = student['_id'];
                let token = jwt.sign({ payload: uid }, JWT_KEY);
                console.log('[+]', uid, token);
                res.cookie('login', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
                res.cookie('role', 'student', { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

                return res.redirect('/');
                // return res.json({
                //     message: 'student has logged in',
                //     student_details: {
                //         'name': student.name,
                //         'email': student.email,
                //         'roll_no': student.roll_no,
                //         'branch': student.branch,
                //         'year': student.year
                //     }
                // });
            }
            else{
                return res.status(401).json({
                    message: 'Invalid credentials!'
                });
            }
        }
        else if(role=='faculty'){
            let faculty = await facultyModel.findOne({ 'email': req.body.email });
            
            if(!faculty) return res.status(404).json({
                message: 'Faculty not found'
            });
            
            let isValid = await bcrypt.compare(req.body.password, faculty.password);
            if(isValid){
                let uid = faculty['_id'];
                let token = jwt.sign({ payload: uid }, JWT_KEY);
                console.log('[+]', uid, token);
                res.cookie('login', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
                res.cookie('role', 'faculty', { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

                return res.json({
                    message: 'faculty has logged in',
                    faculty_details: {
                        'name': faculty.name,
                        'email': faculty.email
                    }
                });
            }
            else{
                return res.status(401).json({
                    message: 'Invalid credentials!'
                });
            }
        }
        else if(role=='admin'){
            let admin = await adminModel.findOne({ 'email': req.body.email });
            
            if(!faculty) return res.status(404).json({
                message: 'Admin not found'
            });
            
            let isValid = await bcrypt.compare(req.body.password, admin.password);
            if(isValid){
                let uid = admin['_id'];
                let token = jwt.sign({ payload: uid }, JWT_KEY);
                console.log('[+]', uid, token);
                res.cookie('login', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
                res.cookie('role', 'admin', { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

                return res.json({
                    message: 'admin has logged in',
                    faculty_details: {
                        'name': admin.name,
                        'email': admin.email
                    }
                });
            }
            else{
                return res.status(401).json({
                    message: 'Invalid credentials!'
                });
            }
        }
        else{
            return res.json({
                message: 'Invalid Role!'
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

module.exports.logout = (req, res) => {
    try {
        if(req.cookies.login){
            res.clearCookie('login');
            res.clearCookie('role');

            res.redirect('/')
            // res.json({
                //     message: "User logged out!"
                // })
        }
        else{
            res.redirect('/')
        }
    } catch (error) {
        res.json({
            error: error
        })
    }
}




