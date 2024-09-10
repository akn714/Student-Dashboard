// functions for backend logic of faculty role for every perticular route will be written here

// imports
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import studentModel from '../models/student.model';
import facultyModel from '../models/faculty.model';

dotenv.config();
let JWT_KEY = process.env.JWT_KEY;

// utlity functions
function is_faculty_authentic(token){
    try {
        let payload = jwt.verify(token, JWT_KEY);
        return payload;
    }
    catch (error) {
        console.log('error:', error);
        return false;
    }
}

// middleware to authorize faculty
const authorize_faculty = async (req, res, next) => {
    try {
        let token = req.cookies.login;
        let id = is_faculty_authentic(token);
        // todo: set unauthorized access status code
        if(!id) return res.redirect('/auth/login');
        let faculty = await facultyModel.findById(id);
        if(faculty){
            req.id = id;
            next();
        }
        else{
            return res.status(404).redirect('/auth/login');
        }
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}


/* FACULTY CONTROLLERS */

/* FACULTY CONTROLLERS CONNECTING TO STUDENT DB */


