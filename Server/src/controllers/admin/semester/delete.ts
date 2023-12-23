import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import SemesterModel from "../../../models/Semester";

interface REQ extends Request {
  levelId?: string;
}

const semester = new SemesterModel();

const removeSemester = async (req: REQ, res: Response, next: NextFunction) => {
  // Get data from body
  const id = req.params.id;

  if (!id) return next(new HttpError("Invalid id", 400));

  let removedSemester;
  try {
    removedSemester = await semester.deleteSemester(id);
  } catch (error) {
    return next(error);
  }

  if (!removedSemester) {
    return next(new HttpError("Could not remove semester", 500));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Semester removd successfully",
    data: {
      semester: removedSemester,
    },
  });
};

export default removeSemester;
