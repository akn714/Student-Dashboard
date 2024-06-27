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

// hashing | pre hook
studentSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt();
    console.log('[+] salt:', salt);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    console.log(`[+] ${hashedPassword} is hashed password for ${this.password}`);

    // saving hashed password
    this.password = hashedPassword
})

const studentModel = mongoose.model('studentModel', studentSchema)

module.exports = studentModel

