import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { InstructorModel } from "../../../models/Instructor";

const instructor = new InstructorModel();

const showInstructorCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get data from body
  const { instructorId } = req.body;

  // Validate data
  if (!instructorId) {
    return next(new HttpError("Invalid id", 400));
  }

  // Retrieve courses
  let courses;
  try {
    courses = await instructor.showInstructorCourses(instructorId);
  } catch (err) {
    return next(err);
  }

  // Check if courses was found
  if (!courses) {
    return next(new HttpError("Could not retrieve courses", 404));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Courses retrieved successfully",
    data: {
      courses,
    },
  });
};

export default showInstructorCourses;
