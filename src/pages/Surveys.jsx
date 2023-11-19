import { Link } from "react-router-dom";
import {
  ArrowDownOnSquareIcon,
  CheckCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useSurveysData, useBaseUrl } from "@/hooks";
import { CopyIcon } from "@/components/Icons";
import { useState } from "react";
import clsx from "clsx";
import { Tooltip } from "@mui/material";
import { db } from "@/config/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useEffect } from "react";
import { utils, writeFile } from "xlsx";

const Surveys = () => {
  const { surveys, isLoading } = useSurveysData();
  const [activeSurveys, setActiveSurveys] = useState([]);
  const [copied, setCopied] = useState(false);
  const [copiedId, setCopiedId] = useState(0);
  const baseUrl = useBaseUrl();

  useEffect(() => {
    setActiveSurveys(surveys);
    console.log("Hello World");
  }, [surveys]);

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setCopiedId(id);

    setTimeout(() => {
      setCopied(false);
      setCopiedId(0);
    }, 1000);
  };

  const handleDeleteSurvey = (id) => {
    const filteredSurveys = activeSurveys.filter((survey) => survey.id != id);
    setActiveSurveys(filteredSurveys);
    const docRef = doc(db, "surveys", id);
    deleteDoc(docRef)
      .then(() => {
        console.log("Deleted!");
      })
      .catch(() => {
        setActiveSurveys(surveys);
      });
  };

  const handleDownload = (name, data) => {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Data");
    writeFile(workbook, `${name}.xlsx`);
  };

  return (
    <div className="w-full">
      <p className="text-xl font-bold">Surveys</p>

      {isLoading && <p> Loading...</p>}

      {activeSurveys.length == 0 && !isLoading && <p>No any Surveys</p>}

      <div className="flex flex-col gap-6 my-2">
        <div className="px-4 sm:px-6">
          <div className="flow-root mt-4">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 pl-2 align-middle sm:pr-6 lg:pr-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <tbody className="divide-y divide-gray-200">
                    {!isLoading &&
                      activeSurveys &&
                      activeSurveys.map((data) => (
                        <tr key={data.id} className="flex justify-between">
                          <td className="flex flex-col gap-2 py-[22px] pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">
                            <p className="text-base font-semibold">
                              {data.name}
                            </p>

                            <a
                              href={`${baseUrl}${data.uri}`}
                              target="_blank"
                              className=" text-light-text-secondary hover:underline"
                            >
                              {baseUrl}
                              {data.uri}
                            </a>
                          </td>

                          <td className=" font-semibold flex flex-col items-center justify-center gap-2 px-3 py-[22px] text-sm text-gray-500 whitespace-nowrap">
                            <p className="text-light-text-secondary">
                              Total Participants
                            </p>

                            <p className="text-base font-semibold">
                              {data.participants.length}
                            </p>
                          </td>

                          <td className="flex flex-col items-center justify-center gap-2 px-3 py-[22px] text-sm text-gray-500 whitespace-nowrap">
                            <p className="font-semibold text-light-text-secondary">
                              Expire on
                            </p>

                            <p className="text-base font-semibold">
                              {data.expiry}
                            </p>
                          </td>

                          <td className="flex items-center gap-3 px-3 py-[22px] text-sm text-gray-500 whitespace-nowrap">
                            <Tooltip title="Dashboard" placement="bottom">
                              <Link to={`/dashboard/survey/${data.id}`}>
                                <button className="flex items-center justify-center h-12 gap-2 px-4 font-semibold bg-white border rounded-md hover:bg-gray-100 btn-filled-white bg-brand-white text-light-text-primary border-light-border disabled:opacity-50">
                                  Dashboard
                                </button>
                              </Link>
                            </Tooltip>

                            <Tooltip
                              title="Copy Survey Link"
                              placement="bottom"
                            >
                              <button
                                onClick={() =>
                                  handleCopy(`${baseUrl}${data.uri}`, data.id)
                                }
                                className={clsx(
                                  "w-12 h-12 flex items-center justify-center hover:bg-gray-100 hover:border-gray-600 !font-normal rounded-md border",
                                  copied && copiedId == data.id
                                    ? "bg-gray-100"
                                    : "bg-white"
                                )}
                              >
                                {copied && copiedId == data.id ? (
                                  <CheckCircleIcon className="w-6" />
                                ) : (
                                  <CopyIcon />
                                )}
                              </button>
                            </Tooltip>

                            <Tooltip
                              title="Download Survey Data"
                              placement="bottom"
                            >
                              <button
                                onClick={() =>
                                  handleDownload(data.name, data.participants)
                                }
                                className="bg-white w-12 h-12 flex items-center justify-center hover:bg-gray-100 hover:border-gray-600 !font-normal bg-brand-white text-light-text-primary rounded-md border border-light-border"
                              >
                                <ArrowDownOnSquareIcon className="w-6" />
                              </button>
                            </Tooltip>

                            <Tooltip title="Delete Survey" placement="bottom">
                              <button
                                onClick={() => handleDeleteSurvey(data.id)}
                                className="bg-white w-12 h-12 flex items-center justify-center hover:bg-gray-100 hover:border-error !font-normal bg-brand-white text-light-text-primary rounded-md border border-light-border"
                              >
                                <TrashIcon className="w-5 text-error" />
                              </button>
                            </Tooltip>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Surveys;
