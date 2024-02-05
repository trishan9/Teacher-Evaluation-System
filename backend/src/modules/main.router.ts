import { Router } from "express";

import schoolRouter from "./school/school.routes";
import teacherRouter from "./teacher/teacher.routes";
import isAuthenticated from "@/middlewares/auth.middleware";

const router = Router();

router.use("/school", schoolRouter);
router.use("/teacher", isAuthenticated, teacherRouter);

export default router;
