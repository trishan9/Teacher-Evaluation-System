import { db } from "@/db";

const getSurveyBySurveyId = async (id: string) => {
  const survey = await db.survey.findFirst({
    where: { surveyId: id },
  });
  return survey;
};

const createSurvey = async (schoolId: string, payload: any) => {
  const survey = await db.survey.create({
    data: {
      ...payload,
      schoolId,
    },
  });
  return survey;
};

const updateSurvey = async (schoolId: string, id: string, payload: any) => {
  const updatedSurvey = await db.survey.update({
    where: { id, schoolId },
    data: {
      ...payload,
    },
  });
  return updatedSurvey;
};

const deleteSurvey = async (schoolId: string, id: string) => {
  const deletedSurvey = await db.survey.delete({
    where: { id, schoolId },
  });
  return deletedSurvey;
};

export default {
  getSurveyBySurveyId,
  createSurvey,
  updateSurvey,
  deleteSurvey,
};
