import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import YearModel from "../../../models/Year";

const year = new YearModel();

const removeYear = async (req: Request, res: Response, next: NextFunction) => {
  // Get data from body
  const yearId = req.params.id;

  if (!yearId) return next(new HttpError("Invalid id", 400));

  let removedYear;
  try {
    removedYear = await year.deleteYear(yearId);
  } catch (error) {
    return next(error);
  }

  if (!removedYear) {
    return next(new HttpError("Could not remove year", 500));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Year removd successfully",
    data: {
      year: removedYear,
    },
  });
};

export default removeYear;
