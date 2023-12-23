import express from "express";
import assignCourseToInstructor from "../../../../../controllers/admin/course/assignCourseToInstructor";
import createCourse from "../../../../../controllers/admin/course/create";
import removeCourse from "../../../../../controllers/admin/course/delete";
import indexCourses from "../../../../../controllers/courses";
import showCourse from "../../../../../controllers/courses/show";

const courseRouter = express.Router();

courseRouter.post("/", createCourse);
courseRouter.get("/", indexCourses);
courseRouter.get("/:id", showCourse);
courseRouter.delete("/:id", removeCourse);
courseRouter.post("/:id", assignCourseToInstructor);

export default courseRouter;
