import { NextFunction, Request, Response } from "express";
import HttpError from "../../../models/httpError";
import { StudentModel } from "../../../models/Student";

interface REQ extends Request {
  userId?: string;
  role?: string;
}

const student = new StudentModel();

const showMeStudent = async (req: REQ, res: Response, next: NextFunction) => {
  // Get authentication data from request
  const authenticatedUserId = req.userId;
  if (!authenticatedUserId) {
    const mes = "Invalid credentials.";
    const statusCode = 400;
    return next(new HttpError(mes, statusCode));
  }
  // Get student data
  let studentData;
  try {
    studentData = await student.showStudent(authenticatedUserId);
  } catch (error) {
    return next(error);
  }
  // Check if student exists
  if (!studentData) {
    const mes = "Student not found.";
    const statusCode = 404;
    return next(new HttpError(mes, statusCode));
  }
  // Send response
  res.status(200).json({
    status: "success",
    message: "Student found successfully.",
    data: {
      student: {
        id: studentData.id,
        name: studentData.name,
        email: studentData.email,
      },
    },
  });
};

export default showMeStudent;
