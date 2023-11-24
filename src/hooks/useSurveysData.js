import { useEffect, useState } from "react"
import { doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { surveysRef } from "@/config/firebase"
import { useRecoilState } from "recoil";
import { db } from '@/config/firebase';
import { authState } from "@/states";
import moment from "moment";

const useSurveysData = () => {
    const [authUser] = useRecoilState(authState)
    const [surveys, setSurveys] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const getSurveys = async () => {
            try {
                setIsError(false)
                setIsLoading(true)

                const currentUserSurveysRef = query(surveysRef, where("user.id", "==", authUser.id), where("status", "==", "ACTIVE"))
                const snapshot = await getDocs(currentUserSurveysRef);
                const tempSurveys = []
                snapshot?.docs?.map((doc) => {
                    tempSurveys.push({
                        ...doc.data(), id: doc.id
                    })
                })

                const expiredSurveys = tempSurveys.filter((survey) => {
                    const expiryDate = survey.expiry
                    if (expiryDate != "NEVER") {
                        const today = new Date(moment().format("YYYY-MM-DD"))
                        const expiry = new Date(expiryDate)
                        const diff = expiry - today
                        return diff <= 0
                    }
                })

                setSurveys(tempSurveys)

                if (expiredSurveys.length > 0) {
                    console.log(expiredSurveys)
                    expiredSurveys.map((survey) => {
                        const docRef = doc(db, "surveys", survey.id)
                        updateDoc(docRef, {
                            status: "EXPIRED"
                        }).then(() => {
                            window.location.reload()
                        }).catch(err => {
                            console.log(err)
                        })
                    })
                }
            } catch {
                setIsError(true)
            } finally {
                setIsLoading(false)
            }
        }
        getSurveys()
    }, [authUser])

    return { surveys, isLoading, isError }
}

export default useSurveysData