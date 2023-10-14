import { clsx } from "clsx"
import { history } from "@/constants"

const History = () => {
    return (
        <div className="w-full">
            <p className="text-xl">History</p>

            <div className="grid w-full grid-cols-1 mt-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-9">
                {history.map(data => (
                    <div key={data.id} className="p-6 py-4 bg-white rounded-md">
                        <div className="flex justify-between">
                            <p>{data.message}</p>

                            <p>{data.date}</p>
                        </div>

                        <div className="flex justify-between mt-6 text-xs">
                            <p>Survey Name</p>

                            <p>Status</p>
                        </div>

                        <div className="flex justify-between">
                            <p className="font-bold">
                                {data.surveyName}
                            </p>

                            <p className=
                                {clsx("font-semibold",
                                    data.status == "Active" ? "text-success" : "text-error"
                                )}
                            >
                                {data.status}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default History
