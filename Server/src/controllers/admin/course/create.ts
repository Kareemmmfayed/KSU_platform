import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import CourseModel from "../../../models/Course";

interface REQ extends Request {
  semesterId?: string;
}

const course = new CourseModel();

const createCourse = async (req: REQ, res: Response, next: NextFunction) => {
  // Get data from body
  const semesterId = req.semesterId;
  const { name, creditHours, description, code } = req.body;

  if (!semesterId) return next(new HttpError("Invalid semester id", 400));

  // Validate data
  if (!name) {
    return next(new HttpError("Invalid data", 400));
  }

  // Create level
  let newCourse;
  try {
    newCourse = await course.createCourse(
      name,
      creditHours,
      code,
      description,
      semesterId
    );
  } catch (error) {
    return next(error);
  }

  // Check if course was created
  if (!newCourse) {
    return next(new HttpError("Could not create course", 500));
  }

  // Send response
  res.status(201).json({
    status: "success",
    message: "Course created successfully",
    data: {
      course: newCourse,
    },
  });
};

export default createCourse;
