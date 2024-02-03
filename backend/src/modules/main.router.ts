import { Router } from "express";

import authRouter from "./auth/auth.routes";

import isAuthenticated from "../middlewares/auth.middleware.js";

const router = Router();

router.use("/auth", authRouter);
// router.use("/workouts", isAuthenticated, workoutRouter)

export default router;
