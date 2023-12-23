import { Router } from "express";
import addPaymentToYear from "../../../../../controllers/admin/payment/addPaymentToYear";
import createPayment from "../../../../../controllers/admin/payment/create";
import indexPayments from "../../../../../controllers/payment";
import listYearPayments from "../../../../../controllers/payment/listYearPayments";

const paymentRoutes = Router();

paymentRoutes.get("/", indexPayments);
paymentRoutes.get("/yearPayments", listYearPayments);
paymentRoutes.post("/", createPayment);
paymentRoutes.post("/addPaymentToYear", addPaymentToYear);

export default paymentRoutes;
