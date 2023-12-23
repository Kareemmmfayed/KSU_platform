import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { CollageREQ } from "../../../middlewares/signCollageIdToReq";
import { InstructorModel } from "../../../models/Instructor";

const instructor = new InstructorModel();

const createInstructor = async (
  req: CollageREQ,
  res: Response,
  next: NextFunction
) => {
  // Get data from body
  const collageId = req.collageId;
  const { name, email, password } = req.body;

  if (!collageId) return next(new HttpError("Invalid collage id", 400));

  // Validate data
  if (!name || !email || !password) {
    return next(new HttpError("Invalid data", 400));
  }

  // Create employee
  let newInstructor;
  try {
    newInstructor = await instructor.createInstructor(
      name,
      email,
      password,
      collageId
    );
  } catch (error) {
    return next(error);
  }

  // Check if instructor was created
  if (!newInstructor) {
    return next(new HttpError("Could not create employee", 500));
  }

  // Send response
  res.status(201).json({
    status: "success",
    message: "Instructor created successfully",
    data: {
      instructor: newInstructor,
    },
  });
};

export default createInstructor;
