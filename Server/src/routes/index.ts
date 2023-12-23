import expres from "express";
import masterRoutes from "./api/v1/master/masterRoutes";
import authRoutes from "./api/v1/authRoutes";
import auth from "../middlewares/auth";
import validateMaster from "../middlewares/validate/validateMaster";
import validateAdmin from "../middlewares/validate/validateAdmin";
import adminRoutes from "./api/v1/admin/adminRoutes";
import applicantRoutes from "./api/v1/applicant/applicantRoutes";
import validateApplicant from "../middlewares/validate/validateApplicant";
import employeeRoutes from "./api/v1/employee/employeeRoutes";
import validateEmployee from "../middlewares/validate/validateEmloyee";
import paymentRoutes from "./api/v1/payment/paymentRoutes";
import validateStudent from "../middlewares/validate/validateStudent";
import validateInstructor from "../middlewares/validate/validateInstructor";
import instructorRoutes from "./api/v1/instructor/instructorRoutes";
import studentRoutes from "./api/v1/student/studentRoutes";

const routes = expres.Router();

// General Authentication Routes [No authentication required]
routes.use("/v1/auth", authRoutes);

// Payment Routes [No authentication required]
routes.use("/v1/payment", paymentRoutes);

// Master Routes [Authentication required]
routes.use("/v1/master", auth, validateMaster, masterRoutes);

// Admin Routes [Authentication required]
routes.use("/v1/admin", auth, validateAdmin, adminRoutes);

// Applicant Routes [Authentication required]
routes.use("/v1/applicant", auth, validateApplicant, applicantRoutes);

// Employee Routes [Authentication required]
routes.use("/v1/employee", auth, validateEmployee, employeeRoutes);

// Student Routes [Authentication required]
routes.use("/v1/student", auth, validateStudent, studentRoutes);

// Instructor Routes [Authentication required]
routes.use("/v1/instructor", auth, validateInstructor, instructorRoutes);

export default routes;
