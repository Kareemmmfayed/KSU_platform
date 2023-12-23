import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { CollageREQ } from "../../../middlewares/signCollageIdToReq";
import { InstructorModel } from "../../../models/Instructor";

const instructor = new InstructorModel();

const updateInstructor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get data from body
  const id = req.params.id;
  const collageId = (req as CollageREQ).collageId;
  const { name, password, email } = req.body;

  // Validate collage id
  if (!collageId) return next(new HttpError("Invalid collage id", 400));

  // Validate data
  if (!name && !password && !email) {
    return next(new HttpError("Please provide name or password", 400));
  }

  // Update instructor
  let updatedInstructor;
  try {
    updatedInstructor = await instructor.updateInstructor(
      id,
      name,
      password,
      email,
      collageId
    );
  } catch (err) {
    return next(err);
  }

  // Check if instructor was updated
  if (!updatedInstructor) {
    return next(new HttpError("Could not update instructor", 500));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Instructor updated successfully",
    data: {
      instructor: updatedInstructor,
    },
  });
};

export default updateInstructor;
