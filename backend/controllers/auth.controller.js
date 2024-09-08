// functions for backend logic of auth

// saving the role of the user in cookies
// and attaching the role and id of user in request object
// in the authorize middleware

// imports
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const path = require('path');

const studentModel = require('../models/student.model');
const facultyModel = require('../models/faculty.model');
const sendMail = require('../utility/nodemailer');
const { ROLES, COOKIES, S_KEYS, F_KEYS, COLLEGE } = require('../utility/util')
const log = require('../logger');

dotenv.config();
let JWT_KEY = process.env.JWT_KEY;

module.exports.get_signup_page = function get_signup_page(req, res){
    if(req.cookies.login){
        return res.send({
            message: 'Ongoing session detecetd!'
        });
    }
    // returning signup page
    res.sendFile(path.join(__dirname + '/../views/html/signup.html'));
}

module.exports.get_login_page = function get_login_page(req, res){
    if(req.cookies.login){
        return res.send({
            message: 'User Already Logged In'
        });
    }
    // returning login page
    res.sendFile(path.join(__dirname + '/../views/html/login.html'));
}

async function validateUserData(role, data){
    try{
        if(role==ROLES.STUDENT){
            if(
                data.name==undefined ||
                data.email==undefined ||
                data.roll_no==undefined ||
                data.branch==undefined ||
                data.year==undefined ||
                data.password==undefined ||
                data.confirmPassword==undefined
            ) return [false, 'An error occured!'];
            else if(data.email.slice(-14)!=COLLEGE.EMAIL) return [false, `Please signup with your institute email (consisting "@${COLLEGE.EMAIL}")`];
            else if(data.roll_no.length!=13 || data.roll_no.slice(3, 6)!=COLLEGE.CODE) return [false, 'Please enter a valid Roll No.']
            else{
                let student = await studentModel.findOne({
                    $or: [
                        { [S_KEYS.ROLL_NO]: data.roll_no },
                        { [S_KEYS.EMAIL]: data.email}
                    ]
                });
                if(student){
                    return [false, 'student already exists!'];
                }
                return [true];
            }
        }
        else if(roll==ROLES.FACULTY){
            if(
                data.name==undefined ||
                data.email==undefined ||
                data.password==undefined ||
                data.confirmPassword==undefined
            ) return [false, 'An error occured!'];
            let faculty = await facultyModel.findOne({
                $or: [
                    // todo: F_KEYS
                    { [F_KEYS.EMAIL]: data.email}
                ]
            });
            if(faculty){
                return [false, 'faculty already exists!'];
            }
            return [true];
        }
    }
    catch (error) {
        console.log('[-]', error);
        return [false, error];
    }
}

module.exports.signup = async function signup(req, res){
    try {
        let role = req.body.role;
        console.log('[+]', role);
        if(role==ROLES.STUDENT){
            let data = {
                [S_KEYS.NAME]: req.body.name,
                [S_KEYS.EMAIL]: req.body.email,
                [S_KEYS.DOB]: req.body.dob,
                [S_KEYS.ROLL_NO]: req.body.roll_no,
                [S_KEYS.BRANCH]: req.body.branch,
                [S_KEYS.YEAR]: req.body.year,
                [S_KEYS.PASSWORD]: req.body.password,
                [S_KEYS.CONFIRM_PASSWORD]: req.body.confirmPassword
            }
            let isUserValid = await validateUserData(role, data);
            if(isUserValid[0]){
                let student;
                try {
                    student = await studentModel.create(data);
                } catch (error) {
                    console.log('[+]', 'error:', error);
                }
                if(student){
                    let uid = student['_id'];
                    let token = jwt.sign({ payload: uid }, JWT_KEY);
                    // console.log('[+]', uid, token);
                    res.cookie(COOKIES.LOGIN, token, { maxAge: 24 * 60 * 60 * 1000, secure: true, httpOnly: true });
                    // todo: 'student' -> ROLL.STUDENT
                    res.cookie(COOKIES.ROLE, ROLES.STUDENT, { maxAge: 24 * 60 * 60 * 1000, secure: true, httpOnly: true });
                    
                    try{
                        await sendMail("signup", student);
                    }
                    catch (error){
                        console.log('[-] unable to send mail:', error);
                    }
        
                    return res.json({
                        message: 'student signed up',
                        data: student
                    })
                }
            }
            else{
                return res.json({
                    message: isUserValid[1]
                })
            }
        }
        else if(role==ROLES.FACULTY){
            // todo
            // let data = {
            //     [F_KEYS.NAME]: req.body.name,
            //     [F_KEYS.EMAIL]: req.body.email,
            //     [F_KEYS.PASSWORD]: req.body.password,
            //     [F_KEYS.CONFIRM_PASSWORD]: req.body.confirmPassword
            // }
            let data = {
                [F_KEYS.NAME]: req.body.name,
                [F_KEYS.EMAIL]: req.body.email,
                [F_KEYS.PASSWORD]: req.body.password,
                [F_KEYS.CONFIRM_PASSWORD]: req.body.confirmPassword
            }
            let isUserValid = await validateUserData(role, data);

            if(isUserValid[0]){
                let faculty = await facultyModel.create(data);
                if(faculty){
                    let uid = faculty['_id'];
                    let token = jwt.sign({ payload: uid }, JWT_KEY);
                    console.log('[+]', uid, token);
                    res.cookie(COOKIES.LOGIN, token, { maxAge: 24 * 60 * 60 * 1000, secure: true, httpOnly: true });
                    // todo: 'faculty' -> [ROLE.FACULTY]
                    res.cookie(COOKIES.ROLE, ROLES.FACULTY, { maxAge: 24 * 60 * 60 * 1000, secure: true, httpOnly: true });
        
                    try{
                        sendMail("signup", faculty);
                    }
                    catch (e) {
                        console.log(e);
                    }
        
                    return res.json({
                        message: 'faculty signed up',
                        data: faculty
                    })
                }
            }
            else{
                return res.json({
                    message: isUserValid[1]
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

        if(role==ROLES.STUDENT){
            let student = await studentModel.findOne({ [S_KEYS.ROLL_NO]: req.body.roll_no });
            
            
            if(!student) return res.status(404).json({
                message: 'Student not found'
            });
            
            let isValid = await bcrypt.compare(req.body.password, student.password);
            if(isValid){
                let uid = student['_id'];
                let token = jwt.sign({ payload: uid }, JWT_KEY);
                // console.log('[+]', uid, token);
                // todo: COOKIES
                res.cookie(COOKIES.LOGIN, token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
                res.cookie(COOKIES.ROLE, ROLES.STUDENT, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

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
        else if(role==ROLES.FACULTY){
            let faculty = await facultyModel.findOne({ [F_KEYS.EMAIL]: req.body.email });
            
            if(!faculty) return res.status(404).json({
                message: 'Faculty not found'
            });
            
            let isValid = await bcrypt.compare(req.body.password, faculty.password);
            if(isValid){
                let uid = faculty['_id'];
                let token = jwt.sign({ payload: uid }, JWT_KEY);
                console.log('[+]', uid, token);
                // todo: COOKIES.LOGIN
                res.cookie(COOKIES.LOGIN, token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
                res.cookie(COOKIES.ROLE, ROLES.FACULTY, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

                return res.json({
                    message: 'faculty has logged in',
                    faculty_details: {
                        // todo: using F_KEYS
                        [F_KEYS.NAME]: faculty.name,
                        [F_KEYS.EMAIL]: faculty.email
                    }
                });
            }
            else{
                return res.status(401).json({
                    message: 'Invalid credentials!'
                });
            }
        }
        else if(role==ROLES.ADMIN){
            // todo
            let admin = await adminModel.findOne({ 'email': req.body.email });
            
            if(!faculty) return res.status(404).json({
                message: 'Admin not found'
            });
            
            let isValid = await bcrypt.compare(req.body.password, admin.password);
            if(isValid){
                let uid = admin['_id'];
                let token = jwt.sign({ payload: uid }, JWT_KEY);
                console.log('[+]', uid, token);
                // todo: COOKIES.LOGIN
                res.cookie(COOKIES.LOGIN, token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
                res.cookie(COOKIES.ROLE, ROLES.ADMIN, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

                return res.json({
                    message: 'admin has logged in',
                    faculty_details: {
                        // todo: using F_KEYS
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
            // todo: 'login' -> COOKIES.LOGIN
            res.clearCookie(COOKIES.LOGIN);
            res.clearCookie(COOKIES.ROLE);

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




