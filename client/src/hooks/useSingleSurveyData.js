import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL

const useSingleSurveyData = (id) => {
    const [survey, setSurvey] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const getData = async () => {
            try {
                setIsError(true)
                setIsLoading(true)
                const { data } = await axios.get(`${BASE_URL}/survey/${id}`)
                setSurvey(data.data)
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