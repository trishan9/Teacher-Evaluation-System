import { History } from "@/components";
import { useHistory } from "@/hooks";
import { useState, useEffect } from "react";

const HistoryPage = () => {
  const { surveys } = useHistory();

  const [allSurveys, setAllSurveys] = useState([]);

  const [typeOfSurveys, setTypeOfSurveys] = useState("default");

  useEffect(() => {
    setAllSurveys(surveys);
  }, [surveys]);

  const activeSurveys = allSurveys.filter((data) => {
    return data.status == "ACTIVE";
  });

  const expiredSurveys = allSurveys.filter((data) => {
    return data.status == "EXPIRED";
  });

  const onFilterChange = (e) => {
    e.preventDefault();

    const value = e.target.value;

    if (value == "active") {
      setTypeOfSurveys("active");
    } else if (value == "expired") {
      setTypeOfSurveys("expired");
    } else {
      setTypeOfSurveys("default");
    }
  };
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <p className="text-xl font-bold">History</p>
        <select
          className="rounded-lg"
          name="selectSurveys"
          onChange={onFilterChange}
        >
          <option value="allSurveys">All Surveys</option>

          <option value="active">Active</option>

          <option value="expired">Expired</option>
        </select>
      </div>

      {activeSurveys.length > 0 && (
        <History
          surveys={activeSurveys}
          status="Active"
          message="You created a survey"
          date="2023-11-16"
          type={typeOfSurveys}
        />
      )}

      {expiredSurveys.length > 0 && (
        <History
          surveys={expiredSurveys}
          status="Expired"
          message="Survey has been expired"
          type={typeOfSurveys}
        />
      )}
    </div>
  );
};

export default HistoryPage;
