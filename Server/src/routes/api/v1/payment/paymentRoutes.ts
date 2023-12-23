import express from "express";
import showApplicantToPay from "../../../../controllers/payment/showApplicantToPay";

const paymentRoutes = express.Router();

// Show applicant to pay
paymentRoutes.get("/applicants/:nationalId", showApplicantToPay);

export default paymentRoutes;
