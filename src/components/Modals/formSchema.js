import { z } from "zod"

export const changeNameFormSchema = z.object({
    newName: z.string().min(1, "Name can't be empty").min(3, "Name can't be less than 3 characters"),
    confirmNewName: z.string().min(1, "Name can't be empty")
}).refine((data) => data.newName === data.confirmNewName, {
    message: "Name didn't match",
    path: ["confirmNewName"],
});

export const changePasswordFormSchema = z.object({
    newPassword: z.string().min(1, "Password can't be empty").min(8, "Password can't be less than 8 characters"),
    confirmNewPassword: z.string().min(1, "Password can't be empty")
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords didn't match",
    path: ["confirmNewPassword"],
});

export const addTeacherFormSchema = z.object({
    name: z.string({ required_error: "Teacher's name can't be empty" }).min(1, "Teacher's name can't be empty").min(5, "Teacher's name can't be less than 5 characters"),
    subject: z.string({ required_error: "Subject can't be empty" }).min(1, "Subject can't be empty")
})