import { Router } from "express";

import ParticipateSurveyController from "./controller";

const participateSurveyRouter = Router();

participateSurveyRouter.patch(
  "/:id",
  ParticipateSurveyController.participateSurvey
);

export default participateSurveyRouter;
