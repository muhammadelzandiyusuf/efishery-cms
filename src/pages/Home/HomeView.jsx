import { Helmet } from 'react-helmet';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';

import Layout from '@/components/Layout';
import Header from '@/components/Header';
import Textfield from '@/components/Textfield';
import Button from '@/components/Button';

import { productListSelector } from '../../redux';

import TableCustom from './sections/Table';
import './home.scss';

const HomeView = () => {
  const products = useSelector(productListSelector);

  const handleShowDelete = (id) => {
    console.log(id);
  };

  const handleShowFormEdit = (id) => {
    console.log(id);
  };

  return (
    <Layout>
      <Helmet>Daftar Harga - eFishery</Helmet>
      <section>
        <Header title='Perikanan Management' desc='Data harga perikanan Indonesia'>
          <Textfield
            placeholder='Cari Komoditas Ikan'
            icon={<AiOutlineSearch className='icon font-18 color-primary' />}
          />
          <Button type='primary'>
            <span className='text-uppercase'>Tambah Harga</span>
            <AiOutlinePlus className='font-18 ml-8p' />
          </Button>
        </Header>
        <div className='home-table'>
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
