export const getSliceData = (params, limit) => {
  const page = parseInt(params.get('page') ? params.get('page') : 1);
  const from = (page - 1) * limit;
  const to = page * limit;

  return {
    from,
    to,
    page,
  };
};
