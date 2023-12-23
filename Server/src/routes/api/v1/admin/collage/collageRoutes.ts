import express from "express";
import show from "../../../../../controllers/admin/collage/show";

const collageRouter = express.Router();

collageRouter.get("/:id", show);

export default collageRouter;
