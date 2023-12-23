import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { CollageModel } from "../../../models/Collage";

interface REQ extends Request {
  userId?: string;
  role?: string;
  collageId?: string;
}

const collage = new CollageModel();

const show = async (req: REQ, res: Response, next: NextFunction) => {
  // Get collage id from request params
  const { id: collageId } = req.params;

  // Get collage
  let fetchedCollage;
  try {
    fetchedCollage = await collage.showCollage(collageId);
  } catch (error) {
    const mes = `Could not show collage. ${(error as HttpError).message}`;
    const statusCode = 500;
    return next(new HttpError(mes, statusCode));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Collage fetched successfully",
    data: {
      collage: fetchedCollage,
    },
  });
};

export default show;
