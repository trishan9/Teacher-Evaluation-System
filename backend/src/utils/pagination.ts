const getPagination = (page: string = "1", limit: string = "9") => {
  const skip = parseInt(page) * parseInt(limit) - parseInt(limit);
  return {
    limit: parseInt(limit),
    skip,
  };
};

export default getPagination;
