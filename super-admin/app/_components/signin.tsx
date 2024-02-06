"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import DynamicFormField from "@/components/shared/dynamic-form-field";
import Image from "next/image";

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
      subjects: [
        {
          name: "",
        },
      ],
      classes: [
        {
          name: "",
        },
      ],
      sections: [
        {
          name: "",
        },
      ],
    },
  });
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    name: "subjects",
    control,
    rules: {
      required: "Please add at least 1 subject",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>, event: any) {
    values.logo = event.target.logo.files[0];
    const payload = {
      name: values.collegeName,
      email: `${values.username}@trs.com`,
      logo: values.logo,
      classes: values.classes || [],
      subjects: values.subjects || [],
      sections: values.sections || [],
    };
    form.reset();
  }

  return (
    <div className="flex justify-between">
      <div className="flex mt-2  flex-col">
        <p className="mb-10 text-3xl font-bold">Create School Account</p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-[50vw] p-[2rem] pr-[5rem]  border"
          >
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>

                  <FormControl>
                    <Input type="file" {...field} className="cursor-pointer" />
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
                  <FormLabel>College Name</FormLabel>
                  <FormControl>
                    <Input placeholder="eg: Coventry University" {...field} />
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
                    <Input placeholder="Super admin" {...field} />
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
                  <FormDescription></FormDescription>
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
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DynamicFormField form={form} name="subjects" label="Subject" />
            <DynamicFormField form={form} name="classes" label="Class" />
            <DynamicFormField form={form} name="sections" label="Section" />

            <Button type="submit" className="w-full ">
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <div className="m-10 relative">
        <img
          src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg"
          alt="error"
          width={700}
          height={700}
          className="sticky top-32 rounded-md"
        />
      </div>
    </div>
  );
};

export default SignIn;
