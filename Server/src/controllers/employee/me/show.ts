import HttpError from "../../../models/httpError";
import { Request, Response, NextFunction } from "express";
import EmployeeModel from "../../../models/Employee";
import { CollageModel } from "../../../models/Collage";

interface REQ extends Request {
  userId?: string;
}

const employee = new EmployeeModel();
const collage = new CollageModel();

const show = async (req: REQ, res: Response, next: NextFunction) => {
  // Get authentication data from request
  const authenticatedUserId = req.userId;
  if (!authenticatedUserId) {
    const mes = "Invalid credentials.";
    const statusCode = 400;
    return next(new HttpError(mes, statusCode));
  }
  // Get employee data
  let employeeData;
  try {
    employeeData = await employee.showEmployee(authenticatedUserId);
  } catch (error) {
    return next(error);
  }
  // Check if employee exists
  if (!employeeData) {
    const mes = "Employee not found.";
    const statusCode = 404;
    return next(new HttpError(mes, statusCode));
  }

  // Get collage data
  let collageData;
  const collageId = employeeData.collage_id;
  try {
    collageData = await collage.showCollage(collageId as string);
  } catch (error) {
    return next(error);
  }

  // Check if collage exists
  if (!collageData) {
    const mes = "Collage not found.";
    const statusCode = 404;
    return next(new HttpError(mes, statusCode));
  }

  // Send response
  res.status(200).json({
    status: "success",
    message: "Employee found successfully.",
    data: {
      employee: employeeData,
      collage: collageData,
    },
  });
};

export default show;
