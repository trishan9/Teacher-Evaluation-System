const getExpiredDaysAgo = (expiredSurveysData, days) => {
  const filterValue = expiredSurveysData.filter((data) => {
    const date = new Date(data.expiry);
    const today = new Date();

    if (new Date(today - 86400000 * days) <= date) {
      return data;
    }
  });
  return filterValue;
};

export default getExpiredDaysAgo;
