const express = require('express');
const app = express();

const log = require('./logger');

// mini apps
const auth_routes = require('./routes/auth.routes');
const student_routes = require('./routes/student.routes');
const faculty_routes = require('./routes/faculty.routes');
const admin_routes = require('./routes/admin.routes');


// middlewares
app.use(express.urlencoded({ extended: true }));    // to access data send through html forms
app.use(express.static('public'));    // static files middleware
app.use(log)

// app.set('view engine', 'ejs');
// app.set('views', 'views');

// routes for mini apps
app.use('/auth', auth_routes);
app.use('/admin', admin_routes);
app.use('/student', student_routes);
app.use('/faculty', faculty_routes);


app.get('/', (req, res)=>{
    // home route stuff
    res.json({
        message: 'home page'
    })

    // WELCOME PAGE FOR STUDENT DASHBOARD WITH A LOGIN PAGE

    // MAKING MIDDLEWARE FOR REDIRECTING USER'S AS PER THERE ROLE

    // if not logged in -> redirect to login page
    
    // if role == 'admin' -> authorize person -> redirect to /admin
    // if role == 'student' -> authorize person -> redirect to /student
    // if role == 'faculty' -> authorize person -> redirect to /faculty
    
    // * check role from cookies
    // * after getting role, check for proper authenticity
    // * authorizing person using cookies
})

// 404 page
app.use((req, res)=>{
    res.status(404).render('404', { title: '404 NOT FOUND' })
})

app.listen(3000, ()=>{
    console.log('app running on http://localhost:3000');
})