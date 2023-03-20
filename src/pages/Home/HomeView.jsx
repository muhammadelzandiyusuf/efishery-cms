import { Helmet } from 'react-helmet';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '@/components/Layout';
import Header from '@/components/Header';
import Textfield from '@/components/Textfield';
import Button from '@/components/Button';

import { getSearchProduct, productListSelector } from '../../redux';

import Filter from './sections/Filter';
import TableCustom from './sections/Table';
import './home.scss';

const HomeView = () => {
  const dispatch = useDispatch();
  const products = useSelector(productListSelector);

  const handleShowDelete = (id) => {
    console.log(id);
  };

  const handleShowFormEdit = (id) => {
    console.log(id);
  };

  const onChangeSearch = (value) => {
    dispatch(getSearchProduct(value));
  };

  return (
    <Layout>
      <Helmet>Komoditas Perikanan - eFishery</Helmet>
      <section>
        <Header title='Komoditas Perikanan' desc='Data harga komoditas perikanan Indonesia'>
          <Textfield
            onChange={(e) => onChangeSearch(e.target.value)}
            placeholder='Cari Data'
            icon={<AiOutlineSearch className='icon font-18 color-primary' />}
          />
          <Button type='primary'>
            <span className='text-uppercase'>Tambah Komoditas</span>
            <AiOutlinePlus />
          </Button>
        </Header>
        <div className='home-table'>
          <Filter />
          <TableCustom
            bodies={products}
            handleShowDelete={handleShowDelete}
            handleShowFormEdit={handleShowFormEdit}
          />
        </div>
      </section>
    </Layout>
  );
};

export default HomeView;
