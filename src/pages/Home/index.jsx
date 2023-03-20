import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Localbase from 'localbase';

import { apiService } from '@/utils/api/actionGeneralApi';
import { GetDataArea, GetDataProduct, GetDataSize } from '@/utils/api/methodConstApi';

import HomeView from './HomeView';

import { getCity, getListProduct, getProvince, getSize } from '../../redux';

const Home = () => {
  const localDb = new Localbase('efishery');
  const dispatch = useDispatch();

  const getList = async () => {
    const listProduct = (await apiService(GetDataProduct)) || [];
    if (listProduct && listProduct.length > 0) {
      const products = listProduct.filter((list) => list.uuid !== null);
      dispatch(getListProduct(products));
    }
  };

  const getListOfLocation = async () => {
    const listOfProvince = [];
    const listOfCity = [];

    localDb
      .collection('province')
      .get()
      .then(async (collections) => {
        if (collections.length === 0) {
          const resData = await apiService(GetDataArea);
          if (resData && resData.length > 0) {
            resData.forEach((element) => {
              const checkProvince = listOfProvince.find((row) => row.label === element.province);
              if (!checkProvince) {
                const obj = {};
                obj.value = element.province;
                obj.label = element.province;
                listOfProvince.push(obj);
              }
              const checkDoubleCity = listOfCity.find((row) => row.label === element.city);
              if (!checkDoubleCity) {
                const obj = {};
                obj.value = element.city;
                obj.label = element.city;
                obj.province = element.province;
                listOfCity.push(obj);
              }
            });

            dispatch(getProvince(listOfProvince));
            dispatch(getCity(listOfCity));
            localDb.collection('province').add({ data: listOfProvince });
            localDb.collection('city').add({ data: listOfCity });
          }
        } else {
          dispatch(getProvince(collections[0].data));
          localDb
            .collection('province')
            .get()
            .then((cities) => {
              dispatch(getCity(cities[0].data));
            });
        }
      });
  };

  const getListOfSize = async () => {
    const listOfSize = [];

    localDb
      .collection('size')
      .get()
      .then(async (collections) => {
        if (collections.length === 0) {
          const resData = await apiService(GetDataSize);

          if (resData && resData.length > 0) {
            resData.forEach((element) => {
              const obj = {};
              obj.value = element.size;
              obj.label = element.size;
              listOfSize.push(obj);
            });

            dispatch(getSize(listOfSize));
            localDb.collection('size').add({ data: listOfSize });
          }
        } else {
          dispatch(getSize(collections[0].data));
        }
      });
  };

  useEffect(() => {
    getList();
    getListOfLocation();
    getListOfSize();
  }, []);

  return <HomeView />;
};

export default Home;
