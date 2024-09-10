"use strict";
import nodemailer from "nodemailer"
import dotenv from 'dotenv'
dotenv.config()

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(str, data) {
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
    <div>
      <h1>Welcome to <span style='color:blue'>Student-Dashboard<span></h1>
      <p>Hope you have a good time!</p>
      <div>
        <p>Here are your details:</p>
        <p>Name - ${data.name}</p>
        <p>Email - ${data.email}</p>
      </div>
    </div>`
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

module.exports = sendMail;
