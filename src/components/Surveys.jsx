import { Link } from "react-router-dom";
import { useSurveysData } from "@/hooks";

const Surveys = () => {
    const { surveys, isLoading } = useSurveysData()

    return (
        <div>
            <p className="text-xl">Surveys</p>

            {isLoading && <p> Loading...</p>}

            {surveys.length == 0 && !isLoading && <p>Loading...</p>}

            <div className="flex flex-col gap-6 my-8">
                {!isLoading && surveys && surveys.map((data) => (
                    <Link to={`/dashboard/survey/${data.id}`} key={data.id} className="flex gap-6">
                        <p>{data.name}</p>

                        <button className="px-6 rounded-md bg-slate-300">Go</button>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Surveys