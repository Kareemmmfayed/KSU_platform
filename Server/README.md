[]()# COMMERCE PLATFORM API

## Getting started

**NOTE:** First of all you should have postgress DB, node.js installed locally in your PC

### Env required

**EX**

```bash
# ENV info
PORT=XXXX
NODE_ENV=dev
# DB connection info
POSTGRES_HOST=XXXXXXXX
POSTGRES_PORT=XXXXXXXX
POSTGRES_DB=XXXX
POSTGRES_DB_TEST=XXXXXXXX
POSTGRES_USER=XXXX
POSTGRES_PASSWORD=XXXXXXXX
# CORS config
CORS_ORIGIN=XXXXXXXXXXXX
# REQ limit
REQEST_LIMIT_TIMEOUT=XXXXXXXX
REQEST_NUMBER_LIMIT=XXXXXXXX
# BCRYPT config
BCRYPT_SALT_ROUNDS=XXXXXXXX
BCRYPT_PASSWORD_PEPPER=XXXXXXXX
# JWT config
JWT_SECRET=XXXXXXXX
JWT_EXPIRES_IN=XXXX
# AWS config
AWS_ACCESS_KEY_ID=XXXXXXXX
AWS_SECRET_ACCESS_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
AWS_REGION=XXXXXXXXXX
AWS_BUCKET_NAME=XXXXXXXX
AWS_EXPIRES_IN_MINUTES=XXX
```

### DB Creation

**NOTE:** You should create 2 databases locally in your PC

```bash
psql -U YOUR-USERNAME
Password: ....
CREATE DATABASE store_dev;
CREATE DATABASE store_test;
```

### Installation Steps

1. Clone the repository
2. Run `npm install` to install dependencies
3. up migration `npm run migration:up`
4. down migration `npm run migration:down`
5. reset migration `npm run migration:reset`
6. Run `npm start` to start the server
7. Run `npm test` to run the tests
8. Run `npm run dev` to start the server in development mode
9. Run `npm run lint` to run the linter
10. Run `npm run format` to format the code using Prettier
11. Run `npm run build` to build the project for production
12. Run `npm run clean` to remove the build directory

## API DOCUMENTATION 📖

## API endpoints

- Success response format ✅

```json
{
"message": "order found",
"status": "success",
"data": ...
}
```

- Error response format ❌

```json
{
  "message": "authorization denied",
  "status": "error"
}
```

### Auth 🎯

- `POST /api/v1/auth/applicant/register` - Register new user (for new applicants only) ✅ [Details](#auth-register)
- `POST /api/v1/auth/login` - Login user (Master - Admin - Employee - Applicant - Student - Instructor) ✅ [Details](#auth-login)

### Storage 🎯

- Upload file [Details](#upload-file)
- Download file [Details](#download-file)

### Master (authentication required) 🎯

#### Collage ⏺

- `POST /api/v1/master/collages` - Create new collage [Details](#create-collage-master) ✅
- `GET /api/v1/master/collages` - Index collages [Details](#index-collage-master) ✅
- `GET /api/v1/master/collages/:collageId` - Show collage [Details](#show-collage-master)✅
- `PUT /api/v1/master/collages/:collageId` - Update collage [Details](#udpate-collage-master)✅
- `DELETE /api/v1/master/collages/:collageId` - Delete collage [Details](#delete-collage-master)✅

#### Admin ⏺

- `POST /api/v1/master/collages/:collageId/admins` - Create new admin [Details](#create-admin) ✅
- `GET /api/v1/master/collages/:collageId/admins` - Index admins [Details](#index-admin) ✅
- `GET /api/v1/master/collages/:collageId/admins/:adminId` - Show admin [Details](#show-admin) ✅
- `PUT /api/v1/master/collages/:collageId/admins/:adminId` - Update admin [Details](#update-admin) ✅
- `DELETE /api/v1/master/collages/:collageId/admins/:adminId` - Delete admin [Details](#delete-admin) ✅

### Admin (authentication required) 🎯

#### Collage ⏺

- `GET /api/v1/admin/collages/:collageId` - Show collage [Details](#show-collage-admin)✅

#### Employee ⏺

- `POST /api/v1/admin/collages/:collageId/employees` - Create new employee [Details](#create-employee-admin) ✅
- `GET /api/v1/admin/collages/:collageId/employees` - Index employees [Details](#index-employee-admin) ✅
- `GET /api/v1/admin/collages/:collageId/employees/:employeeId` - Show employee [Details](#show-employee-admin) ✅
- `PUT /api/v1/admin/collages/:collageId/employees/:employeeId` - Update employee [Details](#update-employee-admin) ✅
- `DELETE /api/v1/admin/collages/:collageId/employees/:employeeId` - Delete employee [Details](#delete-employee-admin) ✅

#### Program ⏺

- `POST /api/v1/admin/collages/:collageId/programs` - Create new program [Details](#create-program-admin) ✅
- `GET /api/v1/admin/collages/:collageId/programs` - Index programs [Details](#index-program-admin) ✅
- `GET /api/v1/admin/collages/:collageId/programs/:programId` - Show program [Details](#show-program-admin) ✅
- `PUT /api/v1/admin/collages/:collageId/programs/:programId` - Update program [Details](#update-program-admin) ✅
- `DELETE /api/v1/admin/collages/:collageId/programs/:programId` - Delete program [Details](#delete-program-admin) ✅

#### Application ⏺

- `GET /api/v1/admin/collages/:collageId/programs/:programId/applications` - Index applications [Details](#index-application-admin) ✅

#### Instructor ⏺

- `POST /api/v1/admin/collages/:collageId/instructors` - Create new instructor [Details](#create-instructor-admin) ✅
- `GET /api/v1/admin/collages/:collageId/instructors` - Index instructors [Details](#index-instructor-admin) ✅
- `GET /api/v1/admin/collages/:collageId/instructors/:instructorId` - Show instructor [Details](#show-instructor-admin) ✅
- `PUT /api/v1/admin/collages/:collageId/instructors/:instructorId` - Update instructor [Details](#update-instructor-admin) ✅
- `DELETE /api/v1/admin/collages/:collageId/instructors/:instructorId` - Delete instructor [Details](#delete-instructor-admin) ✅

#### Student ⏺

- `POST /api/v1/admin/collages/:collageId/students` - Create new student [Details](#create-student-admin) ✅
- `GET /api/v1/admin/collages/:collageId/students` - Index students[Details](#index-student-admin) ✅
- `GET /api/v1/admin/collages/:collageId/students/:studentId` - Show student [Details](#show-student-admin) ✅
- `PUT /api/v1/admin/collages/:collageId/students/:studentId` - Update student [Details](#update-student-admin) ✅
- `DELETE /api/v1/admin/collages/:collageId/students/:studentId` - Delete student [Details](#delete-student-admin) ✅

#### Level ⏺

- `GET /api/v1/admin/collages/:collageId/programs/:programId/levels` - Index levels [Details](#index-level-admin) ✅
- `POST /api/v1/admin/collages/:collageId/programs/:programId/levels` - Create new level [Details](#create-level-admin) ✅
- `GET /api/v1/admin/collages/:collageId/programs/:programId/levels/:levelId` - Show level [Details](#show-level-admin) ✅
- `DELETE /api/v1/admin/collages/:collageId/programs/:programId/levels/:levelId` - Delete level [Details](#delete-level-admin) ✅

#### Semester ⏺

- `GET /api/v1/admin/collages/:collageId/programs/:programId/levels/:levelId/semesters` - Index semesters [Details](#index-semester-admin) ✅
- `POST /api/v1/admin/collages/:collageId/programs/:programId/levels/:levelId/semesters` - Create new semester [Details](#create-semester-admin) ✅
- `GET /api/v1/admin/collages/:collageId/programs/:programId/levels/:levelId/semesters/:semesterId` - Show semester [Details](#show-semester-admin) ✅
- `DELETE /api/v1/admin/collages/:collageId/programs/:programId/levels/:levelId/semesters/:semesterId` - Delete semester [Details](#delete-semester-admin) ✅

#### Course ⏺

- `GET /api/v1/admin/collages/:collageId/programs/:programId/levels/:levelId/semesters/:semesterId/courses` - Index courses [Details](#index-course-admin) ✅
- `POST /api/v1/admin/collages/:collageId/programs/:programId/levels/:levelId/semesters/:semesterId/courses` - Create new course [Details](#create-course-admin) ✅
- `GET /api/v1/admin/collages/:collageId/programs/:programId/levels/:levelId/semesters/:semesterId/courses/:courseId` - Show course [Details](#show-course-admin) ✅
- `PUT /api/v1/admin/collages/:collageId/programs/:programId/levels/:levelId/semesters/:semesterId/courses/:courseId` - Update course [Details](#update-course-admin) ✅
- `DELETE /api/v1/admin/collages/:collageId/programs/:programId/levels/:levelId/semesters/:semesterId/courses/:courseId` - Delete course [Details](#delete-course-admin) ✅

### Employee (authentication required) 🎯

#### Collage ⏺

- `GET /api/v1/employee/collages/:collageId` - Show collage [Details](#show-collage-employee) ✅

#### Program ⏺

- `GET /api/v1/employee/collages/:collageId/programs` - Index programs [Details](#index-program-employee) ✅
- `GET /api/v1/employee/collages/:collageId/programs/:programId` - Show program [Details](#show-program-employee) ✅

#### Application ⏺

- `GET /api/v1/employee/collages/:collageId/programs/:programId/applications` - Index applications [Details](#index-application-employee) ✅
- `GET /api/v1/employee/collages/:collageId/programs/:programId/applications/:applicationId` - Show application [Details](#show-application-employee) ✅
- `PUT /api/v1/employee/collages/:collageId/programs/:programId/applications/:applicationId` - Update application [Details](#update-application-employee) ✅

#### Level ⏺

- `GET /api/v1/employee/collages/:collageId/programs/:programId/levels` - Index levels [Details](#index-level-employee) ✅
- `GET /api/v1/employee/collages/:collageId/programs/:programId/levels/:levelId` - Show level [Details](#show-level-employee) ✅

#### Semester ⏺

- `GET /api/v1/employee/collages/:collageId/programs/:programId/levels/:levelId/semesters` - Index semesters [Details](#index-semester-employee) ✅
- `GET /api/v1/employee/collages/:collageId/programs/:programId/levels/:levelId/semesters/:semesterId` - Show semester [Details](#show-semester-employee) ✅

#### Course ⏺

- `GET /api/v1/employee/collages/:collageId/programs/:programId/levels/:levelId/semesters/:semesterId/courses` - Index courses [Details](#index-course-employee) ✅
- `GET /api/v1/employee/collages/:collageId/programs/:programId/levels/:levelId/semesters/:semesterId/courses/:courseId` - Show course [Details](#show-course-employee) ✅

#### Student ⏺

- `POST /api/v1/employee/collages/:collageId/students` - Create new student [Details](#create-student-employee) ✅
- `GET /api/v1/employee/collages/:collageId/students` - Index students [Details](#index-student-employee) ✅
- `GET /api/v1/employee/collages/:collageId/students/:studentId` - Show student [Details](#show-student-employee) ✅
- `PUT /api/v1/employee/collages/:collageId/students/:studentId` - Update student [Details](#update-student-employee) ✅

### Applicant (authentication required) 🎯

#### Collage ⏺

- `GET /api/v1/applicant/collages/:collageId` - Show collage [Details](#show-collage-applicant) ✅

#### Program ⏺

- `GET /api/v1/applicant/collages/:collageId/programs` - Index programs [Details](#index-program-applicant) ✅
- `GET /api/v1/applicant/collages/:collageId/programs/:programId` - Show program [Details](#show-program-applicant) ✅

#### Application ⏺

- `GET /api/v1/applicant/collages/:collageId/programs/:programId/applications` - Index applications (of applicant) [Details](#index-application-applicant) ✅
- `POST /api/v1/applicant/collages/:collageId/programs/:programId/applications` - Create new application [Details](#create-applicantion-applicant) ✅
- `GET /api/v1/applicant/collages/:collageId/programs/:programId/applications/:applicationId` - Show application (of applicant) [Details](#show-application-applicant) ✅
- `PUT /api/v1/applicant/collages/:collageId/programs/:programId/applications/:applicationId` - Update application (of applicant - such as : documents) [Details](#update-application-applicant) ✅

### Student (authentication required) 🎯

#### Collage ⏺

- `GET /api/v1/student/collages/:collageId` - Show collage [Details](#show-collage-applicant) ✅

#### Course ⏺

- `GET /api/v1/student/collages/:collageId/programs/:programId/levels/:levelId/semesters/:semesterId/courses` - Index courses [Details](#index-course-student) ✅
- `GET /api/v1/student/collages/:collageId/programs/:programId/levels/:levelId/semesters/:semesterId/courses/:studentId` - Index student courses [Details](#index-student-course-student) ✅
- `POST /api/v1/student/collages/:collageId/programs/:programId/levels/:levelId/semesters/:semesterId/courses/:courseId` - Apply to course [Details](#apply-course-student) ✅
- `GET /api/v1/student/collages/:collageId/programs/:programId/levels/:levelId/semesters/:semesterId/courses/:courseId` - Show course [Details](#show-course-student) ✅

### Instructor (authentication required) 🎯

#### Collage ⏺

- `GET /api/v1/instructor/collages/:collageId` - Show collage [Details](#show-collage-applicant) ✅

#### Course ⏺

- `GET /api/v1/instructor/collages/:collageId/programs/:programId/levels/:levelId/semesters/:semesterId/courses` - Index courses [Details](#index-course-instructor) ✅
- `GET /api/v1/instructor/collages/:collageId/programs/:programId/levels/:levelId/semesters/:semesterId/courses/:courseId` - Show course [Details](#show-course-instructor) ✅
- `GET /api/v1/instructor/collages/:collageId/programs/:programId/levels/:levelId/semesters/:semesterId/courses/:courseId/students` - Show course students [Details](#show-course-students-instructor) ✅

### All Enpoints (in details)📡

#### Auth

##### Register new user

<a name="auth-register"></a>

- _HTTP Method:_ `POST`
- _Endpoint URL :_ `/api/v1/auth/applicant/register`
- _Headers_: `None`
- _Request Body_:

```json
{
  "name": "Ahmed",
  "email": "ahmed1@mail.com",
  "password": "ahmed123456",
  "national_id": "4654sd6f54ssd65f46s5d4f5s4",
  "gender": "male"
}
```

- _Success Response:_ `201`

```json
{
  "status": "success",
  "message": "Applicant created successfully.",
  "data": {
    "master": {
      "id": "9088b677-9aff-44eb-87e1-5529e448544f",
      "name": "Ahmed",
      "email": "ahmed1@mail.com"
    },
    "tokens": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5MDg4YjY3Ny05YWZmLTQ0ZWItODdlMS01NTI5ZTQ0ODU0NGYiLCJyb2xlIjoiYXBwbGljYW50IiwiaWF0IjoxNjkzNzQwMDU0LCJleHAiOjE2OTM4MjY0NTR9.t-VwY7g00GWQbqYZVKFoZAvebnKf9Y4smXtLsdHIft0"
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let bodyContent = JSON.stringify({
  name: "Ahmed",
  email: "ahmed1@mail.com",
  password: "ahmed123456",
  national_id: "4654sd6f54ssd65f46s5d4f5s4",
  gender: "male",
});

let response = await fetch(
  "http://localhost:3000/api/v1/auth/applicant/register",
  {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  }
);
let data = await response.text();
console.log(data);
```

##### Login user

<a name="auth-login"></a>

- _HTTP Method:_ `POST`
- _Endpoint URL :_ `/api/v1/auth/login`
- _Headers_: `None`
- _Request Body_:

```json
{
  "role": "admin",
  "email": "emails2@mail.com",
  "password": "lksjdflkjsdf"
}
```

- _Success Response:_ `201`

```json
{
  "status": "success",
  "message": "User authenticated successfully.",
  "data": {
    "master": {
      "id": "e956377d-b8c5-48f3-ae77-250f67748fe1",
      "role": "admin"
    },
    "tokens": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlOTU2Mzc3ZC1iOGM1LTQ4ZjMtYWU3Ny0yNTBmNjc3NDhmZTEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTM1NjA3MzIsImV4cCI6MTY5MzY0NzEzMn0.vklrXriiuVJHzUyN9yUfjKo8dnlQyF3GDP6-jxoRLAU"
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let bodyContent = JSON.stringify({
  role: "admin",
  email: "emails2@mail.com",
  password: "lksjdflkjsdf",
});

let response = await fetch("http://localhost:3000/api/v1/auth/login", {
  method: "POST",
  body: bodyContent,
  headers: headersList,
});
let data = await response.text();
console.log(data);
```

#### Master

##### Collage

###### Index collages

<a name="index-collage-master"></a>

- _HTTP Method:_ `GET`
- _Endpoint URL :_ `api/v1/master/collages`
- _Headers_ `Authorization`
- _Request Body_: `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Collages found successfully.",
  "data": {
    "collages": [
      {
        "id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
        "name": "collage",
        "university_name": "kafr",
        "created_at": "2023-08-28T14:16:48.306Z",
        "updated_at": "2023-08-28T14:16:48.306Z"
      },
      {
        "id": "6fb783e2-c4fa-4f11-9b4e-22425ef75f38",
        "name": "collage",
        "university_name": "kafr",
        "created_at": "2023-08-30T09:45:59.937Z",
        "updated_at": "2023-08-30T09:45:59.937Z"
      }
    ],
    "count": "2"
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
};

let response = await fetch("http://localhost:3000/api/v1/master/collages", {
  method: "GET",
  headers: headersList,
});

let data = await response.text();
console.log(data);
```

###### Create collage

<a name="create-collage-master"></a>

- _HTTP Method:_ `POST`
- _Endpoint URL :_ `api/v1/master/collages`
- _Headers_ `Authorization`
- _Request Body_:

```json
{
  "name": "FCI",
  "universityName": "Kafr Elsheikh"
}
```

- _Success Response:_ `201`

```json
{
  "status": "success",
  "message": "Collage created successfully",
  "data": {
    "collage": {
      "id": "68267de3-113e-4655-916f-ae954f488146",
      "name": "FCI",
      "university_name": "Kafr Elsheikh",
      "created_at": "2023-08-30T13:11:49.023Z",
      "updated_at": "2023-08-30T13:11:49.023Z"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let bodyContent = JSON.stringify({
  name: "FCI",
  universityName: "Kafr Elsheikh",
});

let response = await fetch("http://localhost:3000/api/v1/master/collages", {
  method: "POST",
  body: bodyContent,
  headers: headersList,
});

let data = await response.text();
console.log(data);
```

###### Show collage

<a name="show-collage-master"></a>

- _HTTP Method:_ `GET`
- _Endpoint URL :_ `api/v1/master/collages/:collageId`
- _Headers_ `Authorization`
- _Request Body_: `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Collage found successfully.",
  "data": {
    "collage": {
      "id": "68267de3-113e-4655-916f-ae954f488146",
      "name": "KSU",
      "university_name": "Kafr Elsheikh",
      "created_at": "2023-08-30T13:11:49.023Z",
      "updated_at": "2023-08-30T13:11:49.023Z"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let response = await fetch(
  "http://localhost:3000/api/v1/master/collages/68267de3-113e-4655-916f-ae954f488146",
  {
    method: "GET",
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```

###### Update collage

<a name="update-collage-master"></a>

- _HTTP Method:_ `PATCH`
- _Endpoint URL:_ `api/v1/master/collage/:collageId`
- _Headers:_ `Authorization`
- _Request Body:_

```json
{
  "name": "FCI",
  "universityName": "Kafr Elsheikh"
}
```

- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Collage updated successfully.",
  "data": {
    "collage": {
      "id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "name": "KSU",
      "university_name": "Kafr Elsheikh",
      "created_at": "2023-08-28T14:16:48.306Z",
      "updated_at": "2023-08-28T14:16:48.306Z"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let bodyContent = JSON.stringify({
  name: "FCI",
  universityName: "Kafr Elsheikh",
});

let response = await fetch(
  "http://localhost:3000/api/v1/master/collages/642deaa976e91123782b7f16",
  {
    method: "PATCH",
    body: bodyContent,
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```

###### Delete collage

<a name="delete-collage-master"></a>

- _HTTP Method:_ `DELETE`
- _Endpoint URL:_ `api/v1/master/collage/:collageId`
- _Headers:_ `Authorization`
- _Request Body:_ `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Collage deleted successfully.",
  "data": {
    "collage": {
      "id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "name": "KSU",
      "university_name": "Kafr Elsheikh",
      "created_at": "2023-08-28T14:16:48.306Z",
      "updated_at": "2023-08-28T14:16:48.306Z"
    }
  }
}
```

- _Example - JS_:

  ```js
  let headersList = {
    Accept: "*/*",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
    "Content-Type": "application/json",
  };

  let response = await fetch(
    "http://localhost:3000/api/v1/master/collages/642deaa976e91123782b7f16",
    {
      method: "DELETE",
      headers: headersList,
    }
  );

  let data = await response.text();
  console.log(data);
  ```

##### Admin

###### Create Admin

<a name="create-admin"></a>

- _HTTP Method:_ `POST`
- _Endpoint URL :_ `api/v1/master/collages/:collageId/admins`
- _Headers_ `Authorization`
- _Request Body_:

```json
{
  "name": "admin5",
  "email": "5@email.com",
  "password": "ahmed123456"
}
```

- _Success Response:_ `201`

```json
{
  "status": "success",
  "message": "Admin created successfully",
  "data": {
    "admin": {
      "id": "763e44e0-bd5c-4023-8d19-8794c0898514",
      "email": "5@email.com",
      "name": "admin5",
      "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "created_at": "2023-08-30T14:18:07.575Z",
      "updated_at": "2023-08-30T14:18:07.575Z"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let bodyContent = JSON.stringify({
  name: "admin5",
  email: "5@email.com",
  password: "ahmed123456",
});

let response = await fetch(
  "http://localhost:3000/api/v1/master/collages/642deaa976e91123782b7f16/admins",
  {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  }
);
let data = await response.text();
console.log(data);
```

###### Index admin

<a name="index-admin"></a>

- _HTTP Method:_ `GET`
- _Endpoint URL :_ `api/v1/master/collages/:collageId/admins`
- _Headers_ `Authorization`
- _Request Body_: `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Admins found successfully.",
  "data": {
    "admins": [
      {
        "id": "048545f1-47aa-4a3f-9438-dea96dfd1ee6",
        "email": "email@email.com",
        "name": "admin",
        "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
        "created_at": "2023-08-28T15:21:08.704Z",
        "updated_at": "2023-08-28T15:21:08.704Z"
      },
      {
        "id": "8688e9cc-d9d3-4cd1-a881-a7067e8be7af",
        "email": "1@email.com",
        "name": "admin2",
        "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
        "created_at": "2023-08-28T15:51:00.198Z",
        "updated_at": "2023-08-28T15:51:00.198Z"
      },
      {
        "id": "9258b19e-bfa6-41da-a65a-2f6c3154bae3",
        "email": "3@email.com",
        "name": "emp",
        "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
        "created_at": "2023-08-29T13:23:10.496Z",
        "updated_at": "2023-08-29T13:23:10.496Z"
      }
    ],
    "count": "3"
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let response = await fetch(
  "http://localhost:3000/api/v1/master/collages/642deaa976e91123782b7f16/admins",
  {
    method: "GET",
    headers: headersList,
  }
);
let data = await response.text();
console.log(data);
```

###### Show admin

<a name="show-admin"></a>

- _HTTP Method:_ `GET`
- _Endpoint URL:_ `api/v1/master/collages/:collageId/admins/:id`
- _Headers:_ `Authorization`
- _Request Body:_ `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Admin retrieved successfully",
  "data": {
    "admin": {
      "id": "d5bf85ec-32aa-4b50-92df-02f3807eaeda",
      "email": "em@email.com",
      "name": "ahmed1",
      "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "created_at": "2023-08-28T15:50:52.937Z",
      "updated_at": "2023-08-28T15:50:52.937Z"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let response = await fetch(
  "http://localhost:3000/api/v1/master/collages/642deaa976e91123782b7f16/admins/642deaa976e91123782b7f16",
  {
    method: "GET",
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```

###### Update admin

<a name="update-admin"></a>

- _HTTP Method:_ `PATCH`
- _Endpoint URL:_ `api/v1/master/collages/:collageId/admins/:id`
- _Headers:_ `Authorization`
- _Request Body:_

```json
{
  "name": "mohamed",
  "password": "ahmed123456",
  "email": "a@email.com"
}
```

- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Admin updated successfully",
  "data": {
    "admin": {
      "id": "d0d640d1-9851-410d-84de-a263dc67b67f",
      "email": "a@email.com",
      "name": "mohamed",
      "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "created_at": "2023-08-28T22:51:41.851Z",
      "updated_at": "2023-08-28T22:51:41.851Z"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let bodyContent = JSON.stringify({
  name: "mohamed",
  password: "ahmed123456",
  email: "a@email.com",
});

let response = await fetch(
  "http://localhost:3000/api/v1/master/collages/642deaa976e91123782b7f16/admins/642deaa976e91123782b7f16",
  {
    method: "PATCH",
    body: bodyContent,
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```

###### Delete admin

<a name="delete-admin"></a>

- _HTTP Method:_ `DELETE`
- _Endpoint URL:_ `api/v1/master/collages/:collageId/admins/:id`
- _Headers:_ `Authorization`
- _Request Body:_ `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Admin removed successfully",
  "data": {
    "admin": {
      "id": "d5bf85ec-32aa-4b50-92df-02f3807eaeda",
      "email": "em@email.com",
      "name": "ahmed1",
      "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "created_at": "2023-08-28T15:50:52.937Z",
      "updated_at": "2023-08-28T15:50:52.937Z"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let response = await fetch(
  "http://localhost:3000/api/v1/master/collages/642deaa976e91123782b7f16/admins/642deaa976e91123782b7f16",
  {
    method: "DELETE",
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```

#### Admin

##### Collage

###### Show collage

<a name="show-collage-admin"></a>

- _HTTP Method:_ `GET`
- _Endpoint URL:_ `api/v1/admin/collages/:collageId`
- _Headers:_ `Authorization`
- _Request Body:_ `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Collage found successfully.",
  "data": {
    "collage": {
      "id": "68267de3-113e-4655-916f-ae954f488146",
      "name": "KSU",
      "university_name": "Kafr Elsheikh",
      "created_at": "2023-08-30T13:11:49.023Z",
      "updated_at": "2023-08-30T13:11:49.023Z"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: '*/*',
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
  'Content-Type': 'application/json',
};

let response = await fetch(
    'http://localhost:3000/api/v1/admin/collages/:collageId,
    {
      method: 'GET',
      headers: headersList,
    }
  );

  let data = await response.text();
  console.log(data);
```

##### Employee

###### Create Employee

<a name="create-employee-admin"></a>

- _HTTP Method:_ `POST`
- _Endpoint URL :_ `/api/v1/admin/collages/:collageId/employees`
- _Headers_ `Authorization`
- _Request Body_:

```json
{
  "name": "emp",
  "email": "11@email.com",
  "password": "ahmed123456"
}
```

- _Success Response:_ `201`

```json
{
  "status": "success",
  "message": "Employee created successfully",
  "data": {
    "employee": {
      "id": "bd63391e-0591-41ff-86d5-ac0205f27c73",
      "email": "11@email.com",
      "name": "emp",
      "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "created_at": "2023-08-30T16:05:02.695Z",
      "updated_at": "2023-08-30T16:05:02.695Z"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let bodyContent = JSON.stringify({
  name: "emp",
  email: "11@email.com",
  password: "ahmed123456",
});

let response = await fetch(
  "http://localhost:3000//api/v1/admin/collages/:collageId/employees",
  {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  }
);
let data = await response.text();
console.log(data);
```

###### Index employee

<a name="index-employee-admin"></a>

- _HTTP Method:_ `GET`
- _Endpoint URL :_ `api/v1/admin/collages/:collageId/employees`
- _Headers_ `Authorization`
- _Request Body_: `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Employees found successfully.",
  "data": {
    "employees": [
      {
        "id": "cae16920-056f-4a9b-bb52-fc2f0d38ab84",
        "email": "5@email.com",
        "name": "emp",
        "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
        "created_at": "2023-08-29T13:43:10.567Z",
        "updated_at": "2023-08-29T13:43:10.567Z"
      },
      {
        "id": "0a211647-efb4-4177-ac53-68162019e90a",
        "email": "6@email.com",
        "name": "emp",
        "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
        "created_at": "2023-08-29T13:49:56.226Z",
        "updated_at": "2023-08-29T13:49:56.226Z"
      },
      {
        "id": "bc62ba72-fc69-4f0c-9812-a315f11c7636",
        "email": "7@email.com",
        "name": "emp",
        "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
        "created_at": "2023-08-29T13:50:30.888Z",
        "updated_at": "2023-08-29T13:50:30.888Z"
      }
    ],
    "count": "3"
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let response = await fetch(
  "http://localhost:3000api/v1/admin/collages/:collageId/employees",
  {
    method: "GET",
    headers: headersList,
  }
);
let data = await response.text();
console.log(data);
```

###### Show employee

<a name="show-employee-admin"></a>

- _HTTP Method:_ `GET`
- _Endpoint URL:_ `api/v1/admin/collages/:collageId/employees/:employeeId`
- _Headers:_ `Authorization`
- _Request Body:_ `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Employee retrieved successfully",
  "data": {
    "employee": {
      "id": "a70eb66d-f336-438e-a5d4-6a0f8bcf1076",
      "email": "mohamed1@gmail.com",
      "name": "mohamed1",
      "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "created_at": "2023-08-29T13:36:09.189Z",
      "updated_at": "2023-08-29T13:36:09.189Z"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let response = await fetch(
  "http://localhost:3000api/v1/admin/collages/:collageId/employees/a70eb66d-f336-438e-a5d4-6a0f8bcf1076",
  {
    method: "GET",
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```

###### Update employee

<a name="update-employee-admin"></a>

- _HTTP Method:_ `PATCH`
- _Endpoint URL:_ `api/v1/admin/collages/:collageId/employees/:employeeId`
- _Headers:_ `Authorization`
- _Request Body:_

```json
{
  "name": "mohamed1",
  "password": "ahmed123456",
  "email": "mohamed1@gmail.com"
}
```

- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Employee updated successfully",
  "data": {
    "employee": {
      "id": "a70eb66d-f336-438e-a5d4-6a0f8bcf1076",
      "email": "mohamed1@gmail.com",
      "name": "mohamed1",
      "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "created_at": "2023-08-29T13:36:09.189Z",
      "updated_at": "2023-08-29T13:36:09.189Z"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let bodyContent = JSON.stringify({
  name: "mohamed",
  password: "ahmed123456",
  email: "a@email.com",
});

let response = await fetch(
  "http://localhost:3000/api/v1/admin/collages/:collageId/employees/a70eb66d-f336-438e-a5d4-6a0f8bcf1076",
  {
    method: "PATCH",
    body: bodyContent,
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```

###### Delete employee

<a name="delete-employee-admin"></a>

- _HTTP Method:_ `DELETE`
- _Endpoint URL:_ `api/v1/admin/collages/:collageId/employees/:employeeId`
- _Headers:_ `Authorization`
- _Request Body:_ `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Employee removed successfully",
  "data": {
    "admin": {
      "id": "d5bf85ec-32aa-4b50-92df-02f3807eaeda",
      "email": "em@email.com",
      "name": "ahmed1",
      "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "created_at": "2023-08-28T15:50:52.937Z",
      "updated_at": "2023-08-28T15:50:52.937Z"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let response = await fetch(
  "http://localhost:3000/api/v1/admin/collages/collageId/employees/642deaa976e91123782b7f16",
  {
    method: "DELETE",
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```

##### Program

###### Create program

<a name="create-program-admin"></a>

- _HTTP Method:_ `POST`
- _Endpoint URL :_ `/api/v1/admin/collages/:collageId/programs`
- _Headers_ `Authorization`
- _Request Body_:

```json
{
  "name": "program",
  "description": "any",
  "applying_fees": 100,
  "program_fees": 100,
  "open_at": "2023-10-1",
  "close_at": "2023-10-1",
  "credit_hour_fees": 100
}
```

- _Success Response:_ `201`

```json
{
  "status": "success",
  "message": "Program created successfully.",
  "data": {
    "program": {
      "id": "3575d019-5983-4eca-a15e-fad76f2b5ab5",
      "name": "program",
      "description": "any",
      "applying_fees": 100,
      "program_fees": 100,
      "open_at": "2023-09-30T22:00:00.000Z",
      "close_at": "2023-09-30T22:00:00.000Z",
      "credit_hour_fees": 100,
      "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "created_at": "2023-08-30T19:44:06.948Z",
      "updated_at": "2023-08-30T19:44:06.948Z"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let bodyContent = JSON.stringify({
  name: "program",
  description: "any",
  applying_fees: 100,
  program_fees: 100,
  open_at: "2023-10-1",
  close_at: "2023-10-1",
  credit_hour_fees: 100,
});

let response = await fetch(
  "http://localhost:3000/api/v1/admin/collages/:collageId/programs",
  {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  }
);
let data = await response.text();
console.log(data);
```

###### Index program

<a name="index-program-admin"></a>

- _HTTP Method:_ `GET`
- _Endpoint URL :_ `api/v1/admin/collages/:collageId/programs`
- _Headers_ `Authorization`
- _Request Body_: `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Programs fetched successfully.",
  "data": {
    "programs": [
      {
        "id": "3575d019-5983-4eca-a15e-fad76f2b5ab5",
        "name": "program",
        "description": "any",
        "applying_fees": 100,
        "program_fees": 100,
        "open_at": "2023-09-30T22:00:00.000Z",
        "close_at": "2023-09-30T22:00:00.000Z",
        "credit_hour_fees": 100,
        "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
        "created_at": "2023-08-30T19:44:06.948Z",
        "updated_at": "2023-08-30T19:44:06.948Z"
      }
    ],
    "count": "1"
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let response = await fetch(
  "http://localhost:3000/api/v1/admin/collages/:collageId/programs",
  {
    method: "GET",
    headers: headersList,
  }
);
let data = await response.text();
console.log(data);
```

###### Show program

<a name="show-program-admin"></a>

- _HTTP Method:_ `GET`
- _Endpoint URL:_ `api/v1/admin/collages/:collageId/programs/:programId`
- _Headers:_ `Authorization`
- _Request Body:_ `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Program fetched successfully.",
  "data": {
    "program": {
      "id": "3575d019-5983-4eca-a15e-fad76f2b5ab5",
      "name": "program",
      "description": "any",
      "applying_fees": 100,
      "program_fees": 100,
      "open_at": "2023-09-30T22:00:00.000Z",
      "close_at": "2023-09-30T22:00:00.000Z",
      "credit_hour_fees": 100,
      "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "created_at": "2023-08-30T19:44:06.948Z",
      "updated_at": "2023-08-30T19:44:06.948Z"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let response = await fetch(
  "http://localhost:3000api/v1/admin/collages/:collageId/programs/a70eb66d-f336-438e-a5d4-6a0f8bcf1076",
  {
    method: "GET",
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```

###### Update program

<a name="show-program-admin"></a>

- _HTTP Method:_ `PATCH`
- _Endpoint URL:_ `api/v1/admin/collages/:collageId/programs/:programId`
- _Headers:_ `Authorization`
- _Request Body:_

```json
{
  "name": "programex",
  "description": "any",
  "applying_fees": 100,
  "program_fees": 100,
  "open_at": "2023-10-1",
  "close_at": "2023-10-1",
  "credit_hour_fees": 100
}
```

- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Program updated successfully.",
  "data": {
    "program": {
      "id": "3575d019-5983-4eca-a15e-fad76f2b5ab5",
      "name": "programex",
      "description": "any",
      "applying_fees": 100,
      "program_fees": 100,
      "open_at": "2023-09-30T22:00:00.000Z",
      "close_at": "2023-09-30T22:00:00.000Z",
      "credit_hour_fees": 100,
      "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "created_at": "2023-08-30T19:44:06.948Z",
      "updated_at": "2023-08-30T19:44:06.948Z"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let bodyContent = JSON.stringify({
  name: "program",
  description: "any",
  applying_fees: 100,
  program_fees: 100,
  open_at: "2023-10-1",
  close_at: "2023-10-1",
  credit_hour_fees: 100,
});

let response = await fetch(
  "http://localhost:3000/api/v1/admin/collages/:collageId/programs/a70eb66d-f336-438e-a5d4-6a0f8bcf1076",
  {
    method: "PATCH",
    body: bodyContent,
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```

###### Delete program

<a name="delete-program-admin"></a>

- _HTTP Method:_ `DELETE`
- _Endpoint URL:_ `api/v1/admin/collages/:collageId/programs/:programId`
- _Headers:_ `Authorization`
- _Request Body:_ `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Program removed successfully."
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let response = await fetch(
  "http://localhost:3000/api/v1/admin/collages/collageId/programsi/642deaa976e91123782b7f16",
  {
    method: "DELETE",
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```

##### Application

###### Index application

<a name="index-application-admin"></a>

- _HTTP Method:_ `GET`
- _Endpoint URL :_ `api/v1/admin/collages/:collageId/programs/:programId/applications`
- _Headers_ `Authorization`
- _Request Body_: `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Applications indexed.",
  "data": {
    "applications": [
      {
        "id": "4314b2bb-ced2-483e-8749-ac184c334c82",
        "status": "pending",
        "feedback": null,
        "applying_fees_status": false,
        "program_fees_status": false,
        "program_id": "a8a352f4-4afd-4c67-98ac-ebea44c03307",
        "applicant_id": "da23beb2-323e-4274-958a-a2870597e08f",
        "created_at": "2023-09-01T13:23:12.640Z",
        "updated_at": "2023-09-01T13:23:12.640Z"
      }
    ],
    "totalApplications": {
      "count": "1"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let response = await fetch(
  "http://localhost:3000/api/v1/admin/collages/:collageId/programs/:programId/applications",
  {
    method: "GET",
    headers: headersList,
  }
);
let data = await response.text();
console.log(data);
```

#### Employee

##### Collage

###### Show collage

<a name="show-collage-employee"></a>

- _HTTP Method:_ `GET`
- _Endpoint URL:_ `api/v1/employee/collages/:collageId`
- _Headers:_ `Authorization`
- _Request Body:_ `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Collage found successfully.",
  "data": {
    "collage": {
      "id": "68267de3-113e-4655-916f-ae954f488146",
      "name": "KSU",
      "university_name": "Kafr Elsheikh",
      "created_at": "2023-08-30T13:11:49.023Z",
      "updated_at": "2023-08-30T13:11:49.023Z"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: '*/*',
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
  'Content-Type': 'application/json',
};

let response = await fetch(
    'http://localhost:3000/api/v1/employee/collages/:collageId,
    {
      method: 'GET',
      headers: headersList,
    }
  );

  let data = await response.text();
  console.log(data);
```

##### Program

###### Index program

<a name="index-program-employee"></a>

- _HTTP Method:_ `GET`
- _Endpoint URL :_ `api/v1/employee/collages/:collageId/programs`
- _Headers_ `Authorization`
- _Request Body_: `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Programs fetched successfully.",
  "data": {
    "programs": [
      {
        "id": "3575d019-5983-4eca-a15e-fad76f2b5ab5",
        "name": "program",
        "description": "any",
        "applying_fees": 100,
        "program_fees": 100,
        "open_at": "2023-09-30T22:00:00.000Z",
        "close_at": "2023-09-30T22:00:00.000Z",
        "credit_hour_fees": 100,
        "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
        "created_at": "2023-08-30T19:44:06.948Z",
        "updated_at": "2023-08-30T19:44:06.948Z"
      }
    ],
    "count": "1"
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let response = await fetch(
  "http://localhost:3000/api/v1/employee/collages/:collageId/programs",
  {
    method: "GET",
    headers: headersList,
  }
);
let data = await response.text();
console.log(data);
```

###### Show program

<a name="show-program-employee"></a>

- _HTTP Method:_ `GET`
- _Endpoint URL:_ `api/v1/employee/collages/:collageId/programs/:programId`
- _Headers:_ `Authorization`
- _Request Body:_ `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Program fetched successfully.",
  "data": {
    "program": {
      "id": "3575d019-5983-4eca-a15e-fad76f2b5ab5",
      "name": "program",
      "description": "any",
      "applying_fees": 100,
      "program_fees": 100,
      "open_at": "2023-09-30T22:00:00.000Z",
      "close_at": "2023-09-30T22:00:00.000Z",
      "credit_hour_fees": 100,
      "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "created_at": "2023-08-30T19:44:06.948Z",
      "updated_at": "2023-08-30T19:44:06.948Z"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let response = await fetch(
  "http://localhost:3000api/v1/employee/collages/:collageId/programs/a70eb66d-f336-438e-a5d4-6a0f8bcf1076",
  {
    method: "GET",
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```

##### Application

###### Index application

<a name="index-application-employee"></a>

- _HTTP Method:_ `GET`
- _Endpoint URL :_ `api/v1/employee/collages/:collageId/programs/:programId/applications`
- _Headers_ `Authorization`
- _Request Body_: `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Applications indexed.",
  "data": {
    "applications": [
      {
        "id": "4314b2bb-ced2-483e-8749-ac184c334c82",
        "status": "pending",
        "feedback": null,
        "applying_fees_status": false,
        "program_fees_status": false,
        "program_id": "a8a352f4-4afd-4c67-98ac-ebea44c03307",
        "applicant_id": "da23beb2-323e-4274-958a-a2870597e08f",
        "created_at": "2023-09-01T13:23:12.640Z",
        "updated_at": "2023-09-01T13:23:12.640Z"
      }
    ],
    "totalApplications": {
      "count": "1"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let response = await fetch(
  "http://localhost:3000api/v1/employee/collages/:collageId/programs/:programId/applications",
  {
    method: "GET",
    headers: headersList,
  }
);
let data = await response.text();
console.log(data);
```

###### Show application

<a name="show-application-employee"></a>

- _HTTP Method:_ `GET`
- _Endpoint URL:_ `api/v1/employee/collages/:collageId/programs/:programId/applications/:employeeId`
- _Headers:_ `Authorization`
- _Request Body:_ `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Application shown.",
  "data": {
    "application": {
      "id": "4314b2bb-ced2-483e-8749-ac184c334c82",
      "status": "pending",
      "feedback": null,
      "applying_fees_status": false,
      "program_fees_status": false,
      "program_id": "a8a352f4-4afd-4c67-98ac-ebea44c03307",
      "applicant_id": "da23beb2-323e-4274-958a-a2870597e08f",
      "created_at": "2023-09-01T13:23:12.640Z",
      "updated_at": "2023-09-01T13:23:12.640Z"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let response = await fetch(
  "http://localhost:3000api/v1/employee/collages/:collageId/programs/:programId/applications/a70eb66d-f336-438e-a5d4-6a0f8bcf1076",
  {
    method: "GET",
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```

###### Update employee

<a name="update-application-employee"></a>

- _HTTP Method:_ `PATCH`
- _Endpoint URL:_ `api/v1/employee/collages/:collageId/programs/:programId/applications/:applicationId`
- _Headers:_ `Authorization`
- _Request Body:_

```json
{
  "status": "active",
  "feedback": "good",
  "applying_fees": false,
  "program_fees": false
}
```

- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Application updated successfully",
  "data": {
    // TODO: complete
    "application": {}
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let bodyContent = JSON.stringify({
  application_id: ANY,
  status: "active",
  program_id: ANY,
  feedback: "good",
  applying_fees: false,
  program_fees: false,
});

let response = await fetch(
  "http://localhost:3000/api/v1/employee/collages/:collageId/programs/:programId/applications/a70eb66d-f336-438e-a5d4-6a0f8bcf1076",
  {
    method: "PATCH",
    body: bodyContent,
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```

#### Applicant

##### Collage

###### Show collage

<a name="show-collage-applicant"></a>

- _HTTP Method:_ `GET`
- _Endpoint URL:_ `api/v1/applicant/collages/:collageId`
- _Headers:_ `Authorization`
- _Request Body:_ `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Collage found successfully.",
  "data": {
    "collage": {
      "id": "68267de3-113e-4655-916f-ae954f488146",
      "name": "KSU",
      "university_name": "Kafr Elsheikh",
      "created_at": "2023-08-30T13:11:49.023Z",
      "updated_at": "2023-08-30T13:11:49.023Z"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: '*/*',
  Authorization:
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0',
  'Content-Type': 'application/json',
};

let response = await fetch(
    'http://localhost:3000/api/v1/applicant/collages/:collageId,
    {
      method: 'GET',
      headers: headersList,
    }
  );

  let data = await response.text();
  console.log(data);
```

##### Program

###### Index program

<a name="index-program-applicant"></a>

- _HTTP Method:_ `GET`
- _Endpoint URL :_ `api/v1/applicant/collages/:collageId/programs`
- _Headers_ `Authorization`
- _Request Body_: `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Programs fetched successfully.",
  "data": {
    "programs": [
      {
        "id": "3575d019-5983-4eca-a15e-fad76f2b5ab5",
        "name": "program",
        "description": "any",
        "applying_fees": 100,
        "program_fees": 100,
        "open_at": "2023-09-30T22:00:00.000Z",
        "close_at": "2023-09-30T22:00:00.000Z",
        "credit_hour_fees": 100,
        "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
        "created_at": "2023-08-30T19:44:06.948Z",
        "updated_at": "2023-08-30T19:44:06.948Z"
      }
    ],
    "count": "1"
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let response = await fetch(
  "http://localhost:3000/api/v1/applicant/collages/:collageId/programs",
  {
    method: "GET",
    headers: headersList,
  }
);
let data = await response.text();
console.log(data);
```

###### Show program

<a name="show-program-applicant"></a>

- _HTTP Method:_ `GET`
- _Endpoint URL:_ `api/v1/applicant/collages/:collageId/programs/:programId`
- _Headers:_ `Authorization`
- _Request Body:_ `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Program fetched successfully.",
  "data": {
    "program": {
      "id": "3575d019-5983-4eca-a15e-fad76f2b5ab5",
      "name": "program",
      "description": "any",
      "applying_fees": 100,
      "program_fees": 100,
      "open_at": "2023-09-30T22:00:00.000Z",
      "close_at": "2023-09-30T22:00:00.000Z",
      "credit_hour_fees": 100,
      "collage_id": "b0e5bda5-0d44-4572-ad63-76cbedf0a096",
      "created_at": "2023-08-30T19:44:06.948Z",
      "updated_at": "2023-08-30T19:44:06.948Z"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let response = await fetch(
  "http://localhost:3000api/v1/applicant/collages/:collageId/programs/a70eb66d-f336-438e-a5d4-6a0f8bcf1076",
  {
    method: "GET",
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```

##### Application

###### Index application

<a name="index-application-applicant"></a>

- _HTTP Method:_ `GET`
- _Endpoint URL :_ `api/v1/applicant/collages/:collageId/programs/:programId/applications`
- _Headers_ `Authorization`
- _Request Body_: `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Applications indexed.",
  "data": {
    "applications": [
      {
        "id": "4314b2bb-ced2-483e-8749-ac184c334c82",
        "status": "pending",
        "feedback": null,
        "applying_fees_status": false,
        "program_fees_status": false,
        "program_id": "a8a352f4-4afd-4c67-98ac-ebea44c03307",
        "applicant_id": "da23beb2-323e-4274-958a-a2870597e08f",
        "created_at": "2023-09-01T13:23:12.640Z",
        "updated_at": "2023-09-01T13:23:12.640Z"
      }
    ],
    "totalApplications": {
      "count": "1"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let response = await fetch(
  "http://localhost:3000/api/v1/applicant/collages/:collageId/programs/:programId/applications",
  {
    method: "GET",
    headers: headersList,
  }
);
let data = await response.text();
console.log(data);
```

###### Show application

<a name="show-application-applicant"></a>

- _HTTP Method:_ `GET`
- _Endpoint URL:_ `api/v1/applicant/collages/:collageId/programs/:programId/applications/:employeeId`
- _Headers:_ `Authorization`
- _Request Body:_ `None`
- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Application shown.",
  "data": {
    "application": {
      "id": "4314b2bb-ced2-483e-8749-ac184c334c82",
      "status": "pending",
      "feedback": null,
      "applying_fees_status": false,
      "program_fees_status": false,
      "program_id": "a8a352f4-4afd-4c67-98ac-ebea44c03307",
      "applicant_id": "da23beb2-323e-4274-958a-a2870597e08f",
      "created_at": "2023-09-01T13:23:12.640Z",
      "updated_at": "2023-09-01T13:23:12.640Z"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let response = await fetch(
  "http://localhost:3000api/v1/applicant/collages/:collageId/programs/:programId/applications/a70eb66d-f336-438e-a5d4-6a0f8bcf1076",
  {
    method: "GET",
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```

###### Update application

<a name="update-application-applicant"></a>

- _HTTP Method:_ `PATCH`
- _Endpoint URL:_ `api/v1/applicant/collages/:collageId/programs/:programId/applications/:applicationId`
- _Headers:_ `Authorization`
- _Request Body:_

```json
{
  "status": "reviewed",
  "feedback": "you have uploaded a fake documents",
  "applying_fees_status": true,
  "program_fees_status": true
}
```

- _Success Response:_ `200`

```json
{
  "status": "success",
  "message": "Application updated.",
  "data": {
    "application": {
      "id": "4314b2bb-ced2-483e-8749-ac184c334c82",
      "status": "reviewed",
      "feedback": "you have uploaded a fake documents",
      "applying_fees_status": true,
      "program_fees_status": true,
      "program_id": "a8a352f4-4afd-4c67-98ac-ebea44c03307",
      "applicant_id": "da23beb2-323e-4274-958a-a2870597e08f",
      "created_at": "2023-09-01T13:23:12.640Z",
      "updated_at": "2023-09-01T13:23:12.640Z"
    }
  }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let bodyContent = JSON.stringify({
  status: "reviewed",
  feedback: "you have uploaded a fake documents",
  applying_fees_status: true,
  program_fees_status: true,
});

let response = await fetch(
  "http://localhost:3000/api/v1/applicant/collages/:collageId/programs/:programId/applications/a70eb66d-f336-438e-a5d4-6a0f8bcf1076",
  {
    method: "PATCH",
    body: bodyContent,
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```

###### Create application

<a name="create-application-applicant"></a>

- _HTTP Method:_ `POST`
- _Endpoint URL:_ `api/v1/applicant/collages/:collageId/programs/:programId/applications/:applicationId`
- _Headers:_ `Authorization`
- _Request Body:_ `None`
- _Success Response:_ `200`

_Note: you upload files_

```json
{
    "application": {
    "status": "success",
    "message": "Application created successfully",
    "data": {
        "application": {
            "id": "4314b2bb-ced2-483e-8749-ac184c334c82",
            "status": "pending",
            "feedback": null,
            "applying_fees_status": false,
            "program_fees_status": false,
            "program_id": "a8a352f4-4afd-4c67-98ac-ebea44c03307",
            "applicant_id": "da23beb2-323e-4274-958a-a2870597e08f",
            "created_at": "2023-09-01T13:23:12.640Z",
            "updated_at": "2023-09-01T13:23:12.640Z"
        },
        "filesToUpload": [
            {
                "name": "new program 3",
                "type": "image/jpeg",
                "uploadUrl": "https://commerce-platform.s3.amazonaws.com/applications/4314b2bb-ced2-483e-8749-ac184c334c82/8b02b262-8cac-47f6-a639-364bb1c130a1.jpeg?Content-Type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZUKGZYJVQU3LAB4K%2F20230901%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230901T122312Z&X-Amz-Expires=6000&X-Amz-Signature=ac867fdff3ba9b1090c1d9dd0e2208b42609ca09e06e437ca2fd9c976735b861&X-Amz-SignedHeaders=host"
            }
        ]
    }
}
```

- _Example - JS_:

```js
let headersList = {
  Accept: "*/*",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNjQyZGUzZjQ4ZmNkMDgyMzlmNTVmNjlhIiwicm9sZSI6Im1hc3RlciJ9LCJpYXQiOjE2ODA3MjkwOTYsImV4cCI6MTY4MzMyMTA5Nn0.I1OSJJ3RywdmodyvYvRu2bN-2tEwPWbEEyceFCYmTS0",
  "Content-Type": "application/json",
};

let response = await fetch(
  "http://localhost:3000/api/v1/applicant/collages/:collageId/programs/:programId/applications/a70eb66d-f336-438e-a5d4-6a0f8bcf1076",
  {
    method: "POST",
    headers: headersList,
  }
);

let data = await response.text();
console.log(data);
```

#### Storage

##### Uploading a file

<a name="upload-file"></a>

- After creating a application you will get the application data
  and presigned url to upload with it

Ex

```json
{
  "status": "success",
  "message": "Application created successfully",
  "data": {
    "application": {
      "id": "405c1a5a-2519-4f78-b295-d11f75584e38",
      "status": "pending",
      "feedback": null,
      "applying_fees_status": false,
      "program_fees_status": false,
      "program_id": "a8a352f4-4afd-4c67-98ac-ebea44c03307",
      "applicant_id": "da23beb2-323e-4274-958a-a2870597e08f",
      "created_at": "2023-09-03T17:11:23.126Z",
      "updated_at": "2023-09-03T17:11:23.126Z"
    },
    "filesToUpload": [
      {
        "name": "new program 3",
        "type": "image/jpeg",
        "uploadUrl": "https://commerce-platform.s3.amazonaws.com/applications/405c1a5a-2519-4f78-b295-d11f75584e38/7239fb1f-d062-445d-ba9e-950f7fa3f5cf.jpeg?Content-Type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZUKGZYJVQU3LAB4K%2F20230903%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230903T161123Z&X-Amz-Expires=6000&X-Amz-Signature=e356d36db87b45290d3a508d01b7f94e7dfaf83fe818f510c99542193111e7dc&X-Amz-SignedHeaders=host"
      }
    ]
  }
}
```

- under filesToUpload you will find uploadUrl
- after that you will take this url and make a `PUT` request to it with the file you want to upload

JS Example

```js
await fetch(
  'https://commerce-platform.s3.amazonaws.com/applications/405c1a5a-2519-4f78-b295-d11f75584e38/7239fb1f-d062-445d-ba9e-950f7fa3f5cf.jpeg?Content-Type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZUKGZYJVQU3LAB4K%2F20230903%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230903T161123Z&X-Amz-Expires=6000&X-Amz-Signature=e356d36db87b45290d3a508d01b7f94e7dfaf83fe818f510c99542193111e7dc&X-Amz-SignedHeaders=host',
  {
    method: 'PUT',
	body: SOMEFILE
    headers: headersList,
  }
);
```

##### Downloading a file

<a name="download-file"></a>

- After you make a `GET` request to show an application you will get the application details and a list of its files
  Ex

```json
{
  "status": "success",
  "message": "Application shown.",
  "data": {
    "application": {
      "id": "4314b2bb-ced2-483e-8749-ac184c334c82",
      "status": "pending",
      "feedback": null,
      "applying_fees_status": false,
      "program_fees_status": false,
      "program_id": "a8a352f4-4afd-4c67-98ac-ebea44c03307",
      "applicant_id": "da23beb2-323e-4274-958a-a2870597e08f",
      "created_at": "2023-09-01T13:23:12.640Z",
      "updated_at": "2023-09-01T13:23:12.640Z"
    },
    "files": [
      {
        "name": "8b02b262-8cac-47f6-a639-364bb1c130a1",
        "type": "image/jpeg",
        "downloadUrl": "https://commerce-platform.s3.amazonaws.com/applications/4314b2bb-ced2-483e-8749-ac184c334c82/8b02b262-8cac-47f6-a639-364bb1c130a1.jpeg?AWSAccessKeyId=AKIAZUKGZYJVQU3LAB4K&Expires=1693762928&Signature=INwUAM73SaKJ2TPguEg3%2BLfV1dg%3D"
      }
    ]
  }
}
```

- After that you can download the file you need
