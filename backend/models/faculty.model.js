const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const db_link = process.env.DB_LINK
mongoose.connect(db_link)
.then((db)=>{
    console.log('[+] faculty db connceted')
})
.catch((err)=>{
    console.error('[+]', err)
})

const facultySchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
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
    }
})

const facultyModel = mongoose.model('facultyModel', facultySchema)

module.exports = facultyModel

