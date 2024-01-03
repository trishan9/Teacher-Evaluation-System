import { useState, useEffect } from "react";
import { History } from "@/components";
import { useHistory } from "@/hooks";
import getTimeAgo from "@/utils/getTimeAgo";
import getExpiredDaysAgo from "@/utils/getExpiredDaysAgo";

const HistoryPage = () => {
  const { surveys } = useHistory();
  const [allSurveys, setAllSurveys] = useState([]);
  const [filteredSurveys, setFilteredSurveys] = useState([]);
  const [rawExpiredSurveys, setRawExpiredSurveys] = useState([]);

  useEffect(() => {
    setAllSurveys(surveys);
  }, [surveys]);

  useEffect(() => {
    const expiredSurveys = allSurveys.filter((data) => {
      return data.status == "EXPIRED";
    });

    const expiredSurveysWithDaysAgo = expiredSurveys.map((data) => {
      const daysAgo = getTimeAgo(data.expiry);
      return { ...data, days: daysAgo };
    });

    setRawExpiredSurveys(expiredSurveysWithDaysAgo);
    setFilteredSurveys(expiredSurveysWithDaysAgo);
  }, [allSurveys]);

  const onFilterChange = (days) => {
    const filterValue = getExpiredDaysAgo(rawExpiredSurveys, days);
    setFilteredSurveys(filterValue);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <p className="text-xl font-bold text-accent_primary">History</p>

        <div className="flex gap-4">
          <button
            onClick={() => onFilterChange(7 + 1)}
            className="flex items-center justify-center h-8 gap-2 px-4 text-sm font-medium bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            Last 7 days
          </button>

          <button
            onClick={() => onFilterChange(30 + 1)}
            className="flex items-center justify-center h-8 gap-2 px-4 text-sm font-medium bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            Last 30 days
          </button>

          <button
            onClick={() => setFilteredSurveys(rawExpiredSurveys)}
            className="flex items-center justify-center h-8 gap-2 px-4 text-sm font-medium bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            All
          </button>
        </div>
      </div>

      {filteredSurveys.length > 0 && <History surveys={filteredSurveys} />}
    </div>
  );
};

export default HistoryPage;
