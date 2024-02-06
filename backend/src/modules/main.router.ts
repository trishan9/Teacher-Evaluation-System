import { Router } from "express";

import schoolRouter from "./school/school.routes";
import teacherRouter from "./teacher/teacher.routes";
import surveyRouter from "./survey/survey.routes";
import isAuthenticated from "@/middlewares/auth.middleware";

const router = Router();

router.use("/school", schoolRouter);
router.use("/teacher", isAuthenticated, teacherRouter);
router.use("/survey", surveyRouter);

export default router;
