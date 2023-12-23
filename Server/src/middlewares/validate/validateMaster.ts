import HttpError from "../../models/httpError";
import { Request, Response, NextFunction } from "express";
import { MasterModel } from "../../models/Master";

interface REQ extends Request {
  userId?: string;
  role?: string;
}

const master = new MasterModel();

const validateMaster = async (req: REQ, res: Response, next: NextFunction) => {
  // Get authentication data from request
  const authenticatedUserId = req.userId;
  const authenticatedUserRole = req.role;
  // Check if user is authenticated
  if (!authenticatedUserId || !authenticatedUserRole) {
    const mes = "Invalid credentials.";
    const statusCode = 400;
    return next(new HttpError(mes, statusCode));
  }

  // Check if user is master
  if (authenticatedUserRole !== "master") {
    const mes = "Unauthorized.";
    const statusCode = 401;
    return next(new HttpError(mes, statusCode));
  }

  // Check if master exists
  let masterData;
  try {
    masterData = await master.showMaster(authenticatedUserId);
  } catch (error) {
    const mes = "Unauthorized.";
    const statusCode = 401;
    return next(new HttpError(mes, statusCode));
  }

  if (!masterData) {
    const mes = "Unauthorized.";
    const statusCode = 401;
    return next(new HttpError(mes, statusCode));
  }

  next();
};

export default validateMaster;
