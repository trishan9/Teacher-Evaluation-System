import { useForm } from 'react-hook-form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"

const StepTwo = ({ handlePreviousStep, handleNextStep, survey, schoolData }) => {
    const defaultValues = localStorage.getItem("step2") ? JSON.parse(localStorage.getItem("step2")) : {}
    const form = useForm({
        defaultValues: {
            ...defaultValues
        }
    });

    return (
        <div className='lg:w-1/2 w-full min-h-[55vh] px-6 py-4 bg-slate-100 rounded-lg'>
            <p className='w-full my-2 text-xl text-center'>Step <span className='font-semibold'>2</span> of <span className='font-semibold'>4</span></p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleNextStep)} className='flex flex-col items-end gap-4 mt-6'>
                    {survey?.subjects?.map((subject) => (
                        <div className="flex flex-col w-full gap-1" key={subject}>
                            <label htmlFor="" className="font-semibold">
                                {subject} Teacher
                            </label>

                            <p className="text-sm text-gray-600">Who is your {subject} teacher?</p>

                            <FormField
                                control={form.control}
                                name={subject}
                                render={({ field }) => (
                                    <FormItem>
                                        <Select required onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Teacher" />
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent className="font-primary">
                                                {
                                                    schoolData?.teachers?.filter((teacher) => teacher.subject === subject).map((subjectTeacher) => {
                                                        return (
                                                            <SelectItem key={subjectTeacher.id} value={subjectTeacher.name}>{subjectTeacher.name}</SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>
                    ))}


                    <div className='flex items-center justify-between w-full'>
                        <button
                            type="button"
                            onClick={handlePreviousStep}
                            className="flex items-center gap-2 justify-center rounded-md bg-accent_primary px-10 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#1e2f49] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out mt-10"
                        >
                            Previous
                        </button>

                        <button
                            type="submit"
                            className="flex items-center gap-2 justify-center rounded-md bg-accent_primary px-10 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#1e2f49] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out mt-10"
                        >
                            Next
                        </button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default StepTwo
