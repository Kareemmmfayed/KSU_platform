import express from "express";
import indexYears from "../../../../../controllers/admin/year";
import createYear from "../../../../../controllers/admin/year/create";
import removeYear from "../../../../../controllers/admin/year/delete";

const yearRoutes = express.Router();

yearRoutes.get("/", indexYears);
yearRoutes.post("/", createYear);
yearRoutes.get("/:id", removeYear);

export default yearRoutes;
