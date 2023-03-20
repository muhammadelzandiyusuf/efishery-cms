import actionType from './actionType';
import { updateObject } from '@/utils/updateObject';

const initialState = {
  products: [],
  lists: [],
};

const getProducts = (state, action) => {
  return updateObject(state, {
    ...state,
    products: action.data,
    lists: action.data,
  });
};

const getSearchProducts = (state, action) => {
  const originalList = state.lists;
  const search = action.data.toLowerCase();
  const searchList = originalList?.filter(
    (row) => row.komoditas.toLowerCase().indexOf(search) > -1
  );
  return updateObject(state, {
    ...state,
    products: searchList,
  });
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_LIST_PRODUCT:
      return getProducts(state, action);
    case actionType.GET_SEARCH_PRODUCT:
      return getSearchProducts(state, action);
    default:
      return state;
  }
};

export default productReducer;
