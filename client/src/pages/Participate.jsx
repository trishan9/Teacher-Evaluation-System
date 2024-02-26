import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useSchoolData, useSingleSurveyData } from '@/hooks';
import { schoolState } from '@/states';
import StepOne from '@/components/Participate/Form/StepOne';
import StepTwo from '@/components/Participate/Form/StepTwo';
import StepThree from '@/components/Participate/Form/StepThree';
import StepFour from '@/components/Participate/Form/StepFour';
import { Footer } from "@/components"
import StepFive from '@/components/Participate/Form/StepFive';

const Participate = () => {
    const { slug: id } = useParams();
    const [searchParams] = useSearchParams();
    const { isLoading } = useSchoolData();
    const [schoolData] = useRecoilState(schoolState);
    const navigate = useNavigate();
    const { survey } = useSingleSurveyData(id);
    const step = parseInt(searchParams.get("step"));

    const handleNextStep = (values) => {
        localStorage.setItem(`step${step ? step : 1}`, JSON.stringify(values))
        navigate(`/participate/${id}?step=${step ? step + 1 : 2}`)
    }

    const handlePreviousStep = () => {
        navigate(`/participate/${id}?step=${step - 1}`)
    }

    const handleFirstStep = () => {
        navigate(`/participate/${id}?step=1`)
    }

    return (
        <div className='bg-white h-[100vh] mt-6'>
            {(isLoading || !schoolData?.data?.data.logo) && <p className='p-6'>Loading....</p>}

            {!isLoading && schoolData?.data?.data.logo && survey && (
                <div className='sm:p-6 mt-2 bg-white rounded-lg sm:min-h-[90vh] w-full'>
                    <div className='flex flex-col items-center justify-center w-full gap-6'>
                        <img src={schoolData?.data?.data.logo} className='object-cover w-24 h-24' />

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

                        {step == 5 &&
                            <StepFive handleFirstStep={handleFirstStep} />
                        }
                    </div>
                </div>
            )}

            {!isLoading && schoolData?.logo && survey && <Footer />}
        </div>
    )
}

export default Participate;