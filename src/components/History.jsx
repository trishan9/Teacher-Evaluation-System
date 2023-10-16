import React from "react";
import clsx from "clsx";

const History = ({ surveys, status }) => {
  return (
    <div className="mt-2">
      <p className="pt-4 font-semibold">{status}</p>

      <div className="grid w-full grid-cols-1 mt-5 lg:grid-cols-2 xl:grid-cols-3 gap-9">
        {surveys.map((data) => (
          <div key={data.id} className="p-6 py-4 bg-white rounded-md pb-3 mb-2">
            <div className="flex justify-between">
              <p>{data.message}</p>

              <p>{data.date}</p>
            </div>

            <div className="flex justify-between mt-6 text-xs">
              <p>Survey Name</p>

              <p>Status</p>
            </div>

            <div className="flex justify-between">
              <p className="font-bold">{data.surveyName}</p>

              <p
                className={clsx(
                  "font-semibold",
                  data.status == "Active" ? "text-success" : "text-error"
                )}
              >
                {data.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
