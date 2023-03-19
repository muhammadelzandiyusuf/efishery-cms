import './textfield.scss';

const Textfield = ({ icon, ...props }) => {
  return (
    <div className={`textfield ${icon ? 'has-icon' : ''}`}>
      {icon}
      <input data-testid='textfield' type='text' {...props} />
    </div>
  );
};

export default Textfield;
