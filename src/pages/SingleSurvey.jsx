import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { SideNav } from "@/components";


const SingleSurvey = () => {
    const { slug: id } = useParams();
    const [survey, setSurvey] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const getData = async () => {
            try {
                setIsError(true)
                setIsLoading(true)
                const firebaseQuery = doc(db, "surveys", id)
                const docSnap = await getDoc(firebaseQuery);
                setSurvey(docSnap.data())
            } catch (error) {
                setIsError(true)
            } finally {
                setIsLoading(false)
            }
        }
        getData()
    }, [])

    return (
        <div className="flex gap-6 p-8">
            <SideNav activeMenu={0} />

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

                        <p>Survey Url: {survey.url}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default SingleSurvey
