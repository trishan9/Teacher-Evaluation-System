import { db } from "@/db";

enum Points {
  HIGHLY_AGREE = 4,
  AGREE = 3,
  DISAGREE = 2,
  HIGHLY_DISAGREE = 1,
}

const participateSurvey = async (id: string, payload: any) => {
  const { participant, teachers, subjects, optional } = payload;

  await createParticipant(id, participant);
  await createOptional(id, optional);
  const subjectPromises = await addSubjectDetails(id, subjects);
  const teacherPromises = await addTeacherDetails(id, teachers);

  await Promise.all([...subjectPromises, ...teacherPromises]);

  return true;
};

const calculateRating = (rate: string, metric: string) => {
  const pointValue = Points[metric];
  return pointValue === +rate ? 1 : 0;
};

const createOptional = async (surveyId: string, data: any) => {
  await db.optionalField.create({
    data: {
      surveyId,
      ...data,
    },
  });
};

const createParticipant = async (surveyId: string, data: any) => {
  await db.participant.create({
    data: {
      surveyId,
      ...data,
    },
  });
};

const addSubjectDetails = async (surveyId: string, subjects: any) => {
  const subjectPromises = subjects.map(async (subject: any) => {
    const subjectExists = await db.subjectRatingDetail.findFirst({
      where: {
        surveyId,
        name: subject.name,
      },
    });

    if (!subjectExists) {
      const subjectRating = await db.subjectRatingDetail.create({
        data: {
          surveyId,
          name: subject.name,
        },
      });

      return Promise.all(
        subject.ratings.map(async (rating: any) => {
          return db.subjectRating.create({
            data: {
              subjectId: subjectRating.id,
              questionId: rating.questionId,
              highlyAgree: calculateRating(rating.rate, "HIGHLY_AGREE"),
              agree: calculateRating(rating.rate, "AGREE"),
              disagree: calculateRating(rating.rate, "DISAGREE"),
              highlyDisagree: calculateRating(rating.rate, "HIGHLY_DISAGREE"),
            },
          });
        })
      );
    }

    return Promise.all(
      subject.ratings.map(async (rating: any) => {
        const existingRating = await db.subjectRating.findFirst({
          where: {
            subjectId: subjectExists.id,
            questionId: rating.questionId,
          },
        });

        if (!existingRating) {
          return db.subjectRating.create({
            data: {
              subjectId: subjectExists.id,
              questionId: rating.questionId,
              highlyAgree: calculateRating(rating.rate, "HIGHLY_AGREE"),
              agree: calculateRating(rating.rate, "AGREE"),
              disagree: calculateRating(rating.rate, "DISAGREE"),
              highlyDisagree: calculateRating(rating.rate, "HIGHLY_DISAGREE"),
            },
          });
        } else {
          return db.subjectRating.update({
            where: {
              id: existingRating.id,
            },
            data: {
              highlyAgree:
                existingRating.highlyAgree +
                calculateRating(rating.rate, "HIGHLY_AGREE"),
              agree:
                existingRating.agree + calculateRating(rating.rate, "AGREE"),
              disagree:
                existingRating.disagree +
                calculateRating(rating.rate, "DISAGREE"),
              highlyDisagree:
                existingRating.highlyDisagree +
                calculateRating(rating.rate, "HIGHLY_DISAGREE"),
            },
          });
        }
      })
    );
  });

  return subjectPromises;
};

const addTeacherDetails = async (surveyId: string, teachers: any) => {
  const teacherPromises = teachers.map(async (teacher: any) => {
    const teacherExists = await db.teacherRatingDetail.findFirst({
      where: {
        surveyId,
        name: teacher.name,
      },
    });

    if (!teacherExists) {
      const teacherRating = await db.teacherRatingDetail.create({
        data: {
          surveyId,
          name: teacher.name,
        },
      });

      return Promise.all(
        teacher.ratings.map(async (rating: any) => {
          return db.teacherRating.create({
            data: {
              teacherRatingDetailId: teacherRating.id,
              questionId: rating.questionId,
              highlyAgree: calculateRating(rating.rate, "HIGHLY_AGREE"),
              agree: calculateRating(rating.rate, "AGREE"),
              disagree: calculateRating(rating.rate, "DISAGREE"),
              highlyDisagree: calculateRating(rating.rate, "HIGHLY_DISAGREE"),
            },
          });
        })
      );
    }

    return Promise.all(
      teacher.ratings.map(async (rating: any) => {
        const existingRating = await db.teacherRating.findFirst({
          where: {
            teacherRatingDetailId: teacherExists.id,
            questionId: rating.questionId,
          },
        });

        if (!existingRating) {
          return db.teacherRating.create({
            data: {
              teacherRatingDetailId: teacherExists.id,
              questionId: rating.questionId,
              highlyAgree: calculateRating(rating.rate, "HIGHLY_AGREE"),
              agree: calculateRating(rating.rate, "AGREE"),
              disagree: calculateRating(rating.rate, "DISAGREE"),
              highlyDisagree: calculateRating(rating.rate, "HIGHLY_DISAGREE"),
            },
          });
        } else {
          return db.teacherRating.update({
            where: {
              id: existingRating.id,
            },
            data: {
              highlyAgree:
                existingRating.highlyAgree +
                calculateRating(rating.rate, "HIGHLY_AGREE"),
              agree:
                existingRating.agree + calculateRating(rating.rate, "AGREE"),
              disagree:
                existingRating.disagree +
                calculateRating(rating.rate, "DISAGREE"),
              highlyDisagree:
                existingRating.highlyDisagree +
                calculateRating(rating.rate, "HIGHLY_DISAGREE"),
            },
          });
        }
      })
    );
  });

  return teacherPromises;
};

export default {
  participateSurvey,
};
