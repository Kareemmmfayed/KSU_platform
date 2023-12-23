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
  const courseId = req.params.id;

  // Validate data
  if (!instructorId || !courseId) {
    return next(new HttpError("Invalid id or course id", 400));
  }

  // Retrieve students
  let students;
  try {
    students = await instructor.showInstructorStudents(instructorId, courseId);
  } catch (err) {
    return next(err);
  }

  // Check if students were found
  if (!students) {
    return next(new HttpError("Could not retrieve students", 404));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Students retrieved successfully",
    data: {
      courses: students,
    },
  });
};

export default showInstructorCourses;
