import { Link } from "react-router-dom";
const History = ({ surveys, status, message, date }) => {
  return (
    <div className="mt-1">
      <div>
        {/* <p className="pt-4 font-bold ">{status}</p> */}

        <div className="grid w-full grid-cols-1 mt-1 lg:grid-cols-2 xl:grid-cols-1 text-base">
          {surveys.map((data) => (
            <div key={data.id}>
              <div key={data.id} className="pb-4 mb-2 px-4 bg-white rounded-md">
                <Link to={`/dashboard/survey/${data.id}`}>
                  <div className="flex justify-between mt-5 pt-5 text-sm">
                    <td className="w-[25%]">
                      <tr>Survey Name</tr>
                      <tr className="font-bold text-base">{data.name}</tr>
                    </td>
                    <td className="w-[25%]">
                      <tr>Participants</tr>
                      <tr className="font-bold text-base">
                        <p className="pl-8">{data.participants.length}</p>
                      </tr>
                    </td>
                    <td className="w-[25%]">
                      <tr>Expired Date</tr>
                      <tr className="font-bold text-base">{data.expiry}</tr>
                    </td>
                    <td>
                      <tr>
                        <p className="pl-5">Status</p>
                      </tr>
                      <tr className="text-error font-bold text-base">
                        {data.status}
                      </tr>
                    </td>
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
