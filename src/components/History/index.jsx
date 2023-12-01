import ActiveSurveys from "./ActiveSurveys";
import ExpiredSurveys from "./ExpiredSurveys";

const History = ({ surveys, status, message, date, type }) => {
  return (
    <div className="mt-2">
      {status == "Active" && (type == "default" || type == "active") && (
        <ActiveSurveys
          surveys={surveys}
          status={status}
          message={message}
          date={date}
        />
      )}

      {status == "Expired" && (type == "default" || type == "expired") && (
        <ExpiredSurveys
          surveys={surveys}
          status={status}
          message={message}
          date={date}
        />
      )}
    </div>
  );
};

export default History;
