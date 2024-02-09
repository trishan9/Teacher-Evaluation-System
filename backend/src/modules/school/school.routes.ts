import { Router } from "express";

import SchoolController from "./school.controller";
import { upload } from "@/middlewares/multer.middleware";
import isAuthenticated from "@/middlewares/auth.middleware";

const schoolRouter = Router();

schoolRouter.post("/", upload.single("logo"), SchoolController.createSchool);
schoolRouter.patch(
  "/:id",
  upload.single("logo"),
  SchoolController.updateSchool
);
schoolRouter.get("/", SchoolController.getSchools);
schoolRouter.get("/:id", SchoolController.getSchoolById);
schoolRouter.get("/me", isAuthenticated, SchoolController.getSchool);
schoolRouter.delete("/:id", SchoolController.deleteSchool);

export default schoolRouter;
