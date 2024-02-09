"use client";

import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Loader2 } from "lucide-react";
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
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const formSchema = z.object({
  logo: z.any(),
  collegeName: z.string().min(2, {
    message: "College Name must be at least 2 characters.",
  }),
  classes: z.any(),
  subjects: z.any(),
  sections: z.any(),
});

const EditForm = ({ schoolData }: { schoolData: any }) => {
  const [logoInput, setLogoInput] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collegeName: schoolData.name,

      subjects: schoolData.subjects.map((subject: any) => {
        return { name: subject };
      }),
      classes: schoolData.classes.map((classes: any) => {
        return { name: classes };
      }),
      sections: schoolData.sections.map((section: any) => {
        return { name: section };
      }),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>, event: any) {
    const updatedPayload = {
      name: values.collegeName,
      classes: values.classes.map((classes: any) => classes.name) || [],
      subjects: values.subjects.map((subject: any) => subject.name) || [],
      sections: values.sections.map((section: any) => section.name) || [],
    };

    if (logoInput) {
      updatedPayload.logo = event.target.logo.files[0];
    }

    console.log(updatedPayload);

    const payload = updatedPayload;
    console.log(payload);

    try {
      await axios
        .patch(`${BASE_URL}/school/${schoolData.id}`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          toast.success("Your edit has been saved!");
          router.refresh();
          router.push("/manage-school");
        });
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  }

  return (
    <div className="flex flex-col w-full mt-2 md:px-6">
      {/* <p className="mb-6 text-2xl font-bold md:mb-10 md:text-3xl">
        Create School / College Account
      </p> */}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full p-6 md:p-[2rem] rounded-md border"
        >
          {logoInput && (
            <>
              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School / College logo</FormLabel>

                    <FormControl>
                      <Input
                        type="file"
                        required
                        accept="image/*"
                        {...field}
                        className="cursor-pointer"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant={"outline"}
                className="border w-[20%] px-4 py-2  rounded-md "
                onClick={() => setLogoInput(false)}
              >
                Cancel
              </Button>
            </>
          )}
          {!logoInput && (
            <div>
              <p>School / College logo</p>
              <div className="flex items-center flex-col">
                <img
                  src={schoolData.logo}
                  className="w-36 h-36, rounded-full object-cover"
                />
                <Button
                  variant={"outline"}
                  className=" px-4 py-2 rounded-md  ml-4 w-[30%]"
                  onClick={() => setLogoInput(true)}
                >
                  Change logo
                </Button>
              </div>
            </div>
          )}

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

          <DynamicFormField form={form} name="subjects" label="Subject" />

          <DynamicFormField form={form} name="classes" label="Class" />

          <DynamicFormField form={form} name="sections" label="Section" />

          <Button type="submit" size="lg" className="w-full mt-6">
            Save
            {form.formState.isSubmitting && (
              <Loader2 className="w-5 h-5 ml-2 animate-spin" />
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditForm;
