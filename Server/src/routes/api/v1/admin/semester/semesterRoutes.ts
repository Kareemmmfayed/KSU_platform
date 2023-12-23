import express from "express";
import indexSemester from "../../../../../controllers/admin/semester";
import createSemester from "../../../../../controllers/admin/semester/create";
import removeSemester from "../../../../../controllers/admin/semester/delete";
import showSemester from "../../../../../controllers/admin/semester/show";

const semesterRouter = express.Router();

semesterRouter.get("/", indexSemester);
semesterRouter.post("/", createSemester);
semesterRouter.get("/:id", showSemester);
semesterRouter.delete("/:id", removeSemester);

export default semesterRouter;
