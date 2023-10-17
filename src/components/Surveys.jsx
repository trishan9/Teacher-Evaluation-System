import { Link } from "react-router-dom";
import { useSurveysData } from "@/hooks";
import { ArrowDownOnSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import CopyIcon from "./icon/CopyIcon";

const Surveys = () => {
  const { surveys, isLoading } = useSurveysData();
  return (
    <div className="w-full">
      <p className="text-xl font-bold">Surveys</p>

      {isLoading && <p> Loading...</p>}

      {surveys.length == 0 && !isLoading && <p>Loading...</p>}

      <div className="flex flex-col gap-6 my-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flow-root mt-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:pr-6 lg:pr-8 pl-2">
                <table className="min-w-full divide-y divide-gray-300">
                  <tbody className="divide-y divide-gray-200">
                    {!isLoading &&
                      surveys &&
                      surveys.map((data) => (
                        <tr className="flex justify-between">
                          <td className="flex flex-col gap-2 py-[22px] pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">
                            <p className="text-base font-semibold">
                              {data.name}
                            </p>

                            <p className="truncate text-light-text-secondary w-[242px] hover:underline">
                              https://linktoclass9survey.com/
                            </p>
                          </td>

                          <td className=" font-semibold flex flex-col items-center justify-center gap-2 px-3 py-[22px] text-sm text-gray-500 whitespace-nowrap">
                            <p className="text-light-text-secondary">
                              Total Students
                            </p>

                            <p className="text-base font-medium text-brand-black">
                              35
                            </p>
                          </td>

                          <td className="flex flex-col items-center justify-center gap-2 px-3 py-[22px] text-sm text-gray-500 whitespace-nowrap">
                            <p className="text-light-text-secondary  font-semibold">
                              Expire on
                            </p>

                            <p className="text-base text-brand-black  font-semibold">
                              11th Oct, 2023
                            </p>
                          </td>

                          <td className="flex items-center gap-3 px-3 py-[22px] text-sm text-gray-500 whitespace-nowrap">
                            <a href="/my-campaigns/7846d41d-1b9f-4c39-8d50-4042a3f3db7f">
                              <button className="bg-white px-4 btn-filled-white flex items-center gap-2  h-12 justify-center font-semibold bg-brand-white text-light-text-primary rounded-md border border-light-border disabled:opacity-50">
                                Dashboard
                              </button>
                            </a>

                            <button className="bg-white w-12 h-12 flex items-center justify-center hover:bg-gray-100 hover:border-gray-600 !font-normal bg-brand-white text-light-text-primary rounded-md border border-light-border">
                              <CopyIcon />
                            </button>

                            <button className="bg-white w-12 h-12 flex items-center justify-center hover:bg-gray-100 hover:border-gray-600 !font-normal bg-brand-white text-light-text-primary rounded-md border border-light-border">
                              <ArrowDownOnSquareIcon className="w-6" />
                            </button>

                            <button className="bg-white w-12 h-12 flex items-center justify-center hover:bg-gray-100 hover:border-error !font-normal bg-brand-white text-light-text-primary rounded-md border border-light-border">
                              <TrashIcon className="w-5 text-error" />
                            </button>
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
