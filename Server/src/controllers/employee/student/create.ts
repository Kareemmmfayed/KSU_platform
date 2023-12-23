import { NextFunction, Request, Response } from "express";
import HttpError from "../../../models/httpError";
import { StudentModel } from "../../../models/Student";

interface REQ extends Request {
  collageId?: string;
}

const student = new StudentModel();

const createStudent = async (req: REQ, res: Response, next: NextFunction) => {
  const collageId = req.collageId;
  const applicantId = req.body.applicantId;

  if (!collageId || !applicantId)
    throw new HttpError("Invalid collage id or applicant id", 501);

  let result;
  // try {
  result = await student.createStudent(applicantId, collageId);
  // } catch (err) {
  //   console.log(err);
  //   const msg = "Cannot create student right now";
  //   const statusCode = 500;
  //   return next(new HttpError(msg, statusCode));
  // }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Student created successfully.",
    data: {
      student: result,
    },
  });
};

export default createStudent;
