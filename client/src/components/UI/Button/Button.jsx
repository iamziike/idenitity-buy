import classes from './Button.module.css';

const Button = ({ className = '', children, clickHandler = () => {} }) => {
  return (
    <button className={`${className} ${classes.btn}`} onClick={clickHandler}>
      {children}
    </button>
  );
};

export default Button;
