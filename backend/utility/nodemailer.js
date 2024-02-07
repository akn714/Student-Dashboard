"use strict";
const nodemailer = require("nodemailer");
const dotenv = require('dotenv')
dotenv.config()

// async..await is not allowed in global scope, must use a wrapper
module.exports.sendMail = async function sendMail(str, data) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.email,
      pass: process.env.email_password,
    },
  });

  let Osubject, Ohtml;
  if(str=='signup'){
    Osubject = `Thank you for signing ${data.name}`;
    Ohtml = `
    <h1>Welcome to app.com</h1>
    Hope you have a good time!
    Here are your details:
    Name - ${data.name}
    Email - ${data.email}`
  }
  else if(str=='resetpassword'){
    Osubject = 'Reset Password';
    Ohtml = `
      <h1>app.com</h1>
      <p>click <a href='${data.resetPasswordLink}'>here</a> to reset your password</p>
    `
  }
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.from_email, // sender address
    to: data.email, // list of receivers
    subject: Osubject, // Subject line
    html: Ohtml, // html body
  });

  console.log("Message sent: %s", info.messageId);
}

