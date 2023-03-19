import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

import './layout.scss';

const Layout = (props) => {
  return (
    <div className='layout'>
      <Sidebar />
      <div className='main-layout'>
        <Navbar />
        <div className='main-content'>{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
