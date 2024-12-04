// imports
const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const log = require('./logger');
const { ROLES, COOKIES, S_KEYS, F_KEYS, COLLEGE } = require('./utility/util')

// mini apps
const auth_routes = require('./routes/auth.routes');
const student_routes = require('./routes/student.routes');
const faculty_routes = require('./routes/faculty.routes');
const admin_routes = require('./routes/admin.routes');

const { is_student_authentic } = require('./controllers/student.controller');
const { is_faculty_authentic } = require('./controllers/faculty.controller');

// const app = express();

// middlewares
app.use(express.urlencoded());    // to access data send through html forms
app.use(cookieParser())
app.use(express.static('public'));    // static files middleware
app.use(log)
app.set('views', __dirname + '/views');

// app.set('view engine', 'ejs');
// app.set('views', 'views');

// routes for mini apps
app.use('/auth', auth_routes);
app.use('/admin', admin_routes);
app.use('/student', student_routes);
app.use('/faculty', faculty_routes);

app.get('/unauthorised', (req, res)=>{
    // returning a page which displays '401 Unauthorised Accesss!' and below will be a buthon to redirect to login page
    // res.cookie('login', '', { expires: new Date(0), httpOnly: true });
    // res.cookie('role', '', { expires: new Date(0), httpOnly: true });
    res.clearCookie(COOKIES.LOGIN);
    res.clearCookie(COOKIES.ROLE);
    // res.status(401).json({
    //     message: '401 Unauthorised Access!'
    // })
    return res.status(401).sendFile(__dirname+'/views/html/unauthorised.html');
})


app.get('/', (req, res)=>{
    // home route stuff
    // res.json({
    //     message: 'home page'
    // })

    // WELCOME PAGE FOR STUDENT DASHBOARD WITH A LOGIN PAGE

    // MAKING MIDDLEWARE FOR REDIRECTING USER'S AS PER THERE ROLE

    try {        
        // if not logged in -> redirect to login page
        
        // set these keys in cookies in browser duing login and signup
        let token, role;
        
        if(!req.cookies.login || !req.cookies.role){
            // redirect to login page
            // return res.redirect('/auth/login');

            return res.sendFile(__dirname + '/views/html/temporary.html');
        }
        else{
            // fetching token and role from browser cookies
            token = req.cookies.login;
            role = req.cookies.role;
        }
        /* -------- if role == 'student' -> authorize person -> redirect to /student -------- */
        if(role==ROLES.STUDENT && is_student_authentic(token)){
            res.redirect('/student');
        }
        /* -------- if role == 'faculty' -> authorize person -> redirect to /faculty -------- */
        else if(role==ROLES.FACULTY && is_faculty_authentic(token)){
            res.redirect('/faculty');
        }
        /* --------   if role == 'admin' -> authorize person -> redirect to /admin   -------- */
        else if(role==ROLES.ADMIN && is_admin_authentic(token)){
            res.redirect('/admin');
        }
        else{
            // redirecting to unauthorised page
            res.redirect('/unauthorised'); // making unauthorised page
            // res.status(404).json({
            //     message: 'Nothing found!'
            // })
        }
        
        // * check role from cookies
        // * after getting role, check for proper authenticity
        // * authorizing person using cookies
    } catch (error) {
        console.log('error:', error);
        return res.status(500).json({
            error: error
        })
    }

})

// 404 page
app.use((req, res)=>{
    // res.status(404).render('404', { title: '404 NOT FOUND' })
    res.status(404).sendFile(__dirname+'/views/html/404.html');
})

app.listen(3000, ()=>{
    console.log('[+] App running on http://localhost:3000');
})
