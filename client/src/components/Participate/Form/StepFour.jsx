import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import _ from "lodash"
import { useForm } from 'react-hook-form';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import loader from "@/assets/loading.gif";

const StepFour = ({ handlePreviousStep, survey, id }) => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const defaultValues = localStorage.getItem("step4") ? JSON.parse(localStorage.getItem("step4")) : {}
    const subjects = survey.subjects

    const {
        register,
        handleSubmit,
    } = useForm({
        defaultValues: {
            ...defaultValues
        }
    });

    const handleParticipate = async (values) => {
        localStorage.setItem("step4", JSON.stringify(values));
        const studentDetails = JSON.parse(localStorage.getItem("step1"));
        const teacherDetails = JSON.parse(localStorage.getItem("step2"));
        const rawRatings = JSON.parse(localStorage.getItem("step3"));

        const ratings = _.transform(subjects, (result, subject) => {
            const subjectRatings = _.mapKeys(
                _.pickBy(rawRatings, (value, key) => key.includes(`rating-${subject}-question`)),
                (value, key) => key.replace(`rating-${subject}-`, '')
            );
            result[subject] = subjectRatings;
        }, {});

        const participantId = `${id}-${studentDetails.studentName.split(" ")[0].toLowerCase()}`
        const payload = {
            id: participantId,
            studentDetails,
            teacherDetails,
            ratings,
            optional: values
        }

        const participants = survey.participants
        participants.push(payload)

        const docRef = doc(db, "surveys", survey.id)
        try {
            setIsLoading(true)
            await updateDoc(docRef, { participants })
            localStorage.clear()
            navigate(`/participate/${id}?step=5`)
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
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
                        disabled={isLoading}
                        className="flex disabled:bg-accent_primary/80 items-center gap-2 justify-center rounded-md bg-accent_primary px-10 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#1e2f49] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out mt-10"
                    >
                        Previous
                    </button>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex disabled:bg-accent_primary/80 items-center gap-2 justify-center rounded-md bg-accent_primary px-10 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#1e2f49] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out mt-10"
                    >
                        Submit

                        {isLoading && (
                            <img
                                src={loader}
                                alt=""
                                className="w-4 bg-transparent mix-blend-screen"
                            />
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default StepFour
