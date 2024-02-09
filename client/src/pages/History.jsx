import { useState, useEffect } from "react";
import { History } from "@/components";
import { useSchoolData } from "@/hooks";
import getTimeAgo from "@/utils/getTimeAgo";
import getExpiredDaysAgo from "@/utils/getExpiredDaysAgo";
import { cn } from "@/lib/utils";

const FILTER_OPTIONS = {
  ALL: "All",
  LAST_7_DAYS: "Last 7 days",
  LAST_30_DAYS: "Last 30 days",
};

const HistoryPage = () => {
  const { schoolData } = useSchoolData();
  const [allSurveys, setAllSurveys] = useState([]);
  const [filteredSurveys, setFilteredSurveys] = useState([]);
  const [rawExpiredSurveys, setRawExpiredSurveys] = useState([]);
  const [activeFilterOption, setActiveFilterOption] = useState(
    FILTER_OPTIONS.ALL
  );

  useEffect(() => {
    setAllSurveys(schoolData?.data?.data.surveys);
  }, [schoolData]);

  useEffect(() => {
    const expiredSurveys = allSurveys?.filter((data) => {
      return data.status == "EXPIRED";
    });

    const expiredSurveysWithDaysAgo = expiredSurveys?.map((data) => {
      const daysAgo = getTimeAgo(data.expiry);
      return { ...data, days: daysAgo };
    });

    setRawExpiredSurveys(expiredSurveysWithDaysAgo);
    setFilteredSurveys(expiredSurveysWithDaysAgo);
  }, [allSurveys]);

  const onFilterChange = (days) => {
    const filterValue = getExpiredDaysAgo(rawExpiredSurveys, days);
    if (days == 8) {
      setActiveFilterOption(FILTER_OPTIONS.LAST_7_DAYS);
    } else if (days == 31) {
      setActiveFilterOption(FILTER_OPTIONS.LAST_30_DAYS);
    }
    setFilteredSurveys(filterValue);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col justify-between lg:flex-row">
        <p className="text-xl font-bold text-accent_primary">History</p>

        <div className="flex gap-4 mt-4 lg:mt-0">
          <button
            onClick={() =>
              setFilteredSurveys(
                rawExpiredSurveys,
                setActiveFilterOption("All")
              )
            }
            className={cn(
              "flex items-center justify-center h-8 gap-2 px-6 sm:text-sm text-xs font-medium border rounded-md disabled:opacity-50",
              activeFilterOption == FILTER_OPTIONS.ALL
                ? "cursor-pointer font-bold bg-accent_primary text-accent_secondary transition-all ease-in-out"
                : "bg-white  hover:bg-gray-100"
            )}
          >
            {FILTER_OPTIONS.ALL}
          </button>
          <button
            onClick={() => onFilterChange(7 + 1)}
            className={cn(
              "flex items-center justify-center h-8 gap-2 px-4 sm:text-sm text-xs font-medium border rounded-md disabled:opacity-50",
              activeFilterOption == FILTER_OPTIONS.LAST_7_DAYS
                ? "cursor-pointer font-bold bg-accent_primary text-accent_secondary transition-all ease-in-out"
                : "bg-white  hover:bg-gray-100"
            )}
          >
            {FILTER_OPTIONS.LAST_7_DAYS}
          </button>

          <button
            onClick={() => onFilterChange(30 + 1)}
            className={cn(
              "flex items-center justify-center h-8 gap-2 px-4 sm:text-sm text-xs font-medium border rounded-md disabled:opacity-50",
              activeFilterOption == FILTER_OPTIONS.LAST_30_DAYS
                ? "cursor-pointer font-bold bg-accent_primary text-accent_secondary transition-all ease-in-out"
                : "bg-white  hover:bg-gray-100"
            )}
          >
            {FILTER_OPTIONS.LAST_30_DAYS}
          </button>
        </div>
      </div>

      <History surveys={filteredSurveys} />
    </div>
  );
};

export default HistoryPage;
