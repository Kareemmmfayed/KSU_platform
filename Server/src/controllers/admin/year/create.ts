import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import YearModel from "../../../models/Year";

const year = new YearModel();

const createYear = async (req: Request, res: Response, next: NextFunction) => {
  // Get data from body
  const { name, notes } = req.body;

  // Validate data
  if (!name) {
    return next(new HttpError("Invalid data", 400));
  }

  // Create year
  let newYear;
  try {
    newYear = await year.createYear(name, notes);
  } catch (error) {
    return next(error);
  }

  // Check if year was created
  if (!newYear) {
    return next(new HttpError("Could not create year", 500));
  }

  // Send response
  res.status(201).json({
    status: "success",
    message: "Year created successfully",
    data: {
      year: newYear,
    },
  });
};

export default createYear;
