import { NextFunction, Request, Response } from "express";
import HttpError from "../../../models/httpError";
import StorageModel from "../../../models/Storage";
import { StudentModel } from "../../../models/Student";

const student = new StudentModel();
const storage = new StorageModel();

const showStudent = async (req: Request, res: Response, next: NextFunction) => {
  const studentId = req.params.id;

  if (!studentId) throw new HttpError("Invalid student id", 501);

  let result;
  try {
    result = await student.showStudent(studentId);
  } catch (err) {
    console.log(err);
    const msg = "Cannot retrieve student right now";
    const statusCode = 500;
    return next(new HttpError(msg, statusCode));
  }

  const studentFiles = storage.findStorageByOwnerId(studentId);

  // Send response
  res.status(200).json({
    status: "success",
    message: "Student retrieved successfully.",
    data: {
      student: result,
      files: studentFiles,
    },
  });
};

export default showStudent;
