// functions for backend logic of admin role for every perticular route will be written here


// imports
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import adminModel from '../models/admin.model';
import studentModel from '../models/student.model';
import facultyModel from '../models/faculty.model';
import { S_KEYS, F_KEYS } from '../utility/util';

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

const student_lookup = async (req, res) => {
    try {
        let key = req.params.key;
        if(!key) return res.json({
            message: 'Please specify a key'
        })
        let student = studentModel.find({
            $or: [
                { [S_KEYS.NAME]: key },
                { [S_KEYS.EMAIL]: key },
                { [S_KEYS.ENROLLMENT_NO]: key }
            ]
        })
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}





