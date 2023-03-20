import actionType from './actionType';
import { updateObject } from '@/utils/updateObject';

const initialState = {
  products: [],
  lists: [],
  sortFilter: {},
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

const getFilterProducts = (state, action) => {
  const filter = action.data.value;
  const filterModel = action.data.model;

  const sortFilter = {
    ...state.sortFilter,
    [filterModel]: filter,
  };

  const provinceFilter = sortFilter['province'] ? sortFilter['province'].toLowerCase() : '';
  const cityFilter = sortFilter['city'] ? sortFilter['city'].toLowerCase() : '';
  const sizeFilter = sortFilter['size'] ? sortFilter['size'].toLowerCase() : '';

  const filterList = state.lists.filter(
    (row) =>
      row.area_provinsi &&
      row.area_provinsi.toLowerCase().indexOf(provinceFilter) > -1 &&
      row.area_kota &&
      row.area_kota.toLowerCase().indexOf(cityFilter) > -1 &&
      (row.size && row.size.toLowerCase().indexOf(sizeFilter)) > -1
  );

  return updateObject(state, {
    ...state,
    products: filterList,
    sortFilter: sortFilter,
  });
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_LIST_PRODUCT:
      return getProducts(state, action);
    case actionType.GET_SEARCH_PRODUCT:
      return getSearchProducts(state, action);
    case actionType.FILTER_DATA:
      return getFilterProducts(state, action);
    default:
      return state;
  }
};

export default productReducer;
