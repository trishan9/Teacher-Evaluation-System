import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

const ActiveSurveys = ({ surveys, status, message, date }) => {
  return (
    <>
      <p className="pt-4 font-semibold">{status}</p>
      <div className="grid w-full grid-cols-1 mt-5 lg:grid-cols-2 xl:grid-cols-3 gap-9">
        {surveys.map((data) => (
          <div key={data.id}>
            <Link to={`/dashboard/survey/${data.id}`}>
              <div
                key={data.id}
                className="p-6 py-4 bg-white rounded-md pb-3 mb-2"
              >
                <div className="flex justify-between">
                  <p>{message}</p>

                  <p>{date}</p>
                </div>

                <div className="flex justify-between mt-6 text-xs">
                  <p>Survey Name</p>

                  <p>Status</p>
                </div>

                <div className="flex justify-between">
                  <p className="font-bold">{data.name}</p>

                  <p
                    className={clsx(
                      "font-semibold",
                      status == "Active" ? "text-success" : "text-error"
                    )}
                  >
                    {data.status}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default ActiveSurveys;
