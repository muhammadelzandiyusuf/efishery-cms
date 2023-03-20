import actionType from './actionType';

export const getListProduct = (product) => ({
  type: actionType.GET_LIST_PRODUCT,
  data: product,
});
