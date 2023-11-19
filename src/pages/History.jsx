import { clsx } from "clsx";
import { History } from "@/components";
import { useHistory } from "@/hooks";
import { Link } from "react-router-dom";
import { useSurveysData } from "@/hooks";
import { useState, useEffect } from "react";
const HistoryPage = () => {
  const { surveys, isLoading } = useHistory();

  const [allSurveys, setAllSurveys] = useState([]);
  const [typeOf, setTypeOf] = useState("default");

  useEffect(() => {
    setAllSurveys(surveys);
  }, [surveys]);

  const activeSurveys = allSurveys.filter((data) => {
    return data.status == "ACTIVE";
  });

  const expiredSurveys = allSurveys.filter((data) => {
    return data.status == "EXPIRED";
  });
  const OnFilterChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    {
      value == "active" && setTypeOf("active");
    }
    {
      value == "expired" && setTypeOf("expired");
    }
    {
      value == "allSurveys" && setTypeOf("default");
    }
  };
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <p className="text-xl font-bold">History</p>
        <select
          className="rounded-lg"
          name="selectSurveys"
          onChange={OnFilterChange}
        >
          <option value="allSurveys">AllSurveys</option>
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
          type={typeOf}
        />
      )}
      {expiredSurveys.length > 0 && (
        <History
          surveys={expiredSurveys}
          status="Expired"
          message="Survey has been expired"
          type={typeOf}
        />
      )}
    </div>
  );
};

export default HistoryPage;
