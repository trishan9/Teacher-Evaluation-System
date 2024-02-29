import { Fragment } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { v4 } from "uuid";
import { addTeacherFormSchema } from "./formSchema";
import {
  addTeacherModal,
  authState,
  schoolState,
  teacherState,
} from "@/states";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useSchoolData } from "@/hooks";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { editTeacherModal } from "@/states/modalState";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function EditTeacherModal() {
  const [isEditTeacherModalOpen, setIsEditTeacherModalOpen] =
    useRecoilState(editTeacherModal);
  const [, setSchoolData] = useRecoilState(schoolState);
  const [teachers, setTeachers] = useRecoilState(teacherState);
  const { schoolData: rawSchoolData } = useSchoolData();
  const [authUser] = useRecoilState(authState);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(addTeacherFormSchema),
  });

  const handleAddNewTeacher = async (values) => {
    try {
      setIsLoading(true);

      const teacher = {
        id: v4(),
        name: values.name,
        subject: values.subject,
      };

      const newTeachers = [...teachers];
      newTeachers.push(teacher);
      setTeachers(newTeachers);

      setSchoolData((prevData) => {
        return {
          ...prevData,
          data: {
            ...prevData.data,
            data: {
              ...prevData.data.data,
              teachers: newTeachers,
            },
          },
        };
      });

      setIsEditTeacherModalOpen(false);
      form.reset();

      await axios.post(`${BASE_URL}/teacher`, teacher, {
        headers: {
          Authorization: `Bearer ${authUser.email}`,
        },
      });

      toast({
        title: "Teacher Added!",
        description: "Teacher has been added successfully!",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });

      setTeachers(rawSchoolData?.data?.data?.teachers);
      setSchoolData((prevData) => {
        return {
          ...prevData,
          data: {
            ...prevData.data,
            data: {
              ...prevData.data.data,
              teachers: rawSchoolData?.data?.data?.teachers,
            },
          },
        };
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Transition.Root show={isEditTeacherModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={setIsEditTeacherModalOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto m font-primary">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-sm p-6 px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform rounded-lg shadow-xl bg-neutral_white sm:my-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleAddNewTeacher)}>
                    <div>
                      <div>
                        <Dialog.Title
                          as="h3"
                          className="flex justify-between w-full text-base font-semibold leading-6 text-gray-900"
                        >
                          <p>Edit Teacher</p>

                          <button
                            type="button"
                            onClick={() => setIsEditTeacherModalOpen(false)}
                          >
                            <X className="w-6 p-1 bg-gray-300 rounded-md cursor-pointer hover:bg-gray-200" />
                          </button>
                        </Dialog.Title>

                        <div className="flex flex-col gap-4 mt-5">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem className="flex flex-col w-full">
                                <FormLabel>Teacher's Name</FormLabel>

                                <FormControl>
                                  <Input
                                    type="text"
                                    className="w-full bg-white border border-gray-300 rounded-md outline-none"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex flex-col gap-1">
                            {rawSchoolData?.data?.data && (
                              <FormField
                                control={form.control}
                                name="subject"
                                render={({ field }) => (
                                  <FormItem className="flex flex-col">
                                    <FormLabel>Subject</FormLabel>

                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <FormControl>
                                          <Button
                                            type="button"
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                              "w-full justify-between bg-white border border-gray-300 rounded-md outline-none",
                                              !field.value &&
                                                "text-muted-foreground"
                                            )}
                                          >
                                            {field.value
                                              ? rawSchoolData?.data?.data &&
                                                rawSchoolData?.data?.data?.subjects.includes(
                                                  field.value
                                                )
                                                ? field.value
                                                : "Select subject"
                                              : "Select subject"}
                                            <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                                          </Button>
                                        </FormControl>
                                      </PopoverTrigger>

                                      <PopoverContent className="p-0">
                                        <Command className="font-primary">
                                          <CommandInput placeholder="Search subject..." />

                                          <CommandEmpty>
                                            No subject found.
                                          </CommandEmpty>

                                          <CommandGroup>
                                            {rawSchoolData?.data?.data &&
                                              rawSchoolData?.data?.data?.subjects.map(
                                                (subject) => (
                                                  <CommandItem
                                                    value={subject}
                                                    key={subject}
                                                    onSelect={() => {
                                                      form.setValue(
                                                        "subject",
                                                        subject
                                                      );
                                                    }}
                                                  >
                                                    <Check
                                                      className={cn(
                                                        "mr-2 h-4 w-4",
                                                        subject === field.value
                                                          ? "opacity-100"
                                                          : "opacity-0"
                                                      )}
                                                    />
                                                    {subject}
                                                  </CommandItem>
                                                )
                                              )}
                                          </CommandGroup>
                                        </Command>
                                      </PopoverContent>
                                    </Popover>

                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <button
                        type="submit"
                        className="inline-flex justify-center items-center w-full px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm bg-accent_primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-[#1e2f49] transition"
                      >
                        Save
                        {isLoading && (
                          <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                        )}
                      </button>
                    </div>
                  </form>
                </Form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
