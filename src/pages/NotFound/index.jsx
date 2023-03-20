import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import NotfoundImage from '@/assets/images/404.png';

import './notfound.scss';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div className='notfound'>
        <div className='notfound-image'>
          <img src={NotfoundImage} alt='404' />
        </div>
        <Button variant='primary' onClick={() => navigate('/')}>
          Kembali ke Halaman Utama
        </Button>
      </div>
    </section>
  );
};

export default NotFound;
