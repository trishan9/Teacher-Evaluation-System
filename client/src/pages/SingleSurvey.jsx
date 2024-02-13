import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {
  ArrowLeft,
  Copy,
  CheckCircle2,
  Ban,
  BadgeInfo,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSingleSurveyData, useBaseUrl } from "@/hooks";
import SurveyAnalytics from "@/components/Dashboard/SurveyAnalytics";
import SurveyDetails from "@/components/Dashboard/SurveyDetails";
import Participants from "@/components/Dashboard/Participants";
import axios from "axios";
import { authState } from "@/states";
import { useRecoilState } from "recoil";
import { Loader2 } from "lucide-react";
import SubjectAnalytics from "@/components/Dashboard/SubjectAnalytics";
import TeacherAnalytics from "@/components/Dashboard/TeacherAnalytics";
import AnonymousMessages from "@/components/Dashboard/Anonymous";

const BASE_URL = import.meta.env.VITE_API_URL

const SingleSurvey = () => {
  const { slug: id } = useParams();
  const [participants, setParticipants] = useState([]);
  const [copied, setCopied] = useState(false);
  const [copiedId, setCopiedId] = useState(0);
  const { survey, isLoading, isError } = useSingleSurveyData(id);
  const baseUrl = useBaseUrl();
  const navigate = useNavigate();
  const [authUser] = useRecoilState(authState)
  const [isExpiredLoading, setIsExpiredLoading] = useState(false)

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

  const handleEndSurvey = async () => {
    try {
      setIsExpiredLoading(true)
      await axios.patch(`${BASE_URL}/survey/${survey.id}`, {
        status: "EXPIRED",
      }, {
        headers: {
          Authorization: `Bearer ${authUser.email}`
        }
      })
      navigate("/dashboard/surveys")
    } catch (error) {
      console.log(error)
    } finally {
      setIsExpiredLoading(false)
    }
  }

  return (
    <div className="w-full max-w-full min-w-full text-accent_primary">
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
              disabled={survey.status === "EXPIRED" || isExpiredLoading}
              onClick={handleEndSurvey}
              className="flex items-center gap-3 px-4 py-2 font-semibold text-white transition-all ease-in-out border-2 rounded-md disabled:bg-error/60 bg-error hover:bg-error/75 disabled:cursor-not-allowed"
            >
              End Survey
              <Ban className="w-5 h-5" />

              {isExpiredLoading && <Loader2 className="animate-spin" />}

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
            <SurveyAnalytics survey={survey} />

            <SurveyDetails survey={survey} />
          </div>

          <SubjectAnalytics survey={survey} />

          <TeacherAnalytics survey={survey} />

          {survey?.optional?.some((data) => data.anonymous != "") && <AnonymousMessages survey={survey} />}

          <Participants survey={survey} participants={participants} />
        </div>
      )}
    </div>
  );
};

export default SingleSurvey;
