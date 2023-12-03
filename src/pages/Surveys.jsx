import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { TrashIcon } from "@heroicons/react/24/outline";
import { db } from "@/config/firebase";
import { useSurveysData } from "@/hooks";

const Surveys = () => {
  const { surveys, isLoading } = useSurveysData();
  const [activeSurveys, setActiveSurveys] = useState([]);

  useEffect(() => {
    setActiveSurveys(surveys);
  }, [surveys]);

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

  return (
    <div className="w-full">
      <p className="text-xl font-bold text-accent_primary">Surveys</p>

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
                          <td className="flex flex-col gap-2 py-[22px] pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0 w-[25%]">
                            <p className="text-light-text-secondary">
                              Survey Name
                            </p>

                            <p className="text-base font-semibold">
                              {data.name}
                            </p>
                          </td>

                          <td className=" font-semibold flex flex-col items-center justify-center gap-2 px-3 py-[22px] text-sm text-gray-500 whitespace-nowrap w-[25%]">
                            <p className="text-light-text-secondary">
                              Total Participants
                            </p>

                            <p className="text-base font-semibold">
                              {data.participants.length}
                            </p>
                          </td>

                          <td className="flex flex-col items-center justify-center gap-2 px-3 py-[22px] text-sm text-gray-500 whitespace-nowrap w-[25%]">
                            <p className="font-semibold text-light-text-secondary">
                              Expire on
                            </p>

                            <p className="text-base font-semibold">
                              {data.expiry}
                            </p>
                          </td>

                          <td className="flex items-center gap-3 px-3 py-[22px] text-sm text-gray-500 whitespace-nowrap">
                            <div className="tooltip tooltip-bottom" data-tip={data && `${data.name} Dashboard`}>
                              <Link to={`/dashboard/survey/${data.id}`}>
                                <button className="flex items-center justify-center h-12 gap-2 px-4 font-semibold bg-white border rounded-md hover:bg-gray-100 btn-filled-white bg-brand-white text-light-text-primary border-light-border disabled:opacity-50">
                                  Dashboard
                                </button>
                              </Link>
                            </div>

                            <div className="tooltip tooltip-bottom" data-tip="Delete Survey">
                              <button
                                onClick={() => handleDeleteSurvey(data.id)}
                                className="bg-white w-12 h-12 flex items-center justify-center hover:bg-gray-100 hover:border-error !font-normal bg-brand-white text-light-text-primary rounded-md border border-light-border"
                              >
                                <TrashIcon className="w-5 text-error" />
                              </button>
                            </div>
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
