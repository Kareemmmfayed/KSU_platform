import { NextFunction, Request, Response } from "express";
import HttpError from "../../../models/httpError";
import { StudentModel } from "../../../models/Student";

const student = new StudentModel();

const indexStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = req.query.page ? parseInt(req.query.page as string) : NaN;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : NaN;
  let students;
  try {
    students = await student.indexStudent(page, limit);
  } catch (err) {
    return next(err);
  }

  // Check if students were found
  if (!students || students.count === 0) {
    return next(new HttpError("No students found.", 500));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Students found successfully.",
    data: {
      ...students,
    },
  });
};

export default indexStudents;
