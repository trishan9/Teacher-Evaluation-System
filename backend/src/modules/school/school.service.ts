import validator from "validator";

import { db } from "@/db";
import uploadToCloudinary from "@/lib/cloudinary";

const createSchool = async (
  name: string,
  email: string,
  logo: any,
  classes: any,
  sections: any,
  subjects: any
) => {
  if (!email || !name || !logo || !classes || !sections || !subjects) {
    throw Error("All the fields are required!");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email address is not valid");
  }

  const exists = await db.school.findUnique({
    where: { email },
  });

  if (exists) {
    throw Error("School with this email address already exists");
  }

  const logoUrl: any = await uploadToCloudinary(logo);

  const school = await db.school.create({
    data: {
      email,
      logo: logoUrl.url,
      name,
      classes: JSON.parse(classes as string) || [],
      sections: JSON.parse(sections as string) || [],
      subjects: JSON.parse(subjects as string) || [],
    },
  });
  return school;
};

const updateSchool = async (payload, id: string) => {
  if (payload.logo) {
    const logoUrl: any = await uploadToCloudinary(payload?.logo);
    payload.logo = logoUrl.url;
  }

  const updatedSchool = await db.school.update({
    where: { id },
    data: {
      ...payload,
    },
  });
  return updatedSchool;
};

const getSchools = async () => {
  const schools = await db.school.findMany({
    include: {
      teachers: true,
      surveys: {
        include: {
          participantDetails: true,
          subjectDetails: true,
          teacherDetails: true,
          optional: true,
        },
      },
    },
  });
  return schools;
};

const getSchoolById = async (id: string) => {
  const school = await db.school.findFirst({
    where: {
      id,
    },
    include: {
      teachers: true,
      surveys: true,
    },
  });
  return school;
};

const deleteSchool = async (id: string) => {
  const school = await db.school.delete({
    where: {
      id,
    },
    include: {
      teachers: true,
      surveys: true,
    },
  });
  return school;
};

export default {
  createSchool,
  updateSchool,
  getSchools,
  getSchoolById,
  deleteSchool,
};
