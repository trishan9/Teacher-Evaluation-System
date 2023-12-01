import { useEffect, useState } from "react"
import { getDocs, query, where } from "firebase/firestore"
import { useRecoilState } from "recoil";
import { schoolsRef } from "@/config/firebase"
import { authState, schoolState } from "@/states";

const useSchoolData = () => {
    const [authUser] = useRecoilState(authState)
    const [schoolData, setSchoolData] = useRecoilState(schoolState)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const getSchoolDetails = async () => {
            try {
                setIsError(false)
                setIsLoading(true)

                const currentSchoolRef = query(schoolsRef, where("email", "==", authUser.email))
                const snapshot = await getDocs(currentSchoolRef);
                const tempSchools = []
                snapshot?.docs?.map((doc) => {
                    tempSchools.push({
                        ...doc.data(), id: doc.id
                    })
                });
                setSchoolData(tempSchools[0])
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