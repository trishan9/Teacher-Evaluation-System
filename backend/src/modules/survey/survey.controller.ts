import { Request, Response } from "express";
import SurveyService from "./survey.service";

const getSurveyBySurveyId = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const survey = await SurveyService.getSurveyBySurveyId(id);
    res.json({
      success: true,
      data: survey,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
};

const createSurvey = async (req: Request, res: Response) => {
  const schoolId = res.locals.school.id;
  const payload = req.body;

  try {
    await SurveyService.createSurvey(schoolId, payload);
    res.json({
      success: true,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
};

const updateSurvey = async (req: Request, res: Response) => {
  const schoolId = res.locals.school.id;
  const payload = req.body;
  const { id } = req.params;

  try {
    const survey = await SurveyService.updateSurvey(schoolId, id, payload);
    res.json({
      success: true,
      data: survey,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
};

const deleteSurvey = async (req: Request, res: Response) => {
  const schoolId = res.locals.school.id;
  const { id } = req.params;

  try {
    const survey = await SurveyService.deleteSurvey(schoolId, id);
    res.json({
      success: true,
      data: survey,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
};

export default {
  getSurveyBySurveyId,
  createSurvey,
  updateSurvey,
  deleteSurvey,
};
