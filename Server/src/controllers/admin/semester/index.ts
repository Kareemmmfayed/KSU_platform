import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import SemesterModel from "../../../models/Semester";

const semester = new SemesterModel();

const indexSemester = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // page and limit
  const page = req.query.page ? parseInt(req.query.page as string) : NaN;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : NaN;

  let semesters;
  try {
    semesters = await semester.indexSemester(page, limit);
  } catch (err) {
    return next(err);
  }

  // Check if semesters were found
  if (!semesters || semesters.count === 0) {
    return next(new HttpError("No semeseters found.", 500));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Semeseters  found successfully.",
    data: {
      ...semesters,
    },
  });
};

export default indexSemester;
