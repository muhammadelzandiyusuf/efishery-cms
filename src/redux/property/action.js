import actionType from './actionType';

export const getProvince = (province) => ({
  type: actionType.GET_PROVINCE,
  data: province,
});

export const getCity = (city) => ({
  type: actionType.GET_CITY,
  data: city,
});

export const getSize = (size) => ({
  type: actionType.GET_SIZE,
  data: size,
});
