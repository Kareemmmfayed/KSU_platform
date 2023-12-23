import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import PaymentModel from "../../../models/Payment";

const payment = new PaymentModel();

const addPaymentToStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get data from body
  const { applicantId, programYearPaymentsId } = req.body;

  if (!applicantId || !programYearPaymentsId)
    return next(new HttpError("Invalid data input", 400));

  let newStudentPayment;
  try {
    newStudentPayment = await payment.assignPaymentToStudent(
      applicantId,
      programYearPaymentsId
    );
  } catch (error) {
    return next(error);
  }

  if (!newStudentPayment) {
    return next(new HttpError("Could not add a payment to a student", 500));
  }
  // Send response
  res.status(201).json({
    status: "success",
    message: "Payment added to a student successfully",
    data: {
      studentPayment: newStudentPayment,
    },
  });
};

export default addPaymentToStudent;
