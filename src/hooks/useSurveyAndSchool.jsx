import { useState, useEffect } from "react";
import { getDocs, query, where } from "firebase/firestore"
import { surveysRef, schoolsRef } from "@/config/firebase"

const useSurveyAndSchool = (id) => {
    const [survey, setSurvey] = useState([])
    const [schoolData, setSchoolData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const currentSurveyRef = query(surveysRef, where("surveyId", "==", id))
    const schoolEmail = `${id.split("-")[0]}@trs.com`

    useEffect(() => {
        const getData = async () => {
            try {
                const docSnap = await getDocs(currentSurveyRef);
                const tempSurveys = []
                docSnap?.docs?.map((doc) => {
                    tempSurveys.push({
                        ...doc.data(), id: doc.id
                    })
                })
                setSurvey(tempSurveys[0])
            } catch (error) {
                console.log(error.message)
            }
        }

        const getSchoolDetails = async () => {
            try {
                const currentSchoolRef = query(schoolsRef, where("email", "==", schoolEmail))
                const snapshot = await getDocs(currentSchoolRef);
                const tempSchools = []
                snapshot?.docs?.map((doc) => {
                    tempSchools.push({
                        ...doc.data(), id: doc.id
                    })
                });
                setSchoolData(tempSchools[0])
            } catch (error) {
                console.log(error)
            }
        }

        try {
            setIsLoading(true)
            getSchoolDetails()
            getData()
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }, [])

    return { survey, schoolData, isLoading }
}

export default useSurveyAndSchool