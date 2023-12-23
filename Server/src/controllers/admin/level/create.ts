import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import LevelModel from "../../../models/Level";

interface REQ extends Request {
  programId?: string;
}

const level = new LevelModel();

const createLevel = async (req: REQ, res: Response, next: NextFunction) => {
  // Get data from body
  const programId = req.programId;
  const { name } = req.body;

  if (!programId) return next(new HttpError("Invalid program id", 400));

  // Validate data
  if (!name) {
    return next(new HttpError("Invalid data", 400));
  }

  // Create level
  let newLevel;
  try {
    newLevel = await level.createLevel(name, programId);
  } catch (error) {
    return next(error);
  }

  // Check if level was created
  if (!newLevel) {
    return next(new HttpError("Could not create level", 500));
  }

  // Send response
  res.status(201).json({
    status: "success",
    message: "Level created successfully",
    data: {
      level: newLevel,
    },
  });
};

export default createLevel;
