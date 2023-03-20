import actionType from './actionType';
import { updateObject } from '@/utils/updateObject';

const initialState = {
  provinces: [],
  cities: [],
  sizes: [],
};

const getProvinces = (state, action) => {
  return updateObject(state, {
    ...state,
    provinces: action.data,
  });
};

const getCities = (state, action) => {
  return updateObject(state, {
    ...state,
    cities: action.data,
  });
};

const getSizes = (state, action) => {
  return updateObject(state, {
    ...state,
    sizes: action.data,
  });
};

const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_PROVINCE:
      return getProvinces(state, action);
    case actionType.GET_CITY:
      return getCities(state, action);
    case actionType.GET_SIZE:
      return getSizes(state, action);
    default:
      return state;
  }
};

export default propertyReducer;
