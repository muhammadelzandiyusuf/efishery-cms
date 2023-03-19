import Sidebar from '@/components/Sidebar';

import './layout.scss';

const Layout = (props) => {
  return (
    <div className='layout'>
      <Sidebar />
      {props.children}
    </div>
  );
};

export default Layout;
