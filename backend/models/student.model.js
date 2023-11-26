const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const db_link = process.env.DB_LINK
mongoose.conncet(db_link)
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
        require: true
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
        type: Number
    },
    enrollment_no:{
        type: Number
    },
    sgpa: [Number],
    attendence: [Number]
})

const studentModel = mongoose.model('studentSchema', studentSchema)

module.expotrs = studentModel

