import { useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL

const useSchoolDataById = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const getData = async (id) => {
        try {
            setIsError(true)
            setIsLoading(true)
            const { data } = await axios.get(`${BASE_URL}/school/${id}`)
            return data.data
        } catch (error) {
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }
    return { getData, isLoading, isError }
}

export default useSchoolDataById