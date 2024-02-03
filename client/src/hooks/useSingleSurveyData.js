import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';

const useSingleSurveyData = (id) => {
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

    return { survey, isLoading, isError }
}

export default useSingleSurveyData