import './button.scss';

const Button = ({ type, variant, style, children, ...props }) => {
  return (
    <button type={type} data-testid='button' className={`button ${variant} ${style}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
