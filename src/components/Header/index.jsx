import './header.scss';

const Header = ({ title, desc, children }) => {
  return (
    <div className='pageheader'>
      <div className='pageheader-content'>
        <h1 className='pageheader-content-title'>{title}</h1>
        <h5 className='pageheader-content-description'>{desc}</h5>
      </div>
      <div className='pageheader-children'>{children}</div>
    </div>
  );
};

export default Header;
