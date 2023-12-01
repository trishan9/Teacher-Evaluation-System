import { useForm } from 'react-hook-form';

const StepFour = ({ handlePreviousStep }) => {
    const defaultValues = localStorage.getItem("step4") ? JSON.parse(localStorage.getItem("step4")) : {}
    const {
        register,
        handleSubmit,
    } = useForm({
        defaultValues: {
            ...defaultValues
        }
    });

    const handleParticipate = (values) => {
        localStorage.setItem("step4", JSON.stringify(values));
        console.log(values)
    }

    return (
        <div className='lg:w-1/2 w-full min-h-[60vh] p-6 bg-neutral_white rounded-lg'>
            <p className='w-full my-2 text-xl text-center'>Step <span className='font-semibold'>4</span> of <span className='font-semibold'>4</span></p>

            <form onSubmit={handleSubmit(handleParticipate)} className='flex flex-col items-end gap-8 mt-6'>

                <div className="flex flex-col w-full gap-2">
                    <label htmlFor="" className="font-semibold">
                        Anonymous Messages (optional)
                    </label>

                    <p className="text-gray-600">Share some feedbacks, suggestions, complaints or any anonymous messages. Your personal information won't be disclosed with anyone.</p>

                    <textarea className='h-32 border border-gray-400 rounded-sm resize-none' {...register("anonymous")}></textarea>
                </div>

                <div className="flex flex-col w-full gap-2">
                    <label htmlFor="" className="font-semibold">
                        Report of Verbal, Physical or Emotional Abuse (optional)
                    </label>

                    <p className="text-gray-600">We encourage you to report any abuse if you or your friends have faced. Your personal information won't be disclosed with anyone.</p>

                    <textarea className='h-32 border border-gray-400 rounded-sm resize-none' {...register("report")}></textarea>
                </div>

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
                        Submit
                    </button>
                </div>
            </form >
        </div >
    )
}

export default StepFour
