import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { authState } from '@/states';
import useSchoolData from './useSchoolData';

const BASE_URL = import.meta.env.VITE_API_URL

const useSingleSurveyData = (id) => {
    const [survey, setSurvey] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [authUser] = useRecoilState(authState)
    const { schoolData } = useSchoolData()

    useEffect(() => {
        const getData = async () => {
            try {
                setIsError(true)
                setIsLoading(true)
                const { data } = await axios.get(`${BASE_URL}/survey/${id}`, {
                    headers: {
                        Authorization: `Bearer ${authUser.email}`
                    }
                })
                setSurvey(data.data)
            } catch (error) {
                setIsError(true)
            } finally {
                setIsLoading(false)
            }
        }
        getData()
    }, [schoolData])

    return { survey, isLoading, isError }
}

export default useSingleSurveyData