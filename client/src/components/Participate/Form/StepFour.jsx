import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import _ from "lodash"
import axios from 'axios';
import { useForm } from 'react-hook-form';
import loader from "@/assets/loading.gif";
import { Textarea } from '@/components/ui/textarea';

const BASE_URL = import.meta.env.VITE_API_URL

const StepFour = ({ handlePreviousStep, survey, id }) => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const defaultValues = localStorage.getItem("step4") ? JSON.parse(localStorage.getItem("step4")) : {}

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

        const groupedRatings = _.groupBy(Object.keys(rawRatings), key => key.split('-')[1]);
        const subjectWiseRatings = _.map(groupedRatings, (questions, subject) => {
            const ratings = _.map(questions, question => {
                const questionId = `${question.split('-')[2]}-${question.split('-')[3]}`;
                return {
                    questionId,
                    rate: rawRatings[question]
                };
            });

            return {
                name: subject,
                ratings
            };
        });

        const teacherWiseRatings = subjectWiseRatings.map(rating => {
            const newName = teacherDetails[rating.name];
            return {
                ...rating,
                name: newName
            };
        });

        const payload = {
            participant: studentDetails,
            subjects: subjectWiseRatings,
            teachers: teacherWiseRatings,
            optional: values
        }

        try {
            setIsLoading(true)
            await axios.patch(`${BASE_URL}/survey/participate/${survey.id}`, payload)
            localStorage.clear()
            navigate(`/participate/${id}?step=5`)
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='lg:w-1/2 w-full min-h-[60vh] px-6 py-4 bg-slate-100 rounded-lg'>
            <p className='w-full my-2 text-xl text-center'>Step <span className='font-semibold'>4</span> of <span className='font-semibold'>4</span></p>

            <form onSubmit={handleSubmit(handleParticipate)} className='flex flex-col items-end gap-4 mt-6'>
                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="" className="font-semibold">
                        Anonymous Messages (optional)
                    </label>

                    <p className="text-sm text-gray-600">Share some feedbacks, suggestions, complaints or any anonymous messages. Your personal information won't be disclosed with anyone.</p>

                    <Textarea className="h-32 resize-none" {...register("anonymous")}></Textarea>
                </div>

                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="" className="font-semibold">
                        Report of Verbal, Physical or Emotional Abuse (optional)
                    </label>

                    <p className="text-sm text-gray-600">We encourage you to report any abuse if you or your friends have faced. Your personal information won't be disclosed with anyone.</p>

                    <Textarea className='h-32 resize-none' {...register("abuseReport")}></Textarea>
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
