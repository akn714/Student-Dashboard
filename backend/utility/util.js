/**
 * merging these 3 function in one...
 * - is_admin_authentic
 * - is_student_authentic
 * - is_faculty_authentic
 * 
 * ...and
 * - authorize_admin
 * - authorize_student
 * - authorize_faculty
 * 
 */

let ROLES = {
    STUDENT: "student",
    FACULTY: "faculty",
    ADMIN: "admin"
}

let COOKIES = {
    LOGIN: "login",
    ROLE: "role"
}

let S_KEYS = {
    NAME: "name",
    EMAIL: "email",
    DOB: "dob",
    ROLL_NO: "roll_no",
    BRANCH: "branch",
    YEAR: "year",
    PASSWORD: 'password',
    CONFIRM_PASSWORD: 'confirmPassword',
    PROFILE_IMAGE: "profileImage",
    CGPA: "cgpa",
    ENROLLMENT_NO: "enrollment_no",
    SPGA: "sgpa",
    ATTENDENCE: "attendence",
    INTERNAL_MARKS_RECORDS: "internal_marks_records"
}

let F_KEYS = {
    NAME: "name",
    EMAIL: "email",
    PASSWORD: 'password',
    CONFIRM_PASSWORD: 'confirmPassword',
    PROFILE_IMAGE: "profileImage"
}

let COLLEGE = {
    EMAIL: "recmainpuri.in",
    CODE: "840"
}

let MESSAGE = {
    SNF: 'Student Not Found!'
    // adding more meesages
}

module.exports = {
    ROLES: ROLES,
    COOKIES: COOKIES,
    S_KEYS: S_KEYS,
    F_KEYS: F_KEYS,
    COLLEGE: COLLEGE,
    MESSAGE: MESSAGE
}

