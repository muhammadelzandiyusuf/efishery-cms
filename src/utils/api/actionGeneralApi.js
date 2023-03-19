const SteinStore = require('stein-js-client');

import { API_URL } from '@/constants/variables';

const store = new SteinStore(API_URL);

export const apiService = async (endpoint, data) => {
  let result = [];
  const { method, url } = endpoint;

  await store[method](url, data)
    .then((response) => {
      result = response;
    })
    .catch(function (error) {
      result = error.response;
    });

  return result;
};
