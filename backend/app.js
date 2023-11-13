const express = require('express');

// routes
const student_routes = require('./routes/student_routes')
const faculty_routes = require('./routes/faculty_routes')
const admin_routes = require('./routes/admin_routes')

const app = express();

// to access data send through html forms
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs');

app.set('views', 'views');

// routes
app.use('/admin', admin_routes)
app.use('/student', student_routes)
app.use('/faculty', faculty_routes)

// static files middleware
app.use(express.static('public'))

app.get('/', (req, res)=>{
    // home route stuff

    // if not logged in -> redirect to login page

    // Note: check role from cookies
    // Note: after getting role, check for proper authenticity

    // if role == 'admin' -> redirect to /admin
    // if role == 'student' -> redirect to /student
    // if role == 'faculty' -> redirect to /faculty
})

// 404 page
app.use((req, res)=>{
    res.status(404).render('404', { title: '404 NOT FOUND' })
})

app.listen(3000, ()=>{
    console.log('app running on http://localhost:3000')
})