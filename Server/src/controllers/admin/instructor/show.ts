import HttpError from "../../../models/httpError";
import { Response, NextFunction } from "express";
import { CollageREQ } from "../../../middlewares/signCollageIdToReq";
import { InstructorModel } from "../../../models/Instructor";

const instructor = new InstructorModel();

const showInstructor = async (
  req: CollageREQ,
  res: Response,
  next: NextFunction
) => {
  // Get data from body
  const id = req.params.id;
  const collageId = req.collageId;

  // Validate data
  if (!id || !collageId) {
    return next(new HttpError("Invalid id or collage id", 400));
  }

  // Retrieve instructor
  let retrievedInstructor;
  try {
    retrievedInstructor = await instructor.showInstructor(id, collageId);
  } catch (err) {
    return next(err);
  }

  // Check if instructor was found
  if (!retrievedInstructor) {
    return next(new HttpError("Could not retrieve instructor", 404));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Instructor retrieved successfully",
    data: {
      instructor: retrievedInstructor,
    },
  });
};

export default showInstructor;
