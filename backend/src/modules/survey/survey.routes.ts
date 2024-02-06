import { Router } from "express";

import SurveyController from "./survey.controller";
import isAuthenticated from "@/middlewares/auth.middleware";
import participateSurveyRouter from "./participate/routes";

const surveyRouter = Router();

surveyRouter.use("/participate", participateSurveyRouter);
surveyRouter.post("/", isAuthenticated, SurveyController.createSurvey);
surveyRouter.get("/:id", SurveyController.getSurveyBySurveyId);
surveyRouter.patch("/:id", isAuthenticated, SurveyController.updateSurvey);
surveyRouter.delete("/:id", isAuthenticated, SurveyController.deleteSurvey);

export default surveyRouter;
