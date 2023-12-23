import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import LevelModel from "../../../models/Level";

const level = new LevelModel();

const indexLevels = async (req: Request, res: Response, next: NextFunction) => {
  // page and limit
  const page = req.query.page ? parseInt(req.query.page as string) : NaN;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : NaN;

  let levels;
  try {
    levels = await level.indexLevel(page, limit);
  } catch (err) {
    return next(err);
  }

  // Check if levels were found
  if (!levels || levels.count === 0) {
    return next(new HttpError("No levels found.", 500));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Levels found successfully.",
    data: {
      ...levels,
    },
  });
};

export default indexLevels;
