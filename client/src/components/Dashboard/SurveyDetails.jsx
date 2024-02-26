import { Fragment } from "react"
import { Tooltip as ReactTooltip } from "react-tooltip";
import { BadgeInfo } from "lucide-react"
import { cn } from "@/lib/utils"

const SurveyDetails = ({ survey }) => {
    return (
        <div className="flex flex-col w-full gap-3 p-4 bg-white border-2 rounded-lg">
            <p className="text-lg font-semibold">Survey Details</p>

            <div className="flex items-end justify-between w-full">
                <div className="flex flex-col gap-6 text-base font-medium">
                    <p>Survey Name</p>

                    <p>Survey ID</p>

                    <p>Expiration</p>

                    <p>Status</p>

                    <p>Included Subjects</p>

                    <p>Total Participants</p>

                    <p>Total Expected Students</p>
                </div>

                <div className="flex flex-col items-end gap-6 text-base font-light">
                    {survey && (
                        <Fragment>
                            <p>{survey.name}</p>

                            <p>{survey.surveyId}</p>

                            <p>{survey.expiry}</p>

                            <p
                                className={cn(
                                    "px-6 py-1 font-medium  rounded-md",
                                    survey.status === "ACTIVE"
                                        ? "text-green-700 bg-green-100"
                                        : "text-red-700 bg-red-100",
                                )}
                            >
                                {survey.status}
                            </p>

                            <div className="flex items-center gap-3">
                                <p>{survey.subjects?.length ?? 0}</p>

                                <BadgeInfo
                                    id="subjectsInfo"
                                    className="w-5 cursor-pointer"
                                />

                                <ReactTooltip
                                    className="!max-w-[22rem] !py-2 !px-3"
                                    anchorSelect="#subjectsInfo"
                                    place="top"
                                    style={{
                                        wordBreak: "break-word",
                                        whiteSpace: "pre-wrap",
                                    }}
                                >
                                    <p className="text-xs">
                                        {survey &&
                                            survey.subjects &&
                                            survey.subjects.join(", ")}
                                    </p>
                                </ReactTooltip>
                            </div>

                            <p>{survey?.participantDetails?.length ?? 0}</p>

                            <p>{survey?.totalExpectedStudents ?? 0}</p>
                        </Fragment>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SurveyDetails
