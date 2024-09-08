const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')

dotenv.config()

const db_link = process.env.DB_LINK
mongoose.connect(db_link)
.then((db)=>{
    console.log('[+] student db connceted')
})
.catch((err)=>{
    console.error('[+]', err)
})

const studentSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        lowercase: true
    },
    dob: {
        type: String // encrypted dob
    },
    roll_no:{
        type: Number,
        require: true
    },
    branch:{
        type: String,
        require: true
    },
    year:{
        type: Number,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    confirmPassword:{
        type: String,
        require: true
    },
    profileImage:{
        type: String,
        default: 'img/users/default.jpeg'
    },
    cgpa:{
        type: Number // calculating average from sgpa array
    },
    enrollment_no:{
        type: Number
    },
    sgpa: [[Number]], // per year per sem [[sem 1, sem 2], [sem 3, sem 4], [sem 5, sem 6], [sem 7, sem 8]]
    attendence: [[Number]], // per year per sem [[sem 1, sem 2], [sem 3, sem 4], [sem 5, sem 6], [sem 7, sem 8]]
    internal_marks_records: [
        {
            SUBJECT_CODE: {
                CT: { type: String, default: "" },
                AT: { type: String, default: "" },
                ATTENDENCE_MARKS: { type: String, default: "" },
                ASSIGNMENT_MARKS: { type: String, default: "" },
                TOTAL: { type: String, default: "" }
            }
        }
    ],
    createdAt: {
        type: Date,
        default: () => Date.now()
    }
})

// hashing | pre hook
studentSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt();
    // console.log('[+] salt:', salt);
    const hashedPassword = bcrypt.hash(this.password, salt);
    // console.log(`[+] ${hashedPassword} is hashed password for ${this.password}`);

    // saving hashed password
    this.password = hashedPassword
})

// todo: sending this to utility/util.js
// student keys
let S_KEYS = {
    "NAME": "name",
    "EMAIL": "email",
    "DOB": "dob",
    "ROLL_NO": "roll_no",
    "BRANCH": "branch",
    "YEAR": "year",
    "CGPA": "cgpa",
    "ENROLLMENT_NO": "enrollment_no",
    "SPGA": "sgpa",
    "ATTENDENCE": "attendence",
    "INTERNAL_MARKS_RECORDS": "internal_marks_records"
}

const studentModel = mongoose.model('studentModel', studentSchema)

module.exports = {
    "studentModel": studentModel,
    "S_KEYS": S_KEYS
}

