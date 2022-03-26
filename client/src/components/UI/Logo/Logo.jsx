import classes from './Logo.module.css';
import { ReactComponent as LogoSVG } from '../../../assets/images/logo.svg';

const Logo = ({ className = '' }) => {
  return (
    <div className={`${className} ${classes.logo}`}>
      <LogoSVG />
    </div>
  );
};

export default Logo;
