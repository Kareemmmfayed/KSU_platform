import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import CourseModel from "../../../models/Course";

interface REQ extends Request {
  semesterId?: string;
}

const course = new CourseModel();

const removeCourse = async (req: REQ, res: Response, next: NextFunction) => {
  // Get data from body
  const id = req.params.id;

  if (!id) return next(new HttpError("Invalid id", 400));

  let removedCourse;
  try {
    removedCourse = await course.deleteCourse(id);
  } catch (error) {
    return next(error);
  }

  if (!removedCourse) {
    return next(new HttpError("Could not remove course", 500));
  }

  // Send response
  res.status(201).json({
    status: "success",
    message: "Course removd successfully",
    data: {
      course: removedCourse,
    },
  });
};

export default removeCourse;
