import express from "express";
import indexCourses from "../../../../../controllers/courses";
import showCourse from "../../../../../controllers/courses/show";
import showInstructorCourses from "../../../../../controllers/instructor/courses/showMyCourses";
import showInstructorStudents from "../../../../../controllers/instructor/courses/showStudent";

const courseRoutes = express.Router();

courseRoutes.get("/", indexCourses);
courseRoutes.get("/myCourses", showInstructorCourses);
courseRoutes.get("/:id", showCourse);
courseRoutes.get("/:id/students", showInstructorStudents);

export default courseRoutes;
