import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInWithEmailAndPassword } from "firebase/auth"
import clsx from "clsx"
import { auth } from "@/config/firebase"
import loader from "@/assets/loading.gif"
import { authState } from "@/states"
import formSchema from "./formSchema"

const LoginForm = () => {
    const navigate = useNavigate()
    const [isLoginError, setIsLoginError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [, setAuthUser] = useRecoilState(authState)

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: zodResolver(formSchema),
    })

    const handleLogin = async (value) => {
        const userDetails = {
            userName: `${value.userName}@trs.com`,
            password: value.password
        }

        try {
            setIsLoginError(false)
            setIsLoading(true)

            const userCredentials = await signInWithEmailAndPassword(auth, userDetails.userName, userDetails.password)
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

    return (
        <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
            <div>
                <label htmlFor="userName" className="block text-sm font-medium leading-6 text-gray-900">
                    Username
                </label>


                <div className="mt-2">
                    <input
                        id="userName"
                        {...register("userName")}
                        type="text"
                        className={clsx(
                            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6",
                            errors.userName ? "focus:ring-error ring-error" : "ring-gray-300 focus:ring-indigo-600"
                        )}
                    />

                    {errors.userName && <p className="text-sm text-error">{errors.userName.message}</p>}
                </div>
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                </label>

                <div className="mt-2">
                    <input
                        id="password"
                        {...register("password")}
                        type="password"
                        className={clsx(
                            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
                            errors.password ? "focus:ring-error ring-error" : "ring-gray-300 focus:ring-indigo-600"
                        )}
                    />

                    {errors.password && <p className="text-sm text-error">{errors.password.message}</p>}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                {isLoginError && <p className="text-sm text-error">Username and password didn't match.</p>}

                <button
                    type="submit"
                    className="flex w-full items-center gap-2 justify-center rounded-md bg-accent_primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#1e2f49] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out"
                >
                    Sign in

                    {isLoading &&
                        <img src={loader} alt="" className="w-4 bg-transparent mix-blend-screen" />
                    }
                </button>
            </div>
        </form>
    )
}

export default LoginForm
