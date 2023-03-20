import actionType from './actionType';
import { updateObject } from '@/utils/updateObject';

const initialState = {
  products: [],
  lists: [],
  sortFilter: {},
  filterProvince: '',
  filterCity: '',
  filterSize: '',
};

const sortingData = (firstEl, secondEl, name, order) => {
  const objA = name === 'size' || name === 'price' ? parseInt(firstEl[name]) : firstEl[name];
  const objB = name === 'size' || name === 'price' ? parseInt(secondEl[name]) : secondEl[name];
  if (order === 'asc') {
    if (objA < objB) {
      return -1;
    }
    if (objA > objB) {
      return 1;
    }
    return 0;
  }

  if (objA > objB) {
    return -1;
  }
  if (objA < objB) {
    return 1;
  }
  return 0;
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
    (row) =>
      (row.komoditas && row.komoditas.toLowerCase().indexOf(search) > -1) ||
      (row.area_provinsi && row.area_provinsi.toLowerCase().indexOf(search) > -1) ||
      (row.area_kota && row.area_kota.toLowerCase().indexOf(search) > -1) ||
      (row.size && row.size.toLowerCase().indexOf(search)) > -1 ||
      (row.price && row.price.toLowerCase().indexOf(search)) > -1
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
    filterProvince: provinceFilter,
    filterCity: cityFilter,
    filterSize: sizeFilter,
  });
};

const getSortProducts = (state, action) => {
  const sort = action.data.value;
  const sorting = sort.split('-');
  const sortFilterData = {
    ...state.sortFilter,
    [sort]: sort,
  };

  const sortBy = state.lists.sort((firstEl, secondEl) =>
    sortingData(firstEl, secondEl, sorting[0], sorting[1])
  );

  const filterList = sortBy.filter(
    (row) =>
      row.area_provinsi &&
      row.area_provinsi.toLowerCase().indexOf(state.filterProvince) > -1 &&
      row.area_kota &&
      row.area_kota.toLowerCase().indexOf(state.filterCity) > -1 &&
      (row.size && row.size.toLowerCase().indexOf(state.filterSize)) > -1
  );

  return updateObject(state, {
    ...state,
    products: filterList,
    sortFilter: sortFilterData,
  });
};

const resetFilters = (state) => {
  return updateObject(state, {
    ...state,
    products: state.lists.filter((item) => item),
    sortFilter: {},
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
    case actionType.SORT_DATA:
      return getSortProducts(state, action);
    case actionType.RESET_FILTER:
      return resetFilters(state);
    default:
      return state;
  }
};

export default productReducer;
