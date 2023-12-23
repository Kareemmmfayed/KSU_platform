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
  let applicationStatusFilter = req.query.applicationStatusFilter as string;

  const { userId, programId } = req;

  if (applicationStatusFilter === "firstAcceptance") {
    applicationStatusFilter = "first acceptance";
  }

  if (applicationStatusFilter === "finalAcceptance") {
    applicationStatusFilter = "final acceptance";
  }

  let result;
  try {
    result = await applicationModel.indexApplicationsByProgramId(
      programId as string,
      page,
      limit
    );
  } catch (error) {
    console.log("high");
    console.log(error);
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
