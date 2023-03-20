import { lazy } from 'react';
import { Helmet } from 'react-helmet';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import Notifications from 'react-notify-toast';

import Layout from '@/components/Layout';
import Header from '@/components/Header';
import Textfield from '@/components/Textfield';
import Button from '@/components/Button';

import Filter from './sections/Filter';
import TableCustom from './sections/Table';
import './home.scss';
import { useSelector } from 'react-redux';
import { productListSelector } from '../../redux';

const FormDelete = lazy(() => import('./sections/FormDelete'));

const HomeView = ({
  onChangeSearch,
  handleShowDelete,
  handleShowFormEdit,
  isDeleteShow,
  setIsDeleteShow,
  productID,
  handleDelete,
  loading,
}) => {
  const products = useSelector(productListSelector);

  return (
    <Layout>
      <Helmet>Komoditas Perikanan - eFishery</Helmet>
      <section>
        <Notifications />
        <Header title='Komoditas Perikanan' desc='Data harga komoditas perikanan Indonesia'>
          <Textfield
            onChange={(e) => onChangeSearch(e.target.value)}
            placeholder='Cari Data'
            icon={<AiOutlineSearch className='icon font-18 color-primary' />}
          />
          <Button variant='primary'>
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
        <FormDelete
          show={isDeleteShow}
          onHide={() => setIsDeleteShow(false)}
          id={productID}
          handleDelete={handleDelete}
          message='Apakah kamu yakin akan menghapus data berikut'
          loading={loading}
        />
      </section>
    </Layout>
  );
};

export default HomeView;
