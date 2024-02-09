import { Request, Response } from "express";
import SchoolService from "./school.service";

const createSchool = async (req, res: Response) => {
  const { name, email, classes, sections, subjects } = req.body;
  const logo = req.file?.path;

  try {
    await SchoolService.createSchool(
      name,
      email,
      logo,
      classes,
      sections,
      subjects
    );
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

const updateSchool = async (req, res: Response) => {
  const payload = req.body;
  const logo = req.file?.path;
  payload.logo = logo;
  const { id } = req.params;

  try {
    const school = await SchoolService.updateSchool(payload, id);
    res.json({
      success: true,
      data: school,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
};

const getSchools = async (req: Request, res: Response) => {
  try {
    const schools = await SchoolService.getSchools();
    res.json({
      success: true,
      data: schools,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
};

const getSchoolById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const school = await SchoolService.getSchoolById(id);
    res.json({
      success: true,
      data: school,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
};

const getSchool = async (req: Request, res: Response) => {
  try {
    const school = res.locals.school;
    res.json({
      success: true,
      data: school,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
};

const deleteSchool = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const school = await SchoolService.deleteSchool(id);
    res.json({
      success: true,
      data: school,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
};

export default {
  createSchool,
  updateSchool,
  getSchools,
  getSchool,
  getSchoolById,
  deleteSchool,
};
