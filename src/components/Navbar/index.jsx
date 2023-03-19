import { useDispatch } from 'react-redux';
import { AiOutlineMenu } from 'react-icons/ai';

import LogoImage from '@/assets/images/logo.png';
import UserImage from '@/assets/images/user.png';

import { toggleMenu } from '../../redux';

import './navbar.scss';

const Navbar = () => {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(toggleMenu(true));
  };

  return (
    <div className='navbar-container'>
      <div className='mobile-menu'>
        <AiOutlineMenu className='menu-icon' onClick={openModal} />
        <img src={LogoImage} alt='logo efishery' className='menu-logo' />
      </div>
      <h5 className='username'>
        Hello, <span>Elzandi</span>
      </h5>
      <img src={UserImage} alt='user image' className='avatar' />
    </div>
  );
};

export default Navbar;
