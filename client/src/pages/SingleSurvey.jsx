import { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { utils, writeFile } from "xlsx";
import {
  ArrowLeft,
  Copy,
  CheckCircle2,
  Ban,
  BadgeInfo,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSingleSurveyData, useBaseUrl } from "@/hooks";

ChartJS.register(ArcElement, Tooltip);

const SingleSurvey = () => {
  const { slug: id } = useParams();
  const [participants, setParticipants] = useState([]);
  const [isSearchNotFound, setIsSearchNotFound] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedId, setCopiedId] = useState(0);
  const { survey, isLoading, isError } = useSingleSurveyData(id);
  const baseUrl = useBaseUrl();
  const navigate = useNavigate();

  useEffect(() => {
    if (survey && survey.participantDetails) {
      setParticipants(survey.participantDetails);
    }
  }, [survey]);

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setCopiedId(id);

    setTimeout(() => {
      setCopied(false);
      setCopiedId(0);
    }, 1200);
  };

  const handleDownload = (name, data) => {
    const payload = data.map((studentDetail) => studentDetail);
    const worksheet = utils.json_to_sheet(payload);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Data");
    writeFile(workbook, `${name}.xlsx`);
  };

  return (
    <div className="w-full text-accent_primary">
      {isLoading && <p>Loading...</p>}

      {!isLoading && !survey && isError && (
        <p className="text-red-600">Some error occurred. Please try again.</p>
      )}

      {!isLoading && survey && (
        <div className="flex flex-col w-full gap-6 my-2">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft className="w-6 cursor-pointer" />
            </button>

            <p className="text-2xl font-semibold">{survey.name}</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              disabled={survey.status === "EXPIRED"}
              onClick={() => handleCopy(`${baseUrl}${survey.uri}`, survey.id)}
              className={cn(
                "flex items-center gap-3 px-4 py-2 transition-all ease-in-out disabled:bg-gray-200 disabled:cursor-not-allowed border-2 rounded-md ",
                copied && copiedId == survey.id
                  ? "bg-gray-100"
                  : "bg-white hover:bg-gray-100",
              )}
            >
              {copied && copiedId == survey.id
                ? "Survey Link Copied"
                : "Copy Survey Link"}

              {copied && copiedId == survey.id ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>

            <button
              disabled={survey.status === "EXPIRED"}
              className="flex items-center gap-3 px-4 py-2 font-semibold text-white transition-all ease-in-out border-2 rounded-md disabled:bg-error/60 bg-error hover:bg-error/75 disabled:cursor-not-allowed"
            >
              End Survey
              <Ban className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col w-full gap-4 p-4 bg-white border-2 rounded-lg">
            <p className="text-lg font-semibold">Totals</p>

            <div className="grid items-center w-full grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="bg-brand-white py-[24px] flex flex-col gap-2 justify-center items-center border border-light-border rounded-lg">
                <p className="text-4xl font-medium">
                  {survey && survey.participantDetails
                    ? survey.participantDetails.length
                    : 0}
                </p>

                <p className="text-base text-gray-400">Participants</p>
              </div>

              <div className="bg-brand-white py-[24px] flex flex-col gap-2 justify-center items-center border border-light-border rounded-lg">
                <p className="text-4xl font-medium">
                  {survey ? survey.totalExpectedStudents : 0}
                </p>

                <p className="text-base text-gray-400">Students</p>
              </div>

              <div className="bg-brand-white py-[24px] flex flex-col gap-2 justify-center items-center border border-light-border rounded-lg">
                <p className="text-4xl font-medium">
                  {survey && survey.subjects ? survey.subjects.length : 0}
                </p>

                <div className="flex items-center gap-3">
                  <p className="text-base text-gray-400">Included Subjects</p>

                  <BadgeInfo
                    id="subjectsInfoTotal"
                    className="w-5 cursor-pointer"
                  />

                  <ReactTooltip
                    className="!max-w-[22rem] !py-2 !px-3"
                    anchorSelect="#subjectsInfoTotal"
                    place="bottom"
                    style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}
                  >
                    <p className="text-xs">
                      {survey && survey.subjects && survey.subjects.join(", ")}
                    </p>
                  </ReactTooltip>
                </div>
              </div>
            </div>
          </div>

          <div className="grid items-stretch w-full grid-cols-1 gap-6 lg:grid-cols-2">
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
          </div>

          <div className="w-full">
            <div className="flex flex-col items-start justify-between w-full gap-4 px-4 py-6 bg-white border-2 rounded-t-lg lg:items-center lg:flex-row lg:justify-between lg:px-8 border-light-border ">
              <p className="text-lg font-semibold">Participants</p>

              {survey &&
                survey.participantDetails &&
                survey.participantDetails.length && (
                  <div className="flex flex-col items-stretch w-full gap-4 lg:w-fit lg:flex-row">
                    <button
                      onClick={() =>
                        handleDownload(survey.name, survey.participantDetails)
                      }
                      className="flex items-center justify-center gap-2 px-4 py-2 text-sm transition-all ease-in-out bg-white border border-gray-300 rounded-md lg:justify-normal hover:bg-gray-100 disabled:bg-gray-200 disabled:cursor-not-allowed "
                    >
                      Download
                      <Download className="w-4 h-4 ml-1.5" />
                    </button>
                  </div>
                )}
            </div>

            <div className="mb-12 overflow-x-auto bg-white border rounded-b-lg lg:overflow-hidden">
              <div className="flow-root mt-4">
                <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full text-xs divide-y divide-gray-300 lg:text-base">
                      <thead>
                        <tr className="font-semibold text-gray-500">
                          <th
                            align="left"
                            scope="col"
                            className="py-3 pl-7 lg:pl-16 w-[25%]"
                          >
                            Full Name
                          </th>

                          <th
                            scope="col"
                            className="py-3.5 text-center w-[25%]"
                          >
                            Class
                          </th>

                          <th
                            scope="col"
                            className="py-3.5 pr-8 lg:pr-0 text-center w-[30%]"
                          >
                            Guardian's Name
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-200">
                        {survey &&
                          survey.participantDetails &&
                          participants &&
                          participants.map((studentDetail) => (
                            <tr key={studentDetail.studentName}>
                              <td className="py-4 text-sm lg:text-base pl-7 lg:pl-16 whitespace-nowrap w-[25%]">
                                {studentDetail.studentName}
                              </td>

                              <td className="py-4 text-sm lg:text-base text-center whitespace-nowrap w-[25%]">
                                {studentDetail.class} '{studentDetail.section}
                                '
                              </td>

                              <td
                                align="center"
                                className="py-4 pr-8 text-sm lg:pr-0 lg:text-base whitespace-nowrap"
                              >
                                {studentDetail.guardianName}
                              </td>
                            </tr>
                          ))}
                        {survey &&
                          survey.participantDetails &&
                          participants.length == 0 &&
                          !isSearchNotFound && (
                            <tr className="w-full">
                              <td colSpan={4}>
                                <p className="py-6 text-center text-red-700">
                                  No any Participants to show!
                                </p>
                              </td>
                            </tr>
                          )}
                        {isSearchNotFound && (
                          <tr className="w-full">
                            <td colSpan={4}>
                              <p className="py-6 text-center ">
                                Search results not found!
                              </p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleSurvey;
