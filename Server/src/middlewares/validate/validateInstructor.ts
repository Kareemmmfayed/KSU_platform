import HttpError from "../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { InstructorModel } from "../../models/Instructor";

interface REQ extends Request {
  userId?: string;
  role?: string;
}

const instructor = new InstructorModel();

const validateInstructor = async (
  req: REQ,
  res: Response,
  next: NextFunction
) => {
  // Get authentication data from request
  const authenticatedUserId = req.userId;
  const authenticatedUserRole = req.role;
  // Check if user is authenticated
  if (!authenticatedUserId || !authenticatedUserRole) {
    const mes = "Invalid credentials.";
    const statusCode = 400;
    return next(new HttpError(mes, statusCode));
  }
  // Check if user is instructor
  if (authenticatedUserRole !== "instructor") {
    const mes = "Unauthorized.";
    const statusCode = 401;
    return next(new HttpError(mes, statusCode));
  }

  // Check if instructor exists
  let instructorData;
  try {
    instructorData = await instructor.showInstructor(authenticatedUserId);
  } catch (error) {
    const mes = "Unauthorized.";
    const statusCode = 401;
    return next(new HttpError(mes, statusCode));
  }

  if (!instructorData) {
    const mes = "Unauthorized.";
    const statusCode = 401;
    return next(new HttpError(mes, statusCode));
  }

  next();
};

export default validateInstructor;
