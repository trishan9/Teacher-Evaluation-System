import { Link } from "react-router-dom";

const History = ({ surveys }) => {
  return (
    <div className="mt-0">
      <div>
        <div className="grid w-full grid-cols-1 mt-1 text-base">
          {surveys.length == 0 && (
            <p className="pt-3 text-sm">No any Surveys</p>
          )}

          {surveys.map((data) => (
            <div key={data.id} className="mt-4">
              <p className="text-xs pb-[2px] font-semibold">
                Expired {data.days}
              </p>
              <div
                key={data.id}
                className="px-2 pt-2 pb-4 mt-2 mb-2 bg-white rounded-md"
              >
                <Link to={`/dashboard/survey/${data.id}`}>
                  <div className="flex justify-between px-2 pt-1 text-base">
                    <table className="min-w-full divide-y divide-gray-300">
                      <tbody className="divide-y divide-gray-200">
                        <tr className="flex justify-between">
                          <td className="w-[33.2%]">
                            <p>Survey Name</p>

                            <p className="text-base font-bold">{data.name}</p>
                          </td>

                          <td className="w-[23.3%]">
                            <p>Participants</p>

                            <p className="pl-8 text-base font-bold">
                              {data.participants.length}
                            </p>
                          </td>

                          <td className="w-[23.3%]">
                            <p>Expired Date</p>

                            <p className="text-base font-bold">{data.expiry}</p>
                          </td>

                          <td>
                            <p className="pl-5">Status</p>

                            <p className="text-base font-bold text-error">
                              {data.status}
                            </p>
                          </td>
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
