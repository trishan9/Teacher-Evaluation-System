import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import formSchema from "./formSchema"
import clsx from "clsx"

const LoginForm = () => {
    const navigate = useNavigate()

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: zodResolver(formSchema),
    })

    const handleLogin = (value) => {
        console.log(value)
        navigate("/")
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
                            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                            errors.userName && "focus:ring-error ring-error"
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
                            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                            errors.password && "focus:ring-error ring-error"
                        )}
                    />

                    {errors.password && <p className="text-sm text-error">{errors.password.message}</p>}
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-accent_primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#1e2f49] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out"
                >
                    Sign in
                </button>
            </div>
        </form>
    )
}

export default LoginForm
