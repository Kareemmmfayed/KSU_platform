import { NextFunction, Request, Response } from "express";
import HttpError from "../../../models/httpError";
import { InstructorModel } from "../../../models/Instructor";

interface REQ extends Request {
  userId?: string;
  role?: string;
}

const instructor = new InstructorModel();

const showMeInstructor = async (
  req: REQ,
  res: Response,
  next: NextFunction
) => {
  // Get authentication data from request
  const authenticatedUserId = req.userId;
  if (!authenticatedUserId) {
    const mes = "Invalid credentials.";
    const statusCode = 400;
    return next(new HttpError(mes, statusCode));
  }
  // Get instructor data
  let instructorData;
  try {
    instructorData = await instructor.showInstructor(authenticatedUserId);
  } catch (error) {
    return next(error);
  }
  // Check if instructor exists
  if (!instructorData) {
    const mes = "Instructor found.";
    const statusCode = 404;
    return next(new HttpError(mes, statusCode));
  }
  // Send response
  res.status(200).json({
    status: "success",
    message: "Instructor found successfully.",
    data: {
      instructor: {
        id: instructorData.id,
        name: instructorData.name,
        email: instructorData.email,
      },
    },
  });
};

export default showMeInstructor;
