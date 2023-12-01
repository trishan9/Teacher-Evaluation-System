import { useForm } from 'react-hook-form';
import questions from '@/constants/questions';

const StepThree = ({ handlePreviousStep, handleNextStep, survey }) => {
    const subjects = survey.subjects
    const defaultValues = localStorage.getItem("step3") ? JSON.parse(localStorage.getItem("step3")) : null

    const {
        register,
        handleSubmit,
    } = useForm({
        defaultValues: {
            ...defaultValues
        }
    });

    return (
        <div className='lg:w-1/2 w-full min-h-[60vh] p-6 bg-neutral_white rounded-lg'>
            <p className='w-full my-2 text-xl text-center'>Step <span className='font-semibold'>3</span> of <span className='font-semibold'>4</span></p>

            <p className='mb-4 text-sm italic text-center'>(Your teachers won't have access to your feedback, so please give honest feedback for the betterment of your education.)</p>

            <form onSubmit={handleSubmit(handleNextStep)} className='flex flex-col items-end gap-8 mt-6'>
                {questions.map((question, index) => (
                    <div key={question.id} className='flex flex-col w-full gap-2'>
                        <p className='text-lg font-semibold'>{index + 1}. {question.en}.</p>

                        <p className='mb-2 text-lg font-semibold'>{question.np}</p>

                        {subjects.map((subject) => (
                            <div key={subject} className='flex items-center gap-6 mb-2'>
                                <p className='font-medium'>{subject} Teacher</p>

                                <div className="rating">
                                    <input type="radio" value="1" {...register(`rating-${subject}-${question.id}`)} className="mask mask-star hover:bg-blue-600" />
                                    <input type="radio" value="2" {...register(`rating-${subject}-${question.id}`)} className="mask mask-star hover:bg-blue-600 !color-black" />
                                    <input type="radio" value="3" {...register(`rating-${subject}-${question.id}`)} className="mask mask-star hover:bg-blue-600 !color-black" defaultChecked={!defaultValues} />
                                    <input type="radio" value="4" {...register(`rating-${subject}-${question.id}`)} className="mask mask-star hover:bg-blue-600 !color-black" />
                                    <input type="radio" value="5" {...register(`rating-${subject}-${question.id}`)} className="mask mask-star hover:bg-blue-600 !color-black" />
                                </div>
                            </div>
                        ))}
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

export default StepThree
