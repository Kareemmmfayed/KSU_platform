import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import CourseModel from "../../../models/Course";

interface REQ extends Request {
  courseId?: string;
}

const course = new CourseModel();

const assignCourseToInstructor = async (
  req: REQ,
  res: Response,
  next: NextFunction
) => {
  // Get data from body
  const { instructorId, yearId } = req.body;
  const { id } = req.params;

  if (!id) return next(new HttpError("Invalid course id", 400));

  if (!instructorId || !yearId)
    return next(new HttpError("Invalid data input", 400));

  let result;
  try {
    result = await course.addInstructorCourse(instructorId, id, yearId);
  } catch (error) {
    return next(error);
  }

  if (!result) {
    return next(new HttpError("Could not add course to instructor", 500));
  }

  // Send response
  res.status(201).json({
    status: "success",
    message: "Course added to intructor successfully",
    data: {
      ...result,
    },
  });
};

export default assignCourseToInstructor;
