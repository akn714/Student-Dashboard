### Routes

**Base**
* GET /
* GET /auth
* GET /admin
* GET /student
* GET /faculty
* GET /unauthorised (redirected to this route when detected unauthorised access)

**Auth**
* GET /login
* GET /signup
* GET /logout
* POST /login
* POST /signup

**Admin**(/admin/)

**Student**
* GET /
* GET /get-avg-gpa/:year
* GET /get-avg-gpa/:year/:branch
* GET /secrets
* GET /attendence-records
* GET /end-sem-result
* GET /assignments
* GET /internal-marks-records
* POST /secrets/add
* POST /end-sem-result/upload

**Faculty**

### notes
* Attendence: subject wise display
* Building a telegram or discord bot to manage and debug database


