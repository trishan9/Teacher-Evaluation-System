import { useEffect, useState } from "react"
import axios from "axios";
import { useRecoilState } from "recoil";
import { authState, schoolState, teacherState } from "@/states";

const BASE_URL = import.meta.env.VITE_API_URL

const useSchoolData = () => {
    const [authUser] = useRecoilState(authState)
    const [schoolData, setSchoolData] = useRecoilState(schoolState)
    const [, setTeachers] = useRecoilState(teacherState)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const getSchoolDetails = async () => {
            try {
                setIsError(false)
                setIsLoading(true)

                const schoolData = await axios.get(`${BASE_URL}/school/me`, {
                    headers: {
                        Authorization: `Bearer ${authUser.email}`
                    }
                })
                setSchoolData(schoolData)
                setTeachers(schoolData?.data?.data?.teachers || [])
            } catch {
                setIsError(true)
            } finally {
                setIsLoading(false)
            }
        }
        getSchoolDetails()
    }, [authUser])

    return { schoolData, isLoading, isError }
}

export default useSchoolData