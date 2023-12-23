import { Router } from "express";
import payStudentProgramPayment from "../../../../../controllers/student/payments/pay";

const paymentRoutes = Router();

paymentRoutes.post("/pay", payStudentProgramPayment);

export default paymentRoutes;
