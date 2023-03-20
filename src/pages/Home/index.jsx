import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Localbase from 'localbase';
import { notify } from 'react-notify-toast';

import productSchema from '@/constants/productSchema';
import { apiService } from '@/utils/api/actionGeneralApi';
import { GetDataArea, GetDataProduct, GetDataSize } from '@/utils/api/methodConstApi';

import HomeView from './HomeView';

import {
  getCity,
  getListProduct,
  getProvince,
  getSearchProduct,
  getSize,
  productListSelector,
} from '../../redux';
import {
  deleteData,
  getSupportData,
  resetForm,
  setDataForEdit,
  submitData,
  updateData,
} from '@/utils/mixins';

const Home = () => {
  const products = useSelector(productListSelector);
  const localDb = new Localbase('efishery');
  const dispatch = useDispatch();
  const [productID, setProductID] = useState('');
  const [isDeleteShow, setIsDeleteShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [schema, setSchema] = useState(productSchema);
  const [onLoadSchema, setOnLoadSchema] = useState(false);
  const [isShowForm, setIsShowForm] = useState(false);
  const [formType, setFormType] = useState('add');
  const [uuid, setUuid] = useState('');
  const [detailProduct, setDetailProduct] = useState({});
  const [isShowDetail, setIsShowDetail] = useState(false);

  const getDataJsonToForm = async () => {
    const newSchema = await getSupportData(productSchema);
    setSchema(newSchema);
    setOnLoadSchema(true);
  };

  const handleShowDelete = async (index) => {
    const content = index !== '' ? products[index] : index;
    setUuid(content.uuid);
    setProductID(content.komoditas);
    setIsDeleteShow(true);
  };

  const handleShowFormEdit = async (index) => {
    setFormType('edit');
    setOnLoadSchema(false);
    const content = index !== '' ? products[index] : index;
    setProductID(content.uuid);
    const newSchema = setDataForEdit(schema, content);
    setSchema(newSchema);
    setOnLoadSchema(true);
    if (index !== '') {
      setIsShowForm(true);
    }
  };

  const handleShowFormAdd = async () => {
    setIsShowForm(true);
    setFormType('add');
    await resetForm(productSchema);
  };

  const onSubmitForm = async (params) => {
    setLoading(true);
    const submit = await (formType === 'edit' ? updateData(params, productID) : submitData(params));
    if (submit.status) {
      getList();
      setIsShowForm(false);
      notify.show(
        `Data komoditas berhasil ${formType === 'add' ? 'ditambahkan' : 'diupdate'}`,
        'success',
        5000
      );
    }
    setLoading(false);
  };

  const onChangeSearch = (value) => {
    dispatch(getSearchProduct(value));
  };

  const handleDelete = async () => {
    setLoading(true);
    const submit = await deleteData(uuid);
    if (submit.status) {
      await getList();
      setIsDeleteShow(false);
      notify.show('Data komoditas berhasil dihapus', 'success', 5000);
    }
    setLoading(false);
  };

  const handleDetail = async (index) => {
    const content = index !== '' ? products[index] : index;
    setDetailProduct(content);
    setIsShowDetail(true);
  };

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
            .collection('city')
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
              const checkDoubleCity = listOfSize.find((row) => row.label === element.city);
              if (!checkDoubleCity) {
                const obj = {};
                obj.value = element.size;
                obj.label = element.size;
                listOfSize.push(obj);
              }
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
    getDataJsonToForm();
  }, []);

  return (
    <HomeView
      onChangeSearch={onChangeSearch}
      handleShowDelete={handleShowDelete}
      handleShowFormEdit={handleShowFormEdit}
      isDeleteShow={isDeleteShow}
      setIsDeleteShow={setIsDeleteShow}
      productID={productID}
      handleDelete={handleDelete}
      loading={loading}
      onLoadSchema={onLoadSchema}
      isShowForm={isShowForm}
      setIsShowForm={setIsShowForm}
      handleShowFormAdd={handleShowFormAdd}
      onSubmitForm={onSubmitForm}
      formType={formType}
      schema={schema}
      handleDetail={handleDetail}
      detailProduct={detailProduct}
      isShowDetail={isShowDetail}
      setIsShowDetail={setIsShowDetail}
    />
  );
};

export default Home;
