import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineHome } from 'react-icons/ai';

import LogoImage from '@/assets/images/logo.png';

import { menuSelector, toggleMenu } from '../../redux';
import './sidebar.scss';

const Sidebar = () => {
  const location = useLocation();
  const pathName = location.pathname.split('/');
  const showMenu = useSelector(menuSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeModal = () => {
    dispatch(toggleMenu(false));
  };

  const handleToLink = (link) => {
    closeModal();
    navigate(link);
  };

  return (
    <>
      {showMenu && <div className='overlay' onClick={closeModal} />}
      <div className={`sidebar ${showMenu ? 'show' : ''}`}>
        <div className='logo'>
          <img src={LogoImage} alt={'logo efishery'} />
        </div>
        <div className='sidebar-menu'>
          <div
            className={`${pathName[1] === '' ? 'active' : ''}`}
            onClick={() => handleToLink('/')}
          >
            <AiOutlineHome className='icon' /> Beranda
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
