import { db } from "@/db";

const getTeacherById = async (id: string) => {
  const teacher = await db.teacher.findFirst({
    where: { id: id },
  });
  return teacher;
};

const addTeacher = async (schoolId: string, payload: any) => {
  const teacher = await db.teacher.create({
    data: {
      ...payload,
      schoolId,
    },
  });
  return teacher;
};

const updateTeacher = async (schoolId: string, id: string, payload: any) => {
  const updatedTeacher = await db.teacher.update({
    where: { id, schoolId },
    data: {
      ...payload,
    },
  });
  return updatedTeacher;
};

const deleteTeacher = async (schoolId: string, id: string) => {
  const deletedTeacher = await db.teacher.delete({
    where: { id, schoolId },
  });
  return deletedTeacher;
};

export default {
  addTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacherById,
};
