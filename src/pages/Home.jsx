import { Link } from "react-router-dom"
import { Navigate } from "react-router-dom"

const Home = () => {
    if (localStorage.getItem("accessToken")) {
        return <Navigate to="/dashboard/surveys" replace />
    }

    return (
        <div className="flex flex-col items-start gap-8 p-6">
            I am Landing Page

            <Link className="px-3 bg-white border border-gray-400" to="/login">
                Log in
            </Link>
        </div>
    )
}

export default Home
