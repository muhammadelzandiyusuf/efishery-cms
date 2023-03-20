import actionType from './actionType';
import { updateObject } from '@/utils/updateObject';

const initialState = {
  products: [],
};

const getProducts = (state, action) => {
  return updateObject(state, {
    ...state,
    products: action.data,
  });
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_LIST_PRODUCT:
      return getProducts(state, action);
    default:
      return state;
  }
};

export default productReducer;
