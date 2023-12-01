import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { useSingleSurveyData, useBaseUrl } from '@/hooks';

const SingleSurvey = () => {
    const { slug: id } = useParams();
    const { survey, isLoading, isError } = useSingleSurveyData(id)
    const baseUrl = useBaseUrl()

    return (
        <div>
            <Link to="/dashboard/surveys">
                <ArrowLeftIcon className='w-6 cursor-pointer' />
            </Link>

            <p className='text-xl'>Survey Details</p>

            {isLoading && <p>Loading...</p>}

            {!isLoading && !survey && isError && <p className='text-red-600'>Some error occurred. Please try again.</p>}

            {!isLoading && survey &&
                <div className='my-8'>
                    <p>Survey Name: {survey.name}</p>

                    <p>Survey Url: {baseUrl}{survey.uri}</p>
                </div>
            }
        </div>

    )
}

export default SingleSurvey
