import { NextFunction, Request, Response } from "express";
import CourseModel from "../../../models/Course";
import HttpError from "../../../models/httpError";
import PaymentModel from "../../../models/Payment";

const course = new CourseModel();
const payment = new PaymentModel();

const applyToCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const courseId = req.params.id;
  const studentId = req.body.studentId;

  if (!courseId || !studentId)
    return new HttpError("Invalid course id or student id", 401);

  try {
    const isPayed = payment.checkStudentPayed(studentId);
    if (!isPayed) return new HttpError("Student did not payed", 500);
  } catch (err) {
    return new HttpError(err as string, 404);
  }

  let result;
  try {
    result = await course.applyToCourse(studentId, courseId);
  } catch (err) {
    const msg = (err as any).message;
    const statusCode = 500;
    return next(new HttpError(msg, statusCode));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Applied to course successfully.",
    data: {
      course: result,
    },
  });
};

export default applyToCourse;
