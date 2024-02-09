"use client";

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DynamicFormField from "@/components/shared/dynamic-form-field";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const formSchema = z
  .object({
    logo: z.string().min(1, {
      message: "Logo is required",
    }),
    collegeName: z.string().min(2, {
      message: "College Name must be at least 2 characters.",
    }),
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(8, {
      message: "Password should be at least 8 characters",
    }),
    confirmPassword: z.string(),
    classes: z.any(),
    subjects: z.any(),
    sections: z.any(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignIn = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      collegeName: "",
      logo: "",
      password: "",
      confirmPassword: "",
      subjects: [{}],
      classes: [{}],
      sections: [{}],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>, event: any) {
    const payload = {
      name: values.collegeName,
      email: `${values.username}@trs.com`,
      logo: event.target.logo.files[0],
      classes:
        JSON.stringify(values.classes.map((classes: any) => classes.name)) ||
        [],
      subjects:
        JSON.stringify(values.subjects.map((subject: any) => subject.name)) ||
        [],
      sections:
        JSON.stringify(values.sections.map((section: any) => section.name)) ||
        [],
    };

    try {
      await axios.post(`${BASE_URL}/school`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await createUserWithEmailAndPassword(
        auth,
        payload.email,
        values.password
      );
      toast.success("Your account has been created!");
      form.reset();
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  }

  return (
    <div className="flex flex-col w-full mt-2 md:px-6">
      <p className="mb-6 text-2xl font-bold md:mb-10 md:text-3xl">
        Create School / College Account
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full p-6 md:p-[2rem] rounded-md border"
        >
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School / College logo</FormLabel>

                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    {...field}
                    className="cursor-pointer"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="collegeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School / College name</FormLabel>

                <FormControl>
                  <Input placeholder="eg: Softwarica College  " {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>

                <FormControl>
                  <Input placeholder="eg: softwarica12" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>

                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>

                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <DynamicFormField form={form} name="subjects" label="Subject" />

          <DynamicFormField form={form} name="classes" label="Class" />

          <DynamicFormField form={form} name="sections" label="Section" />

          <Button type="submit" size="lg" className="w-full mt-6">
            Create School / College
            {form.formState.isSubmitting && (
              <Loader2 className="w-5 h-5 ml-2 animate-spin" />
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignIn;
