import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import PaymentModel from "../../../models/Payment";

const payment = new PaymentModel();

const listPendingPayments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = req.query.page ? parseInt(req.query.page as string) : NaN;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : NaN;

  let payments;
  try {
    payments = await payment.listPendingPayments(page, limit);
  } catch (error) {
    return next(error);
  }

  if (!payments) {
    return next(new HttpError("Could not list payments for student", 500));
  }
  // Send response
  res.status(200).json({
    status: "success",
    message: "Payment retrieved successfully",
    data: {
      studentPayments: payments,
    },
  });
};

export default listPendingPayments;
