import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import SemesterModel from "../../../models/Semester";

const semester = new SemesterModel();

const showSemester = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get data from body
  const id = req.params.id;

  // Validate data
  if (!id) {
    return next(new HttpError("Invalid id", 400));
  }

  // Retrieve semester
  let retrievedSemester;
  try {
    retrievedSemester = await semester.showSemester(id);
  } catch (err) {
    return next(err);
  }

  // Check if semester was found
  if (!retrievedSemester) {
    return next(new HttpError("Could not retrieve semester ", 404));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "semester retrieved successfully",
    data: {
      semester: retrievedSemester,
    },
  });
};

export default showSemester;
