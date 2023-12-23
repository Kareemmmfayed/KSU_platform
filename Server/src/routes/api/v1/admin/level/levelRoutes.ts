import express from "express";
import indexLevels from "../../../../../controllers/admin/level";
import createLevel from "../../../../../controllers/admin/level/create";
import removeLevel from "../../../../../controllers/admin/level/delete";
import showLevel from "../../../../../controllers/admin/level/show";

const levelRouter = express.Router();

levelRouter.get("/", indexLevels);
levelRouter.post("/", createLevel);
levelRouter.get("/:id", showLevel);
levelRouter.delete("/:id", removeLevel);

export default levelRouter;
