// functions for backend logic of admin role for every perticular route will be written here


// imports
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import adminModel from '../models/admin.model';
import studentModel from '../models/student.model';
import facultyModel from '../models/faculty.model';
import { S_KEYS, F_KEYS, ROLES } from '../utility/util';

dotenv.config();
let JWT_KEY = process.env.JWT_KEY

function is_admin_authentic(token){
    try {
        let payload = jwt.verify(token, JWT_KEY);
        return payload.payload
    } catch (error) {
        console.log('error:', error)
        return false
    }
}

// STUDENT
// middleware to authorize student
// middleware to protect private routes from an unauthorized access
const authorize_admin = async (req, res, next) => {
    // if authorized -> next()
    // else responsed -> 'action not allowed'

    try {
        let token = req.cookies.login;
        let id = is_admin_authentic(token);
        if(!id) return res.redirect('/auth/login');
        let admin = await adminModel.findById(id);
        if(admin){
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

const student_add = async (req, res) => {
    try {
        let role = ROLES.STUDENT;
        console.log('[+]', role);
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
    } catch (error) {
        return res.json({
            error: error
        })   
    }
}

const student_update = async (req, res) => {
    try {
        // send id of the student in the form
        let id = req.body.id;
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
        return res.json({
            error: error
        })
    }
}

const student_lookup = async (req, res) => {
    try {
        let key = req.params.key;
        if(!key) return res.json({
            message: 'Please specify a key'
        })
        let student = studentModel.find({
            $or: [
                { [S_KEYS.NAME]: key },
                { [S_KEYS.ROLL_NO]: key },
                { [S_KEYS.EMAIL]: key },
                { [S_KEYS.ENROLLMENT_NO]: key }
            ]
        })
        if(student) return res.json({
            student: student
        })
        else return res.json({
            message: 'student not found'
        })
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}


const student_delete = async (req, res) => {
    try {
        let key = req.params.key;
        if(!key) return res.json({
            message: 'Please specify a key'
        })
        let deleteItem = studentModel.deleteOne({
            $or: [
                { [S_KEYS.ROLL_NO]: key },
                { [S_KEYS.EMAIL]: key },
                { [S_KEYS.ENROLLMENT_NO]: key }
            ]
        })
        if(deleteItem===1) return res.json({
            message: 'student data delete successfully'
        })
        else return res.json({
            message: 'student not found'
        })
        // let student = studentModel.find({
        //     $or: [
        //         { [S_KEYS.NAME]: key },
        //         { [S_KEYS.EMAIL]: key },
        //         { [S_KEYS.ENROLLMENT_NO]: key }
        //     ]
        // })
        // if(student){
        // }
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

// FACULTY
const faculty_add = async (req, res) => {

}

const faculty_update = async (req, res) => {

}

const faculty_lookup = async (req, res) => {

}

const faculty_delete = async (req, res) => {
    
}

module.exports = {
    'student_add': student_add, 
    'student_update': student_update,
    'student_lookup': student_lookup,
    'student_delete': student_delete,
    'faculty_add': faculty_add, 
    'faculty_update': faculty_update,
    'faculty_lookup': faculty_lookup,
    'faculty_delete': faculty_delete
}




