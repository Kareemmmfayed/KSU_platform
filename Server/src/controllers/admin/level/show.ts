import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import LevelModel from "../../../models/Level";

const level = new LevelModel();

const showLevel = async (req: Request, res: Response, next: NextFunction) => {
  // Get data from body
  const id = req.params.id;

  // Validate data
  if (!id) {
    return next(new HttpError("Invalid id", 400));
  }

  // Retrieve level
  let retrievedLevel;
  try {
    retrievedLevel = await level.showLevel(id);
  } catch (err) {
    return next(err);
  }

  // Check if level was found
  if (!retrievedLevel) {
    return next(new HttpError("Could not retrieve level", 404));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "level retrieved successfully",
    data: {
      level: retrievedLevel,
    },
  });
};

export default showLevel;
