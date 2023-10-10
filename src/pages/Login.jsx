import React from "react"
import { Link } from "react-router-dom"

const Login = () => {
    return (
        <React.Fragment>
            <div className="flex flex-col justify-center flex-1 min-h-full py-32 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="w-auto h-10 mx-auto rounded-md"
                        src="/logo.png"
                        alt="Your Company"
                    />

                    <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="px-6 py-12 bg-white shadow sm:rounded-lg sm:px-12">
                        <form className="space-y-6" >
                            <div>
                                <label htmlFor="userName" className="block text-sm font-medium leading-6 text-gray-900">
                                    Username
                                </label>

                                <div className="mt-2">
                                    <input
                                        id="userName"
                                        name="userName"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>

                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <Link to={"/"}>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-accent_primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#1e2f49] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out"
                                    >
                                        Sign in
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>

                    <p className="mt-10 text-sm text-center text-gray-500">
                        Not a member?{' '}

                        <a href="https://innovisionx-tech.vercel.app" target="_blank" className="font-semibold leading-6 text-accent_primary hover:underline">
                            Contact Us
                        </a>
                    </p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login
