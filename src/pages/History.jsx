import { History } from "@/components";
import { history } from "@/constants";

const HistoryPage = () => {
  const activeSurveys = history.filter((data) => {
    return data.status == "Active";
  });

  const expiredSurveys = history.filter((data) => {
    return data.status == "Expired";
  });

  return (
    <div className="w-full">
      <p className="text-xl font-bold">History</p>

      <History surveys={activeSurveys} status="Active" />

      <History surveys={expiredSurveys} status="Expired" />
    </div>
  );
};

export default HistoryPage;
