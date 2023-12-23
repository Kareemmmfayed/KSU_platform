import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import SemesterModel from "../../../models/Semester";

interface REQ extends Request {
  levelId?: string;
}

const semester = new SemesterModel();

const createSemester = async (req: REQ, res: Response, next: NextFunction) => {
  // Get data from body
  const levelId = req.levelId;
  const { name } = req.body;

  if (!levelId) return next(new HttpError("Invalid program id", 400));

  // Validate data
  if (!name) {
    return next(new HttpError("Invalid data", 400));
  }

  // Create level
  let newSemester;
  try {
    newSemester = await semester.createSemester(name, levelId);
  } catch (error) {
    return next(error);
  }

  // Check if level was created
  if (!newSemester) {
    return next(new HttpError("Could not create semester", 500));
  }

  // Send response
  res.status(201).json({
    status: "success",
    message: "Semester created successfully",
    data: {
      semester: newSemester,
    },
  });
};

export default createSemester;
