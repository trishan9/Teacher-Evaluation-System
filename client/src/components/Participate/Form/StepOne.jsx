import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"

const formSchema = z.object({
    studentName: z.string().min(1, "Student name can't be empty").min(5, "Student name can't be less than 5 characters"),
    class: z.string().min(1, "Class can't be empty"),
    section: z.string().min(1, "Section can't be empty"),
    guardianName: z.string().min(1, "Guardian name can't be empty").min(5, "Guardian name can't be less than 5 characters"),
})

const StepOne = ({ handleNextStep, schoolData }) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            studentName: localStorage.getItem("step1") ? JSON.parse(localStorage.getItem("step1")).studentName : "",
            class: localStorage.getItem("step1") ? JSON.parse(localStorage.getItem("step1")).class : "",
            section: localStorage.getItem("step1") ? JSON.parse(localStorage.getItem("step1")).section : "",
            guardianName: localStorage.getItem("step1") ? JSON.parse(localStorage.getItem("step1")).guardianName : "",
        }
    });

    return (
        <div className='lg:w-1/2 w-full min-h-[60vh] px-6 py-4 bg-slate-100 rounded-lg'>
            <p className='w-full my-2 text-xl text-center'>Step <span className='font-semibold'>1</span> of <span className='font-semibold'>4</span></p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleNextStep)} className='flex flex-col items-end gap-4'>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="" className="font-semibold">
                            Full Name
                        </label>

                        <p className="text-sm text-gray-600">What is your full name?</p>

                        <Input
                            type="text"
                            {...form.register("studentName")}
                            placeholder="e.g. Trishan Wagle"
                        />

                        {form.formState.errors.studentName && (
                            <p className="text-sm text-error">{form.formState.errors.studentName.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="" className="font-semibold">
                            Class
                        </label>

                        <p className="text-sm text-gray-600">In which class are you in?</p>

                        <FormField
                            control={form.control}
                            name="class"
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Class" />
                                            </SelectTrigger>
                                        </FormControl>

                                        <SelectContent className="font-primary">
                                            <SelectGroup>
                                                <SelectLabel>Class</SelectLabel>
                                                {
                                                    schoolData?.classes?.map((class_) => {
                                                        return (
                                                            <SelectItem key={class_} value={class_}>{class_}</SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        {form.formState.errors.class && (
                            <p className="text-sm text-error">{form.formState.errors.class.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="" className="font-semibold">
                            Section
                        </label>

                        <p className="text-sm text-gray-600">Please select your section</p>

                        <FormField
                            control={form.control}
                            name="section"
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Section" />
                                            </SelectTrigger>
                                        </FormControl>

                                        <SelectContent className="font-primary">
                                            <SelectGroup>
                                                <SelectLabel>Section</SelectLabel>
                                                {
                                                    schoolData?.sections?.map((section_) => {
                                                        return (
                                                            <SelectItem key={section_} value={section_}>{section_}</SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        {form.formState.errors.section && (
                            <p className="text-sm text-error">{form.formState.errors.section.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col w-full gap-2">
                        <label htmlFor="" className="font-semibold">
                            Guardian's Name
                        </label>

                        <p className="text-gray-600">What is your guardian's full name?</p>

                        <Input
                            type="text"
                            {...form.register("guardianName")}
                            placeholder="e.g. Abiral Shrestha"
                        />

                        {form.formState.errors.guardianName && (
                            <p className="text-sm text-error">{form.formState.errors.guardianName.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="flex items-center gap-2 justify-center rounded-md bg-accent_primary px-10 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#1e2f49] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out mt-10"
                    >
                        Next
                    </button>
                </form>
            </Form>
        </div >
    )
}

export default StepOne
