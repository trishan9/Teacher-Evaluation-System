import { Router } from "express";

import ParticipateSurveyController from "./controller";

const participateSurveyRouter = Router();

participateSurveyRouter.patch(
  "/step1/:id",
  ParticipateSurveyController.participateSurveyStep1
);
participateSurveyRouter.patch(
  "/step1/update/:id",
  ParticipateSurveyController.participateSurveyStep1Update
);

export default participateSurveyRouter;
