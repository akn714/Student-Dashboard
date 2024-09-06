### fixed nodemailer error

### testing all routes

### understanding codebase
- [x] ./app.js
- [x] ./logger.js
- [x] ./utility/nodemailer.js

### fixings
- [x] fixed user signup with same email or roll_no or other unique
- [x] students can only register with '@recmainpuri.in' email
- [ ] adding status codes to every response
- [ ] converting all responses in the same formate
    - `res.status(200).json({ message: '', status: 'success' })`
    - `res.status(200).json({ data: [] })`

### todos
- [ ] notifications section (implementing WebSockets)
- [ ] student data updation logic/ frontend popup
- [ ] accessing public data of students from other models
- [x] adding DOB in student model (encrypting this field)
- [ ] different section for search (can search students based on their name, branch, roll_no, year)
- [ ] adding mobile no. in student and faculty model
- [ ] making a new gmail id for handling Student-Dashboard mails and data
- [ ] delete profile button
- [x] implementing internal_marks_records function in student.controller.js
- [x] adding internal_marks_records in student model
- **Admin portal**
    - can update anyone's data
    - can access anyone's profile data except confidential data
    - [creating a telegram bot for managing this portal]
- [ ] creating student public profile

