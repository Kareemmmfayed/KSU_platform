import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import PaymentModel from "../../../models/Payment";

const payment = new PaymentModel();

const togglePaymentStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get data from body
  const { studentPaymentId } = req.body;

  if (!studentPaymentId) return new HttpError("invalid data input", 500);

  let paymentRes;
  try {
    paymentRes = await payment.updateStudentPayment(
      studentPaymentId,
      null,
      null,
      "approved"
    );
  } catch (error) {
    return next(error);
  }

  if (!paymentRes) {
    return next(new HttpError("Could update payment for student", 500));
  }
  // Send response
  res.status(201).json({
    status: "success",
    message: "Payment updated successfully",
    data: {
      studentPayment: paymentRes,
    },
  });
};

export default togglePaymentStatus;
