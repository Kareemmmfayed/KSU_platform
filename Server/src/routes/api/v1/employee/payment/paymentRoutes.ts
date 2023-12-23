import { Router } from "express";
import addPaymentToStudent from "../../../../../controllers/employee/payments/addPaymentToStudent";
import listPendingPayments from "../../../../../controllers/employee/payments/listPendingPayments";
import togglePaymentStatus from "../../../../../controllers/employee/payments/toggleStatus";
import indexPayments from "../../../../../controllers/payment";
import listYearPayments from "../../../../../controllers/payment/listYearPayments";

const paymentRoutes = Router();

paymentRoutes.get("/", indexPayments);
paymentRoutes.get("/yearPayments", listYearPayments);
paymentRoutes.get("/pendingPayments", listPendingPayments);
paymentRoutes.post("/addPaymentToStudent", addPaymentToStudent);
paymentRoutes.put("/toggleStatus", togglePaymentStatus);

export default paymentRoutes;
