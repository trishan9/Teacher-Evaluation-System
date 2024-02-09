import { db } from "@/db";

const isAuthenticated = async (req, res, next) => {
  try {
    const tok = req.headers.authorization?.split(" ")[1];
    if (!tok) {
      throw Error("Unauthorized");
    }

    const decodedToken = await db.school.findFirst({
      where: {
        email: tok,
      },
      include: {
        teachers: true,
        surveys: {
          include: {
            participantDetails: true,
            subjectDetails: {
              include: {
                ratings: true,
              },
            },
            teacherDetails: {
              include: {
                ratings: true,
              },
            },
            optional: true,
          },
        },
      },
    });

    if (!decodedToken) {
      throw Error("Unauthorized");
    }

    res.locals.school = decodedToken;
    next();
  } catch {
    res.json({
      success: false,
      error: "Unauthorized",
    });
  }
};

export default isAuthenticated;
