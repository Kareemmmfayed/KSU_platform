import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import LevelModel from "../../../models/Level";

interface REQ extends Request {
  programId?: string;
}

const level = new LevelModel();

const removeLevel = async (req: REQ, res: Response, next: NextFunction) => {
  // Get data from body
  const id = req.params.id;

  if (!id) return next(new HttpError("Invalid id", 400));

  let removedLevel;
  try {
    removedLevel = await level.deleteLevel(id);
  } catch (error) {
    return next(error);
  }

  if (!removedLevel) {
    return next(new HttpError("Could not remove level", 500));
  }

  // Send response
  res.status(201).json({
    status: "success",
    message: "Level removd successfully",
    data: {
      level: removedLevel,
    },
  });
};

export default removeLevel;
