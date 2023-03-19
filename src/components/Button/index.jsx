import './button.scss';

const Button = ({ type, style, children, ...props }) => {
  return (
    <button data-testid='button' className={`button ${type} ${style}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
