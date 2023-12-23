import express from "express";
import show from "../../../../controllers/admin/me/show";
import { signCollageIdToReq } from "../../../../middlewares/signCollageIdToReq";
import employeeRoutes from "./employee/employeeRoutes";
import programRoutes from "./program/programRoutes";
import programFilesRoutes from "./program-files/programFilesRoutes";
import collageRoutes from "./collage/collageRoutes";
import levelRouter from "./level/levelRoutes";
import semesterRouter from "./semester/semesterRoutes";
import courseRouter from "./course/courseRoutes";
import yearRoutes from "./year/yearRoutes";
import instructorRoutes from "./instructor/intructorRoutes";
import paymentRoutes from "./payment/paymentRoutes";

const adminRoutes = express.Router();

// Program Files Routes
adminRoutes.use(
  "/collages/:collageId/programs/:programId/program-files",
  (req, res, next) => {
    (req as any).programId = req.params.programId;
    next();
  },
  programFilesRoutes
);

// Program Routes
adminRoutes.use(
  "/collages/:collageId/programs",
  (req, res, next) => {
    (req as any).collageId = req.params.collageId;
    next();
  },
  programRoutes
);

// Employees Routes
adminRoutes.use(
  "/collages/:collageId/employees",
  signCollageIdToReq,
  employeeRoutes
);

// Instructor Routes
adminRoutes.use(
  "/collages/:collageId/instructors",
  signCollageIdToReq,
  instructorRoutes
);

// Level Routes
adminRoutes.use(
  "/collages/:collageId/programs/:programId/levels",
  (req, res, next) => {
    (req as any).programId = req.params.programId;
    next();
  },
  levelRouter
);

// Semester Routes
adminRoutes.use(
  "/collages/:collageId/programs/:programId/levels/:levelId/semesters/",
  (req, res, next) => {
    (req as any).levelId = req.params.levelId;
    next();
  },
  semesterRouter
);

// Course Routes
adminRoutes.use(
  "/collages/:collageId/programs/:programId/levels/:levelId/semesters/:semesterId/courses",
  (req, res, next) => {
    (req as any).semesterId = req.params.semesterId;
    next();
  },
  courseRouter
);

// Payments Routes
adminRoutes.use(
  "/collages/:collageId/programs/:programId/payments",
  (req, res, next) => {
    (req as any).programId = req.params.programId;
    next();
  },
  paymentRoutes
);

// Year Routes
adminRoutes.use("/years", yearRoutes);

// Collage Routes
adminRoutes.use("/collages", collageRoutes);

// Me Routes
adminRoutes.get("/me", show);

export default adminRoutes;
