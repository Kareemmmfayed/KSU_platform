import express from "express";
import indexCourses from "../../../../../controllers/courses";
import showCourse from "../../../../../controllers/courses/show";
import indexStudentCourses from "../../../../../controllers/student/course";
import applyToCourse from "../../../../../controllers/student/course/apply";

const courseRoutes = express.Router();

courseRoutes.get("/", indexCourses);
courseRoutes.get("/myCourses", indexStudentCourses);
courseRoutes.post("/:id", applyToCourse);
courseRoutes.get("/:id", showCourse);

export default courseRoutes;
