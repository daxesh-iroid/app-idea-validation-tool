const paginate = (query = {}) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const offset = (page - 1) * limit;

  return {
    page,
    limit,
    offset,
    meta: (total) => ({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }),
  };
};

module.exports = { paginate };
