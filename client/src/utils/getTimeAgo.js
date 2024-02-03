import { formatDistance } from "date-fns";

const getTimeAgo = (date) => {
  const timeAgo = formatDistance(new Date(date), new Date(), {
    addSuffix: true,
  });
  return timeAgo;
};

export default getTimeAgo;
