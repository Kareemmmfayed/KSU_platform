import { NextFunction, Request, Response } from "express";
import CourseModel from "../../models/Course";
import HttpError from "../../models/httpError";

const course = new CourseModel();

const indexCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = req.query.page ? parseInt(req.query.page as string) : NaN;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : NaN;
  let courses;
  try {
    courses = await course.indexCourse(page, limit);
  } catch (err) {
    return next(err);
  }

  // Check if courses were found
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

export default indexCourses;
