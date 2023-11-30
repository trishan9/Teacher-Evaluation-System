import { useParams } from 'react-router-dom';
import { useState } from 'react';
import StepOne from '@/components/Participate/Form/StepOne';
import useSurveyAndSchool from '@/hooks/useSurveyAndSchool';
import StepTwo from '@/components/Participate/Form/StepTwo';

const Participate = () => {
    const { slug: id } = useParams();
    const [step, setStep] = useState(1)

    const { schoolData, survey, isLoading } = useSurveyAndSchool(id)

    const handleNextStep = (values) => {
        console.log(values)
        localStorage.setItem(`step${step}`, JSON.stringify(values))
        setStep((prevState) => prevState + 1)
    }

    const handlePreviousStep = () => {
        setStep((prevState) => prevState - 1)
    }

    return (
        <div>
            {isLoading && <p className='p-6'>Loading....</p>}

            {!schoolData?.logo && <p className='p-6'>Loading....</p>}

            {!isLoading && schoolData?.logo && survey && (
                <div className='sm:p-6 my-2 bg-white rounded-lg sm:min-h-[99vh] w-full'>
                    <div className='flex flex-col items-center justify-center w-full gap-6'>
                        <img src={schoolData.logo} />

                        <p className='text-xl font-semibold capitalize sm:text-3xl'>{survey.name} Survey</p>

                        {step == 1 &&
                            <StepOne handleNextStep={handleNextStep} schoolData={schoolData} />
                        }

                        {step == 2 &&
                            <StepTwo handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep} survey={survey} schoolData={schoolData} />
                        }
                    </div>
                </div>
            )}
        </div>
    )
}

export default Participate;