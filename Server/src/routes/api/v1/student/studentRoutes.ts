import express from "express";
import showMeStudent from "../../../../controllers/student/me/show";
import paymentRoutes from "./payments/paymentRoutes";
import courseRoutes from "./courses/courseRoutes";

const studentRoutes = express.Router();

studentRoutes.get("/me", showMeStudent);

studentRoutes.use(
  "/collages/:collageId/programs/:programId/levels/:levelId/semesters/:semesterId/courses",
  courseRoutes
);

// Payments Routes
studentRoutes.use(
  "/collages/:collageId/programs/:programId/payments",
  paymentRoutes
);

export default studentRoutes;
