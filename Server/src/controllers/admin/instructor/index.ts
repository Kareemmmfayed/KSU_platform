import HttpError from "../../../models/httpError";
import { Response, NextFunction } from "express";
import { InstructorModel } from "../../../models/Instructor";
import { CollageREQ } from "../../../middlewares/signCollageIdToReq";

const instructor = new InstructorModel();

const indexIntructor = async (
  req: CollageREQ,
  res: Response,
  next: NextFunction
) => {
  // page and limit
  const page = req.query.page ? parseInt(req.query.page as string) : NaN;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : NaN;
  const collageId = req.collageId;

  let instructors;
  try {
    instructors = await instructor.indexInstructor(page, limit, collageId!);
  } catch (err) {
    return next(err);
  }

  // Check if instructors were found
  if (!instructors || instructors.count === 0) {
    return next(new HttpError("No instructors found.", 500));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Instructors found successfully.",
    data: {
      ...instructors,
    },
  });
};

export default indexIntructor;
