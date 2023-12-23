import { Request, Response, NextFunction } from "express";
import HttpError from "../../models/httpError";
import PaymentModel from "../../models/Payment";

const payment = new PaymentModel();

const indexPayments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = req.query.page ? parseInt(req.query.page as string) : NaN;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : NaN;
  let payments;
  try {
    payments = await payment.indexPayment(page, limit);
  } catch (err) {
    return next(err);
  }

  // Check if courses were found
  if (!payments) {
    return next(new HttpError("No payments found.", 500));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Payments found successfully.",
    data: {
      ...payments,
    },
  });
};

export default indexPayments;
