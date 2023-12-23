import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import PaymentModel from "../../../models/Payment";

const payment = new PaymentModel();

const createPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get data from body
  const { paymentKind } = req.body;

  if (!paymentKind) return next(new HttpError("Invalid input data", 400));

  // Create payment
  let newPayment;
  try {
    newPayment = await payment.createPayment(paymentKind);
  } catch (error) {
    return next(error);
  }

  // Check if payment was created
  if (!newPayment) {
    return next(new HttpError("Could not create payment", 500));
  }

  // Send response
  res.status(201).json({
    status: "success",
    message: "Payment created successfully",
    data: {
      payment: newPayment,
    },
  });
};

export default createPayment;
