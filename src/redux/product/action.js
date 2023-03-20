import actionType from './actionType';

export const getListProduct = (product) => ({
  type: actionType.GET_LIST_PRODUCT,
  data: product,
});

export const getSearchProduct = (product) => ({
  type: actionType.GET_SEARCH_PRODUCT,
  data: product,
});

export const getFilterList = (filter) => ({
  type: actionType.FILTER_DATA,
  data: filter,
});
