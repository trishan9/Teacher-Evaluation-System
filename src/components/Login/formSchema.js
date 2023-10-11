import { z } from "zod"

const formSchema = z.object({
    userName: z.string().min(1, "Username can't be empty").min(3, "Username can't be less than 3 characters"),
    password: z.string().min(1, "Password can't be empty"),
});

export default formSchema