import { SideNav } from "@/components"
import { clsx } from "clsx"
const datas = [
    {
        id: 1,
        date: "11th Oct, 2023",
        surveyName: "Class 10 Survey",
        status: "Active",
        message: "You created a survey"
    },
    {
        id: 2,
        date: "12th Oct, 2023",
        surveyName: "Class 11 Survey",
        status: "Expired",
        message: "Survey has been expired"
    },
    {
        id: 3,
        date: "10th Oct, 2023",
        surveyName: "Class 12 Survey",
        status: "Expired",
        message: "Survey has been expired"
    },
    {
        id: 4,
        date: "9th Oct, 2023",
        surveyName: "Class 8 Survey",
        status: "Active",
        message: "You created a survey"
    },
    {
        id: 5,
        date: "8th Oct, 2023",
        surveyName: "Class 9 Survey",
        status: "Active",
        message: "You created a survey"
    },
    {
        id: 6,
        date: "7th Oct, 2023",
        surveyName: "Class 7 Survey",
        status: "Active",
        message: "You created a survey"
    },
]
const History = () => {
    return (
        <div className="flex gap-6 p-8 w-full">
            <SideNav activeMenu={2} />

            <div className="w-full"> 
                <p className="text-xl">History</p>
                <div className="grid grid-cols-3 gap-9 w-full  mt-5">
                    {datas.map(data=>(
                     <div key={data.id} className="bg-white rounded-md p-6 py-4">
                        <div className="flex justify-between">
                            <p>{data.message}</p>
                            <p>{data.date}</p></div>
                        <div className="flex justify-between text-xs mt-6">
                            <p>Survey Name</p>
                            <p>Status</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-bold"> 
                                {data.surveyName}
                            </p>
                            <p className={clsx("font-semibold",
                                data.status == "Active" ? "text-success" : "text-error"
                            )
                        }>
                                {data.status}
                            </p>
                        </div>
                     </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default History
