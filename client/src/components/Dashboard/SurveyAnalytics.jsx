import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip);

const SurveyAnalytics = ({ survey }) => {
    return (
        <div className="w-full p-4 bg-white border-2 rounded-lg">
            <div className="flex items-center justify-between w-full">
                <p className="text-lg font-semibold">Survey Analytics</p>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-[#0FADCF] w-3 h-3 rounded-full" />

                        <p className="text-sm">Total Students</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="bg-[#6577F3] w-3 h-3 rounded-full" />

                        <p className="text-sm">Total Participants</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center gap-2 my-6">
                <Doughnut
                    datasetIdKey="id"
                    width={100}
                    height={180}
                    className="w-[10rem] justify-center items-center flex"
                    data={{
                        datasets: [
                            {
                                data: [
                                    survey && survey.participantDetails
                                        ? survey.participantDetails.length
                                        : 0,
                                    survey && survey.totalExpectedStudents
                                        ? survey.totalExpectedStudents
                                        : 0,
                                ],
                                backgroundColor: ["#6577F3", "#0FADCF"],
                                hoverOffset: 4,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                    }}
                />
            </div>
        </div>
    )
}

export default SurveyAnalytics
