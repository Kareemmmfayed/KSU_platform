import { NextFunction, Request, Response } from "express";
import CourseModel from "../../models/Course";
import HttpError from "../../models/httpError";

const course = new CourseModel();

const showCourse = async (req: Request, res: Response, next: NextFunction) => {
  const courseId = req.params.id;

  if (!courseId) throw new HttpError("Invalid course id", 400);

  let courseResult;
  try {
    courseResult = await course.showCourse(courseId);
  } catch (err) {
    return next(err);
  }

  if (!courseResult) {
    return next(new HttpError("No course with such ID", 500));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Course retrieved successfully.",
    data: {
      course: courseResult,
    },
  });
};

export default showCourse;
