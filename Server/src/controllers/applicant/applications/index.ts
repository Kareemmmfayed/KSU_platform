import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { ApplicationModel } from "../../../models/Application";

interface REQ extends Request {
  userId?: string;
  programId?: string;
}

const applicationModel = new ApplicationModel();

const index = async (req: REQ, res: Response, next: NextFunction) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string) : NaN;
  const page = req.query.page ? parseInt(req.query.page as string) : NaN;

  const { userId, programId } = req;

  if (!userId || !programId) {
    const msg = "Invalid user id or program id";
    const statusCode = 400;
    throw new HttpError(msg, statusCode);
  }

  let result;
  try {
    result = await applicationModel.indexApplicationsByApplicantId(
      userId as string,
      page,
      limit,
      programId
    );
  } catch (error) {
    const mes = "Could not index applications.";
    const statusCode = 500;
    return next(new HttpError(mes, statusCode));
  }

  res.json({
    status: "success",
    message: "Applications indexed.",
    data: {
      ...result,
    },
  });
};

export default index;
