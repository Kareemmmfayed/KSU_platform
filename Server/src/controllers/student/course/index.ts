import { NextFunction, Request, Response } from "express";
import HttpError from "../../../models/httpError";
import { StudentModel } from "../../../models/Student";

const student = new StudentModel();

const indexStudentCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const studentId = req.body.studentId;

  if (!studentId) throw new HttpError("Invalid student id", 400);

  let courses;
  try {
    courses = await student.showStudentCourses(studentId);
  } catch (err) {
    return next(err);
  }

  // Check if admins were found
  if (!courses || courses.count === 0) {
    return next(new HttpError("No courses found.", 500));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Courses found successfully.",
    data: {
      ...courses,
    },
  });
};

export default indexStudentCourses;
