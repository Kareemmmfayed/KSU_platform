import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import PaymentModel from "../../../models/Payment";
import StorageModel from "../../../models/Storage";
import { v4 as uuidv4 } from "uuid";

const payment = new PaymentModel();

const payStudentProgramPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get data from body
  const { purchaseNumber, studentId, studentPaymentsId } = req.body;

  if (!purchaseNumber) return next(new HttpError("Invalid data input", 400));

  let updatedStudentPayment;
  try {
    updatedStudentPayment = await payment.updateStudentPayment(
      studentPaymentsId,
      purchaseNumber,
      new Date().toISOString(),
      null
    );
  } catch (error) {
    return next(error);
  }

  if (!updatedStudentPayment) {
    return next(new HttpError("Could not pay:student", 500));
  }

  const uniqueName = uuidv4();
  const path = `/payments/${uniqueName}`;
  const originalName = uniqueName;
  const type = "png";
  const owner = studentId;

  let uploadUrl;
  try {
    const storage = new StorageModel();
    uploadUrl = await storage.createStorage(
      path,
      uniqueName,
      originalName,
      type,
      owner
    );
  } catch (err) {
    const msg = "Could not generate link";
    const statusCode = 500;
    throw new HttpError(msg, statusCode);
  }

  // Send response
  res.status(201).json({
    status: "success",
    message: "payed:student successfully",
    data: {
      studentPayment: updatedStudentPayment,
      fileToUpload: {
        name: originalName,
        type,
        uploadUrl: uploadUrl,
      },
    },
  });
};

export default payStudentProgramPayment;
