import { Router } from "express";

import schoolRouter from "./school/school.routes";

import isAuthenticated from "../middlewares/auth.middleware.js";

const router = Router();

router.use("/school", schoolRouter);
// router.use("/workouts", isAuthenticated, workoutRouter)

export default router;
