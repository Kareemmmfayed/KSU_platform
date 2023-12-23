import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import PaymentModel from "../../../models/Payment";

interface REQ extends Request {
  programId?: string;
}

const payment = new PaymentModel();

const addPaymentToYear = async (
  req: REQ,
  res: Response,
  next: NextFunction
) => {
  // Get data from body
  const { programId } = req;
  const { yearId, paymentId, price } = req.body;

  if (!programId) return next(new HttpError("Invalid program id", 400));

  if (!yearId || !paymentId || !price)
    return next(new HttpError("Invalid data input", 400));

  let newProgramYearPayment;
  try {
    newProgramYearPayment = await payment.chooseAPayment({
      price,
      year_id: yearId,
      payment_id: paymentId,
      program_id: programId,
    });
  } catch (error) {
    return next(error);
  }

  if (!newProgramYearPayment) {
    return next(new HttpError("Could not add a payment to a year", 500));
  }

  // Send response
  res.status(201).json({
    status: "success",
    message: "Payment added to a year successfully",
    data: {
      programYearPayment: newProgramYearPayment,
    },
  });
};

export default addPaymentToYear;
