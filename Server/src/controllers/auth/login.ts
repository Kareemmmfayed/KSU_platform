import { MasterModel } from "../../models/Master";
import { AdminModel } from "../../models/Admin";
import HttpError from "../../models/httpError";
import { Request, Response, NextFunction } from "express";
import generateAuthTokens from "../../utils/generateAuthTokens";
import validator from "validator";
import EmployeeModel from "../../models/Employee";
import { ApplicantModel } from "../../models/Applicant";
import { StudentModel } from "../../models/Student";
import { InstructorModel } from "../../models/Instructor";

const master = new MasterModel();
const admin = new AdminModel();
const employee = new EmployeeModel();
const applicant = new ApplicantModel();
const student = new StudentModel();
const insructor = new InstructorModel();

const login = async (req: Request, res: Response, next: NextFunction) => {
  // get data from request body
  const { email, password, role } = req.body;

  // validate data
  if (!email || !password || !role) {
    const mes = "Invalid input.";
    const statusCode = 400;
    return next(new HttpError(mes, statusCode));
  }

  // validate email
  if (!validator.isEmail(email)) {
    const mes = "Invalid email.";
    const statusCode = 400;
    return next(new HttpError(mes, statusCode));
  }

  // Authenticate user
  let authenticatedUserId;
  switch (role) {
    case "master":
      // authenticate master
      try {
        const masterData = await master.authenticateMaster(email, password);
        authenticatedUserId = masterData.id;
      } catch (error) {
        return next(error);
      }
      break;
    case "admin":
      // authenticate admin
      try {
        const adminData = await admin.authenticateAdmin(email, password);
        authenticatedUserId = adminData.id;
      } catch (error) {
        return next(error);
      }
      break;
    case "applicant":
      // authenticate applicant
      try {
        const applicantData = await applicant.authenticateApplicant(
          email,
          password
        );
        authenticatedUserId = applicantData.id;
      } catch (error) {
        return next(error);
      }
      break;
    case "employee":
      // authenticate employee
      try {
        const employeeData = await employee.authenticateEmployee(
          email,
          password
        );
        authenticatedUserId = employeeData.id;
      } catch (error) {
        return next(error);
      }
      break;
    case "student":
      // authenticate student
      try {
        const studentData = await student.authenticateStudent(email, password);
        authenticatedUserId = studentData.id;
      } catch (error) {
        return next(error);
      }
      break;
    case "instructor":
      // authenticate insructor
      try {
        const instructorData = await insructor.authenticateInstructor(
          email,
          password
        );
        authenticatedUserId = instructorData.id;
      } catch (error) {
        return next(error);
      }
      break;

    default:
      const mes = "Invalid role.";
      const statusCode = 400;
      next(new HttpError(mes, statusCode));
      break;
  }

  // Check if user is authenticated
  if (!authenticatedUserId) {
    const mes = "Invalid credentials.";
    const statusCode = 400;
    return next(new HttpError(mes, statusCode));
  }

  // generate auth tokens
  let tokens;
  try {
    tokens = generateAuthTokens(authenticatedUserId, role);
  } catch (error) {
    return next(error);
  }

  // send response
  res.status(200).json({
    status: "success",
    message: "User authenticated successfully.",
    data: {
      user: {
        id: authenticatedUserId,
        role,
      },
      tokens,
    },
  });
};

export default login;
