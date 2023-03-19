import { Helmet } from 'react-helmet';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';

import Layout from '@/components/Layout';
import Header from '@/components/Header';
import Textfield from '@/components/Textfield';
import Button from '@/components/Button';

const Home = () => {
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
