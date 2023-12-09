import { useState, useEffect } from "react";
import { History } from "@/components";
import { useHistory } from "@/hooks";
import getTimeAgo from "@/utils/getTimeAgo";

const HistoryPage = () => {
  const { surveys } = useHistory();
  const [allSurveys, setAllSurveys] = useState([]);

  useEffect(() => {
    setAllSurveys(surveys);
  }, [surveys]);

  const expiredSurveys = allSurveys.filter((data) => {
    return data.status == "EXPIRED";
  });

  const expiredSurveysWithDate = expiredSurveys.map((data) => {
    const daysAgo = getTimeAgo(data.expiry);
    return { ...data, days: daysAgo };
  });

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <p className="text-xl font-bold text-accent_primary">History</p>
        <div className="flex gap-4">
          <button className="flex items-center justify-center h-11 gap-2 px-4 font-semibold bg-white border rounded-md hover:bg-gray-100 btn-filled-white bg-brand-white text-light-text-primary border-light-border disabled:opacity-50">
            7 days
          </button>
          <button className="flex items-center justify-center h-11 gap-2 px-4 font-semibold bg-white border rounded-md hover:bg-gray-100 btn-filled-white bg-brand-white text-light-text-primary border-light-border disabled:opacity-50">
            30days
          </button>
          <button className="flex items-center justify-center h-11 gap-2 px-4 font-semibold bg-white border rounded-md hover:bg-gray-100 btn-filled-white bg-brand-white text-light-text-primary border-light-border disabled:opacity-50">
            All
          </button>
        </div>
      </div>
      {expiredSurveys.length > 0 && (
        <History surveys={expiredSurveysWithDate} />
      )}
    </div>
  );
};

export default HistoryPage;
