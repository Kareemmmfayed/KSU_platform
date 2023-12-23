import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import YearModel from "../../../models/Year";

const year = new YearModel();

const indexYears = async (req: Request, res: Response, next: NextFunction) => {
  // page and limit
  const page = req.query.page ? parseInt(req.query.page as string) : NaN;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : NaN;

  let years;
  try {
    years = await year.indexYear(page, limit);
  } catch (err) {
    return next(err);
  }

  // Check if years were found
  if (!years || years.count === 0) {
    return next(new HttpError("No years found.", 500));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Years found successfully.",
    data: {
      ...years,
    },
  });
};

export default indexYears;
