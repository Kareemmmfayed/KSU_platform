import express from "express";
import indexStudents from "../../../../../controllers/employee/student";
import createStudent from "../../../../../controllers/employee/student/create";
import showStudent from "../../../../../controllers/employee/student/show";

const studentRoutes = express.Router();

studentRoutes.get("/", indexStudents);
studentRoutes.post("/", createStudent);
studentRoutes.get("/:id", showStudent);

export default studentRoutes;
