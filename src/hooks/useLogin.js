import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "@/config/firebase"
import { authState, schoolState } from "@/states"

const useLogin = () => {
    const navigate = useNavigate()
    const [isError, setIsLoginError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [, setAuthUser] = useRecoilState(authState)
    const [, setSchoolData] = useRecoilState(schoolState)

    const login = async (userName, password) => {
        try {
            setIsLoginError(false)
            setIsLoading(true)

            const userCredentials = await signInWithEmailAndPassword(auth, userName, password)
            localStorage.setItem("accessToken", userCredentials.user.accessToken)

            const currentUser = {
                id: userCredentials.user.uid,
                email: userCredentials.user.email
            }
            setAuthUser(currentUser)
            navigate("/dashboard/surveys")
        } catch {
            setIsLoginError(true)
        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        signOut(auth).then(() => {
            localStorage.clear()
            navigate("/")
            setSchoolData(null)
        })
    }

    return { login, logout, isLoading, isError }
}

export default useLogin
