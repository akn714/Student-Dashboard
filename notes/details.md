# Todo : Student-Dashboard

* Making workflow
* Security
* User management
* Proper error handling
* Managing student and faculty authentication
* Making a user friendly Interface

### Todo
* 1st version: user's can visit there profile using '/user/:id'
* 2nd version: user's can visit there profile uisng '/user/profile', this can be done by implementing sessions
* Faculties tab in students profile
  * There will be information of faculties in the branch in which student is enrolled
  * Information of faculties along with there profile image, subject, post (optional, HOD/ Dean/ DSW/ etc.)
* Internal marks
  * There will be 2 steps to upload students internal marks
  * 1: faculties will enter internal marks of student and save it on the portal
  * 2: after saving, a button will be unabled which says 'broadcast', when faculty clicks this button then the marks will be visible to all students
  * This can also be done using sockets
* Notification section
  * Faculties can send notifications to there students
  * notifications will be sent to only those students who are in the perticular branch and year
* Thinking of implementing Blockchain 
* Feedback section
* Mess bill section

### Todo 2: (this is to be done as soon as possible)
* making is_faculty_authentic() function
* making is_admin_authentic() function
* setting role and token in cookies during login and signup

### notes
* add user id in cookies to append it in private links | adding user id in req obj

### Technologies
* Database: MongoDB
* Frontend: HTML, CSS, JS, React.Js
* Backend: Python or Node.js (anyone)

## Features that can be implemented
  * Assignment Submission
  * Syllabus and Course Materials
  * Online Assessments
  * Calendar and Scheduling
  * Grade Reports and Analytics
  * Online Discussion Forums
  * Student Profile and Personalization
