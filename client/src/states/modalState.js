import { atom } from "recoil";

export const changeNameModal = atom({
  key: "changeNameModal",
  default: false,
});

export const changePasswordModal = atom({
  key: "changePasswordModal",
  default: false,
});

export const addTeacherModal = atom({
  key: "addTeacherModal",
  default: false,
});

export const editTeacherModal = atom({
  key: "editTeacherModal",
  default: false,
});
