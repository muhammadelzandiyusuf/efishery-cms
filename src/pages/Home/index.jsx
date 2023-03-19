import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import Localbase from 'localbase';

import Layout from '@/components/Layout';
import Header from '@/components/Header';
import Textfield from '@/components/Textfield';
import Button from '@/components/Button';
import { apiService } from '@/utils/api/actionGeneralApi';
import { GetDataArea, GetDataProduct, GetDataSize } from '@/utils/api/methodConstApi';

const Home = () => {
  const localDb = new Localbase('efishery');
  const getList = async () => {
    const listProduct = await apiService(GetDataProduct);
    console.log('listProduct', listProduct);
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

            localDb.collection('province').add({ data: listOfProvince });
            localDb.collection('city').add({ data: listOfCity });
          }
        }
      });
  };

  const getListOfSize = async () => {
    const listOfSize = [];

    localDb
      .collection('driver')
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

            localDb.collection('size').add({ data: listOfSize });
          }
        }
      });
  };

  useEffect(() => {
    getList();
    getListOfLocation();
    getListOfSize();
  }, []);

  return (
    <Layout>
      <Helmet>Daftar Harga - eFishery</Helmet>
      <section>
        <Header title='Perikanan Management' desc='Data harga perikanan Indonesia'>
          <Textfield
            placeholder='Cari Harga Ikan'
            icon={<AiOutlineSearch className='icon font-18 color-primary' />}
          />
          <Button type='primary'>
            <span className='text-uppercase'>Tambah Harga</span>
            <AiOutlinePlus className='font-18 ml-8p' />
          </Button>
        </Header>
      </section>
    </Layout>
  );
};

export default Home;
