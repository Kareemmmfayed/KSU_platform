import express from "express";
import courseRoutes from "./courses/courseRoutes";

const instructorRoutes = express.Router();

instructorRoutes.use(
  "/collages/:collageId/programs/:programId/levels/:levelId/semesters/:semesterId/courses",
  courseRoutes
);

export default instructorRoutes;
