import { Router } from "express";
import indexIntructor from "../../../../../controllers/admin/instructor";
import createInstructor from "../../../../../controllers/admin/instructor/create";
import removeInstructor from "../../../../../controllers/admin/instructor/remove";
import showInstructor from "../../../../../controllers/admin/instructor/show";
import updateInstructor from "../../../../../controllers/admin/instructor/update";

const instructorRoutes = Router();

instructorRoutes.get("/", indexIntructor);
instructorRoutes.post("/", createInstructor);
instructorRoutes.get("/:id", showInstructor);
instructorRoutes.put("/:id", updateInstructor);
instructorRoutes.delete("/:id", removeInstructor);

export default instructorRoutes;
