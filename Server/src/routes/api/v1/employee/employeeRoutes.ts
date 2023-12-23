import express from "express";
import show from "../../../../controllers/employee/me/show";
import programRoutes from "./program/programRoutes";
import applicationRoutes from "./application/applicationRoutes";
import applicantRoutes from "./applicant/applicantRoutes";
import studentRoutes from "./student/studentRoutes";
import paymentRoutes from "./payment/paymentRoutes";

const employeeRoutes = express.Router();

employeeRoutes.use(
  "/collages/:collageId/programs/:programId/applicants",
  applicantRoutes
);

// Application Routes
employeeRoutes.use(
  "/collages/:collageId/programs/:programId/applications",
  (req, res, next) => {
    (req as any).collageId = req.params.collageId;
    (req as any).programId = req.params.programId;
    next();
  },
  applicationRoutes
);

// Program Routes
employeeRoutes.use(
  "/collages/:collageId/programs",
  (req, res, next) => {
    (req as any).collageId = req.params.collageId;
    next();
  },
  programRoutes
);

// Student Routes
employeeRoutes.use(
  "/collages/:collageId/students",
  (req, res, next) => {
    (req as any).collageId = req.params.collageId;
    next();
  },
  studentRoutes
);

// Payments Routes
employeeRoutes.use(
  "/collages/:collageId/programs/:programId/payments",
  paymentRoutes
);

// Me Routes
employeeRoutes.get("/me", show);

export default employeeRoutes;
