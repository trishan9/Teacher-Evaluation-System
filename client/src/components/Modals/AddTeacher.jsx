import { Fragment } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { useRecoilState } from 'recoil'
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown } from "lucide-react"
import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react';
import { addTeacherFormSchema } from './formSchema'
import { schoolState } from '@/states'
import { db } from '@/config/firebase';
import { addTeacherModal } from '@/states'
import { Input } from '@/components/ui/input';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useToast } from '@/components/ui/use-toast';

export default function AddTeacherModal() {
    const [isAddTeacherModalOpen, setIsAddTeacherModalOpen] = useRecoilState(addTeacherModal)
    const [schoolData, setSchoolData] = useRecoilState(schoolState)
    const form = useForm({
        resolver: zodResolver(addTeacherFormSchema)
    })

    const { toast } = useToast()

    const handleAddNewTeacher = async (values) => {
        setIsAddTeacherModalOpen(false)
        try {
            const teachers = schoolData.teachers ? [...schoolData.teachers] : []
            teachers.push({
                id: uuidv4(),
                name: values.name,
                subject: values.subject
            })
            setSchoolData(prevData => { return { ...prevData, teachers: teachers } })

            const docRef = doc(db, "schools", schoolData.id)
            await updateDoc(docRef, {
                teachers: teachers
            })
            toast({
                title: "Teacher Added!",
                description: "Teacher has been added successfully!"
            })
        } catch {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
        }
    }

    return (
        <Transition.Root show={isAddTeacherModalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setIsAddTeacherModalOpen}>
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
                                                <Dialog.Title as="h3" className="flex justify-between w-full text-base font-semibold leading-6 text-gray-900">
                                                    <p>
                                                        Add New Teacher
                                                    </p>

                                                    <button type='button' onClick={() => setIsAddTeacherModalOpen(false)}>
                                                        <X className='w-6 p-1 bg-gray-300 rounded-md cursor-pointer hover:bg-gray-200' />
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
                                                                    <Input type="text" className='w-full bg-white border border-gray-300 rounded-md outline-none'  {...field} />
                                                                </FormControl>

                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <div className='flex flex-col gap-1'>
                                                        {schoolData &&
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
                                                                                            !field.value && "text-muted-foreground"
                                                                                        )}
                                                                                    >
                                                                                        {field.value
                                                                                            ? schoolData && schoolData.subjects.includes(field.value)
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

                                                                                    <CommandEmpty>No subject found.</CommandEmpty>

                                                                                    <CommandGroup>
                                                                                        {schoolData && schoolData.subjects.map((subject) => (
                                                                                            <CommandItem
                                                                                                value={subject}
                                                                                                key={subject}
                                                                                                onSelect={() => {
                                                                                                    form.setValue("subject", subject)
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
                                                                                        ))}
                                                                                    </CommandGroup>
                                                                                </Command>
                                                                            </PopoverContent>
                                                                        </Popover>

                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm bg-accent_primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-[#1e2f49] transition"
                                            >
                                                Add Teacher
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
    )
}