// functions for backend logic of student role for every perticular route will be written here

// middleware to authorize student
// middleware to protect private routes from an unauthorized access
const authorize_student = (req, res, next) => {
    // if authorized -> next()
    // else response -> 'action not allowed'
}

// PRIVATE ROUTES
const profile = (req, res) => {
    // student profile
}

const secrets = (req, res) => {
    // secret info of student
}

const attendence_records = (req, res) => {
    // attendence records of student
}

const end_sem_result = (req, res) => {
    // end sem result of student 
}

const assignments = (req, res) => {
    // assignment records of student
}

const internal_marks_records = (req, res) => {
    // internal marks records of student
}

// PUBLIC ROUTES
const get_avg_cgpa_per_year = (req, res) => {
    // return average cgpa per year
}

const get_avg_cgpa_per_year_per_branch = (req, res) => {
    // return average cgpa per year per branch
}