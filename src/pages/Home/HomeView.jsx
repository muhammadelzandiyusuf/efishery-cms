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
const FormAdd = lazy(() => import('./sections/FormAdd'));
const FormDetail = lazy(() => import('./sections/FromDetail'));

const HomeView = ({
  onChangeSearch,
  handleShowDelete,
  handleShowFormEdit,
  isDeleteShow,
  setIsDeleteShow,
  productID,
  handleDelete,
  loading,
  onLoadSchema,
  isShowForm,
  setIsShowForm,
  handleShowFormAdd,
  onSubmitForm,
  formType,
  schema,
  handleDetail,
  detailProduct,
  isShowDetail,
  setIsShowDetail,
}) => {
  const products = useSelector(productListSelector);

  return (
    <Layout>
      <Helmet>
        <title>Komoditas Perikanan - eFishery</title>
      </Helmet>
      <section>
        <Notifications />
        <Header title='Komoditas Perikanan' desc='Data harga komoditas perikanan Indonesia'>
          <Textfield
            onChange={(e) => onChangeSearch(e.target.value)}
            placeholder='Cari Data'
            icon={<AiOutlineSearch className='icon font-18 color-primary' />}
          />
          <Button variant='primary' onClick={handleShowFormAdd}>
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
            handleDetail={handleDetail}
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
        <FormAdd
          show={isShowForm}
          onHide={() => setIsShowForm(false)}
          onSubmit={onSubmitForm}
          onLoadSchema={onLoadSchema}
          formType={formType}
          schema={schema}
        />
        <FormDetail
          show={isShowDetail}
          onHide={() => setIsShowDetail(false)}
          detail={detailProduct}
        />
      </section>
    </Layout>
  );
};

export default HomeView;
