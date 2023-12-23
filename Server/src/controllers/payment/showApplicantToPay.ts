import HttpError from "../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { ApplicantModel } from "../../models/Applicant";

const applicant = new ApplicantModel();

const showApplicantToPay = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Validate acccess key
  const { access_key } = req.body;
  if (!access_key) {
    const mes = "Access key is required.";
    const statusCode = 400;
    return next(new HttpError(mes, statusCode));
  }

  // Compare access key
  const validAccessKey = process.env.PAYMENT_ACCESS_KEY;
  if (access_key !== validAccessKey) {
    const mes = "Invalid access key.";
    const statusCode = 400;
    return next(new HttpError(mes, statusCode));
  }

  // Get national id from request params
  const { nationalId } = req.params;

  // Get applicant to pay
  let applicantData;
  try {
    applicantData = await applicant.showByNationalId(nationalId);
  } catch (error) {
    return next(error);
  }

  // Check if applicant was found
  if (!applicantData) {
    return next(new HttpError("Applicant not found.", 404));
  }

  // Get the current academic year
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  // Send response
  res.status(200).json({
    status: "success",
    message: "Applicant found successfully.",
    data: {
      applicant: {
        national_id: applicantData.national_id,
        name: applicantData.name,
        email: applicantData.email,
        gender: applicantData.gender,
        academic_year: `${currentYear}-${nextYear}`,
        level: 1,
        code: applicantData.id,
        academic_years: [
          {
            year: `${currentYear - 1}-${currentYear}`,
            current_year: false,
            grad_year: false,
            code: 1,
          },
          {
            year: `${currentYear}-${nextYear}`,
            current_year: true,
            grad_year: false,
            code: 2,
          },
          {
            year: `${nextYear}-${nextYear + 1}`,
            current_year: false,
            grad_year: true,
            code: 3,
          },
        ],
      },
    },
  });
};

export default showApplicantToPay;
