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
      <div className="flex justify-between font-bold">History</div>

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
