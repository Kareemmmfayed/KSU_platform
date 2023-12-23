import HttpError from "../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { StudentModel } from "../../models/Student";

interface REQ extends Request {
  userId?: string;
  role?: string;
}

const student = new StudentModel();

const validateStudent = async (req: REQ, res: Response, next: NextFunction) => {
  // Get authentication data from request
  const authenticatedUserId = req.userId;
  const authenticatedUserRole = req.role;
  // Check if user is authenticated
  if (!authenticatedUserId || !authenticatedUserRole) {
    const mes = "Invalid credentials.";
    const statusCode = 400;
    return next(new HttpError(mes, statusCode));
  }
  // Check if user is student
  if (authenticatedUserRole !== "student") {
    const mes = "Unauthorized.";
    const statusCode = 401;
    return next(new HttpError(mes, statusCode));
  }

  // Check if student exists
  let studentData;
  try {
    studentData = await student.showStudent(authenticatedUserId);
  } catch (error) {
    const mes = "Unauthorized.";
    const statusCode = 401;
    return next(new HttpError(mes, statusCode));
  }

  if (!studentData) {
    const mes = "Unauthorized.";
    const statusCode = 401;
    return next(new HttpError(mes, statusCode));
  }

  next();
};

export default validateStudent;
