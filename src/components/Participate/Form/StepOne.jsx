import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
    studentName: z.string().min(1, "Student name can't be empty").min(5, "Student name can't be less than 5 characters"),
    class: z.string().min(1, "Class can't be empty"),
    section: z.string().min(1, "Section can't be empty"),
    guardianName: z.string().min(1, "Guardian name can't be empty").min(5, "Guardian name can't be less than 5 characters"),
})

const StepOne = ({ handleNextStep, schoolData }) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            studentName: localStorage.getItem("step1") ? JSON.parse(localStorage.getItem("step1")).studentName : "",
            class: localStorage.getItem("step1") ? JSON.parse(localStorage.getItem("step1")).class : "",
            section: localStorage.getItem("step1") ? JSON.parse(localStorage.getItem("step1")).section : "",
            guardianName: localStorage.getItem("step1") ? JSON.parse(localStorage.getItem("step1")).guardianName : "",
        }
    });

    return (
        <div className='lg:w-1/2 w-full min-h-[60vh] p-6 bg-neutral_white rounded-lg'>
            <p className='w-full my-2 text-xl text-center'>Step <span className='font-semibold'>1</span> of <span className='font-semibold'>4</span></p>

            <form onSubmit={handleSubmit(handleNextStep)} className='flex flex-col items-end gap-4'>
                <div className="flex flex-col w-full gap-2">
                    <label htmlFor="" className="font-semibold">
                        Full Name
                    </label>

                    <p className="text-gray-600">What is your full name?</p>

                    <input
                        type="text"
                        {...register("studentName")}
                        className="border-gray-300 border-2 h-[45px] w-full rounded-md focus:border"
                    />

                    {errors.studentName && (
                        <p className="text-sm text-error">{errors.studentName.message}</p>
                    )}
                </div>

                <div className="flex flex-col w-full gap-2">
                    <label htmlFor="" className="font-semibold">
                        Class
                    </label>

                    <p className="text-gray-600">In which class are you in?</p>

                    <select
                        {...register("class")}
                        className="border-gray-300 border-2 h-[45px] w-full rounded-md focus:border"
                    >
                        <option value="">Select Class</option>
                        {
                            schoolData?.classes?.map((class_) => {
                                return (
                                    <option key={class_} value={class_}>{class_}</option>
                                )
                            })
                        }
                    </select>

                    {errors.class && (
                        <p className="text-sm text-error">{errors.class.message}</p>
                    )}
                </div>

                <div className="flex flex-col w-full gap-2">
                    <label htmlFor="" className="font-semibold">
                        Section
                    </label>

                    <p className="text-gray-600">Please select your section</p>

                    <select
                        {...register("section")}
                        className="border-gray-300 border-2 h-[45px] w-full rounded-md focus:border"
                    >
                        <option value="" selected={true}>Select Section</option>
                        {
                            schoolData?.sections?.map((section_) => {
                                return (
                                    <option key={section_} value={section_}>{section_}</option>
                                )
                            })
                        }
                    </select>

                    {errors.section && (
                        <p className="text-sm text-error">{errors.section.message}</p>
                    )}
                </div>

                <div className="flex flex-col w-full gap-2">
                    <label htmlFor="" className="font-semibold">
                        Guardian's Name
                    </label>

                    <p className="text-gray-600">What is your guardian's full name?</p>

                    <input
                        type="text"
                        {...register("guardianName")}
                        className="border-gray-300 border-2 h-[45px] w-full rounded-md focus:border"
                    />

                    {errors.guardianName && (
                        <p className="text-sm text-error">{errors.guardianName.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="flex items-center gap-2 justify-center rounded-md bg-accent_primary px-10 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#1e2f49] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out mt-10"
                >
                    Next
                </button>
            </form>
        </div>
    )
}

export default StepOne
