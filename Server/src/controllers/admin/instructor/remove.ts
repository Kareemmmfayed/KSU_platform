import HttpError from "../../../models/httpError";
import { Response, NextFunction } from "express";
import { CollageREQ } from "../../../middlewares/signCollageIdToReq";
import { InstructorModel } from "../../../models/Instructor";

const instructor = new InstructorModel();

const removeInstructor = async (
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

  // Remove instructor
  let removedInstructor;
  try {
    removedInstructor = await instructor.deleteInstructor(id, collageId);
  } catch (err) {
    return next(err);
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Instructor removed successfully",
    data: {
      instructor: removedInstructor,
    },
  });
};

export default removeInstructor;
