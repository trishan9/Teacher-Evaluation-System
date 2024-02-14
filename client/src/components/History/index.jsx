import { Link } from "react-router-dom";

const History = ({ surveys }) => {
  return (
    <div className="mt-0">
      <div>
        <div className="grid w-full grid-cols-1 mt-1 text-base">
          {surveys?.length == 0 && <p className="pt-3">No any Surveys</p>}

          {surveys?.map((data) => (
            <div key={data.id} className="mt-4">
              <p className="text-xs pb-[2px] font-semibold">
                {data?.days != "Ended" ? `Expired ${data.days}` : data.days}
              </p>

              <div
                key={data.id}
                className="px-2 pt-2 pb-4 mt-2 mb-2 bg-white rounded-md"
              >
                <Link to={`/dashboard/survey/${data.id}`}>
                  <div className="flex justify-between px-2 pt-1 text-base">
                    <table className="min-w-full divide-y divide-gray-300">
                      <tbody className="divide-y divide-gray-200">
                        <tr className="flex flex-col sm:flex-row justify-between sm:justify-normal gap-2 sm:gap-10">
                          <div className="flex gap-2 sm:w-[56.5%] justify-between px-4">
                            <td className="sm:w-[60%]">
                              <p className="text-xs md:text-sm">Survey Name</p>

                              <p className="text-sm md:text-base  font-bold">
                                {data.name}
                              </p>
                            </td>

                            <td className="sm:w-[40%]">
                              <p className="text-xs md:text-sm">Participants</p>

                              <p className="pl-8 text-sm md:text-base  font-bold">
                                {data.participantDetails.length}
                              </p>
                            </td>
                          </div>
                          <div className="flex gap-2 sm:w-[43.5%] justify-between px-4">
                            <td className="sm:w-[50%]">
                              <p className="text-xs md:text-sm">Expired Date</p>

                              <p className="text-sm md:text-base  font-bold">
                                {data.expiry}
                              </p>
                            </td>

                            <td>
                              <p className="pl-5 text-xs md:text-sm">Status</p>

                              <p className="text-sm md:text-base font-bold text-error">
                                {data.status}
                              </p>
                            </td>
                          </div>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
