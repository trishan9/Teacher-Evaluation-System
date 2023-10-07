import { useEffect, useState } from "react"
import { getDocs } from "firebase/firestore"
import { Link } from "react-router-dom";
import { surveysRef } from "@/config/firebase"

const Surveys = () => {
    const [surveys, setSurveys] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const getSurveys = async () => {
            try {
                setIsError(false)
                setIsLoading(true)
                const snapshot = await getDocs(surveysRef);
                const tempSurveys = []
                snapshot?.docs?.map((doc) => {
                    tempSurveys.push({
                        ...doc.data(), id: doc.id
                    })
                });
                setSurveys(tempSurveys)
            } catch (error) {
                setIsError(true)
            } finally {
                setIsLoading(false)
            }
        }
        getSurveys()
    }, [])

    return (
        <div>
            <p className="text-xl">Surveys</p>
            {isLoading && <p>Loading...</p>}

            {!isLoading && !surveys && isError && <p className='text-red-600'>Some error occurred. Please try again.</p>}

            <div className="flex flex-col gap-6 my-8">
                {!isLoading && surveys && surveys.map((data) => (
                    <Link to={`/survey/${data.id}`} key={data.id} className="flex gap-6">
                        <p>{data.name}</p>

                        <button className="px-6 rounded-md bg-slate-300">Go</button>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Surveys
