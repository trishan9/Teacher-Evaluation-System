import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useSurveyAndSchool } from '@/hooks';
import StepOne from '@/components/Participate/Form/StepOne';
import StepTwo from '@/components/Participate/Form/StepTwo';
import StepThree from '@/components/Participate/Form/StepThree';
import StepFour from '@/components/Participate/Form/StepFour';
import { Footer } from "@/components"

const Participate = () => {
    const { slug: id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const step = parseInt(searchParams.get("step"))

    const { schoolData, survey, isLoading } = useSurveyAndSchool(id)

    const handleNextStep = (values) => {
        localStorage.setItem(`step${step ? step : 1}`, JSON.stringify(values))
        navigate(`/participate/${id}?step=${step ? step + 1 : 2}`)
    }

    const handlePreviousStep = () => {
        navigate(`/participate/${id}?step=${step - 1}`)
    }

    return (
        <div>
            {isLoading && <p className='p-6'>Loading....</p>}

            {!schoolData?.logo && <p className='p-6'>Loading....</p>}

            {!isLoading && schoolData?.logo && survey && (
                <div className='sm:p-6 mt-2 bg-white rounded-lg sm:min-h-[90vh] w-full'>
                    <div className='flex flex-col items-center justify-center w-full gap-6'>
                        <img src={schoolData.logo} />

                        <p className='text-xl font-semibold capitalize sm:text-3xl'>{survey.name} Survey</p>

                        {!step &&
                            <StepOne handleNextStep={handleNextStep} schoolData={schoolData} />
                        }

                        {step == 1 &&
                            <StepOne handleNextStep={handleNextStep} schoolData={schoolData} />
                        }

                        {step == 2 &&
                            <StepTwo handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep} survey={survey} schoolData={schoolData} />
                        }

                        {step == 3 &&
                            <StepThree handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep} survey={survey} />
                        }

                        {step == 4 &&
                            <StepFour handlePreviousStep={handlePreviousStep} survey={survey} id={id} />
                        }
                    </div>
                </div>
            )}

            {!isLoading && schoolData?.logo && survey && <Footer />}
        </div>
    )
}

export default Participate;