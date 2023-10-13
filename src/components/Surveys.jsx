import { useEffect, useState } from "react"
import { getDocs, query, where } from "firebase/firestore"
import { Link } from "react-router-dom";
import { surveysRef } from "@/config/firebase"
import { useRecoilState } from "recoil";
import { authState } from "@/states";

const Surveys = () => {
    const [authUser] = useRecoilState(authState)
    const [surveys, setSurveys] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const getSurveys = async () => {
            try {
                setIsError(false)
                setIsLoading(true)

                const currentUserSurveysRef = query(surveysRef, where("user.id", "==", authUser.id))
                const snapshot = await getDocs(currentUserSurveysRef);
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
    }, [authUser])

    return (
        <div>
            <p className="text-xl">Surveys</p>
            {isLoading && <p>Loading...</p>}

            {!isLoading && surveys.length == 0 && <p>Loading...</p>}

            {!isLoading && !surveys && isError && <p className='text-red-600'>Some error occurred. Please try again.</p>}

            <div className="flex flex-col gap-6 my-8">
                {!isLoading && surveys && surveys.map((data) => (
                    <Link to={`/dashboard/survey/${data.id}`} key={data.id} className="flex gap-6">
                        <p>{data.name}</p>

                        <button className="px-6 rounded-md bg-slate-300">Go</button>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Surveys
