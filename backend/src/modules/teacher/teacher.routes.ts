import { Router } from "express";

import TeacherController from "./teacher.controller";

const teacherRouter = Router();

teacherRouter.post("/", TeacherController.addTeacher);
teacherRouter.patch("/:id", TeacherController.updateTeacher);
teacherRouter.delete("/:id", TeacherController.deleteTeacher);

export default teacherRouter;
