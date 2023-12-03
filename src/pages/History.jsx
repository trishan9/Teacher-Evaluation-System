import { useState, useEffect } from "react";
import { History } from "@/components";
import { useHistory } from "@/hooks";

const HistoryPage = () => {
  const { surveys } = useHistory();
  const [allSurveys, setAllSurveys] = useState([]);

  useEffect(() => {
    setAllSurveys(surveys);
  }, [surveys]);

  const expiredSurveys = allSurveys.filter((data) => {
    return data.status == "EXPIRED";
  });
  console.log(expiredSurveys);

  return (
    <div className="w-full">
      <p className="text-xl font-bold text-accent_primary">History</p>

      {expiredSurveys.length > 0 && (
        <History
          surveys={expiredSurveys}
          status="Expired"
          message="This survey has been expired"
        />
      )}
    </div>
  );
};

export default HistoryPage;
