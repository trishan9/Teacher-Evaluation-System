import { useForm } from 'react-hook-form';

const StepTwo = ({ handlePreviousStep, handleNextStep, survey, schoolData }) => {
    const defaultValues = localStorage.getItem("step2") ? JSON.parse(localStorage.getItem("step2")) : {}

    const {
        register,
        handleSubmit,
    } = useForm({
        defaultValues: {
            ...defaultValues
        }
    });

    return (
        <div className='sm:w-1/2 w-full min-h-[60vh] p-6 bg-neutral_white rounded-lg'>
            <p className='w-full my-2 text-xl text-center'>Step 2 of 4</p>

            <form onSubmit={handleSubmit(handleNextStep)} className='flex flex-col items-end gap-8 mt-6'>
                {survey.subjects.map((subject) => (
                    <div className="flex flex-col w-full gap-2" key={subject}>
                        <label htmlFor="" className="font-semibold">
                            {subject} Teacher
                        </label>

                        <p className="text-gray-600">Who is your {subject} teacher?</p>

                        <select
                            required
                            {...register(subject)}
                            className="border-gray-300 border-2 h-[45px] w-full rounded-md focus:border"
                        >
                            <option value="">Select Teacher</option>
                            {
                                schoolData?.teachers?.filter((teacher) => teacher.subject === subject).map((subjectTeacher) => {
                                    return (
                                        <option key={subjectTeacher.id} value={subjectTeacher.name}>{subjectTeacher.name}</option>
                                    )
                                })
                            }
                        </select>
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
        </div>
    )
}

export default StepTwo
