import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { ApplicantModel } from "../../../models/Applicant";
import { CollageModel } from "../../../models/Collage";

interface REQ extends Request {
  userId?: string;
}

const applicant = new ApplicantModel();
const collage = new CollageModel();

const show = async (req: REQ, res: Response, next: NextFunction) => {
  // Get authentication data from request
  const authenticatedUserId = req.userId;
  if (!authenticatedUserId) {
    const mes = "Invalid credentials.";
    const statusCode = 400;
    return next(new HttpError(mes, statusCode));
  }
  // Get applicant data
  let applicantData;
  try {
    applicantData = await applicant.showApplicant(authenticatedUserId);
  } catch (error) {
    return next(error);
  }

  // Get collage data
  let collageData;
  try {
    collageData = await collage.indexCollages();
  } catch (error) {
    return next(error);
  }

  // Check if applicant exists
  if (!applicantData) {
    const mes = "applicant not found.";
    const statusCode = 404;
    return next(new HttpError(mes, statusCode));
  }
  // Send response
  res.status(200).json({
    status: "success",
    message: "applicant found successfully.",
    data: {
      applicant: applicantData,
      collage: collageData?.collages[0],
    },
  });
};

export default show;
