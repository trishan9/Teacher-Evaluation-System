import { Request, Response } from "express";
import ParticipateSurveyService from "./service";

const participateSurvey = async (req: Request, res: Response) => {
  const payload = req.body;
  const { id } = req.params;

  try {
    const participant = await ParticipateSurveyService.participateSurvey(
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

export default {
  participateSurvey,
};
