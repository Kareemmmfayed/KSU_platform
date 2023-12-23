import { Router } from "express";
import show from "../../../../../controllers/employee/applicant/show";

const applicantRoutes = Router();

applicantRoutes.get("/:id", show);

export default applicantRoutes;
