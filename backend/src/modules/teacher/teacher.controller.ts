import { Request, Response } from "express";
import TeacherService from "./teacher.service";

const addTeacher = async (req, res: Response) => {
  const schoolId = res.locals.school.id;
  const payload = req.body;

  try {
    await TeacherService.addTeacher(schoolId, payload);
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

const updateTeacher = async (req, res: Response) => {
  const schoolId = res.locals.school.id;
  const payload = req.body;
  const { id } = req.params;

  try {
    const teacher = await TeacherService.updateTeacher(schoolId, id, payload);
    res.json({
      success: true,
      data: teacher,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
};

const deleteTeacher = async (req: Request, res: Response) => {
  const schoolId = res.locals.school.id;
  const { id } = req.params;

  try {
    const teacher = await TeacherService.deleteTeacher(schoolId, id);
    res.json({
      success: true,
      data: teacher,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
};

export default {
  addTeacher,
  updateTeacher,
  deleteTeacher,
};
