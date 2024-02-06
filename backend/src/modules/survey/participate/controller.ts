import { Request, Response } from "express";
import ParticipateSurveyService from "./service";

const participateSurveyStep1 = async (req: Request, res: Response) => {
  const payload = req.body;
  const { id } = req.params;

  try {
    const participant = await ParticipateSurveyService.participateSurveyStep1(
      id,
      payload
    );
    res.json({
      success: true,
      data: participant,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
};

const participateSurveyStep1Update = async (req: Request, res: Response) => {
  const payload = req.body;
  const { id } = req.params;

  try {
    const participant =
      await ParticipateSurveyService.participateSurveyStep1Update(id, payload);
    res.json({
      success: true,
      data: participant,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
};
export default {
  participateSurveyStep1,
  participateSurveyStep1Update,
};
