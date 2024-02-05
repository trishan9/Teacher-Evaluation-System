import { Router } from "express";

import SchoolController from "./school.controller";
import { upload } from "@/middlewares/multer.middleware";

const schoolRouter = Router();

schoolRouter.post("/", upload.single("logo"), SchoolController.createSchool);
schoolRouter.patch(
  "/:id",
  upload.single("logo"),
  SchoolController.updateSchool
);
schoolRouter.get("/", SchoolController.getSchools);
schoolRouter.delete("/:id", SchoolController.deleteSchool);

export default schoolRouter;
