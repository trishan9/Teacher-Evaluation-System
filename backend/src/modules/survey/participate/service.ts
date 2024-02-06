import { db } from "@/db";

const participateSurveyStep1 = async (id: string, payload: any) => {
  // TODO
  // db.subjectRatingDetail,
  // db.teacherRatingDetail,
  // db.optionalField

  const participant = await db.participant.create({
    data: {
      surveyId: id,
      ...payload,
    },
  });
  return participant;
};

const participateSurveyStep1Update = async (id: string, payload: any) => {
  const updatedParticipant = await db.participant.update({
    where: {
      id,
    },
    data: {
      ...payload,
    },
  });
  return updatedParticipant;
};

export default {
  participateSurveyStep1,
  participateSurveyStep1Update,
};
