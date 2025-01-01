const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')

dotenv.config()

const db_link = process.env.DB_LINK
mongoose.connect(db_link)
.then((db)=>{asdf
    console.log('[+] admin db connceted')
})
.catch((err)=>{
    console.error('[+]', err)
})

const adminSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        lowercase: true
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
    createdAt: {
        type: Date,
        default: () => Date.now()
    }
})

// hashing | pre hook
adminSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt();
    // console.log('[+] salt:', salt);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    // console.log(`[+] ${hashedPassword} is hashed password for ${this.password}`);

    // saving hashed password
    this.password = hashedPassword
    this.confirmPassword = undefined
})

const adminModel = mongoose.model('adminModel', adminSchema)

module.exports = adminModel

