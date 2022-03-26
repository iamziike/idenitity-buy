import { useContext } from 'react';
import { Link } from 'react-router-dom';

import classes from './Header.module.css';
import Logo from '../../UI/Logo/Logo';
import Nav from '../Nav/Nav';
import Cart from '../../UI/Cart/Cart';
import { AuthContext } from '../../../services/auth/AuthProvider';
import { ReactComponent as LogoutSVG } from '../../../assets/images/logout_black_24dp.svg';
import { ReactComponent as ShopSVG } from '../../../assets/images/shopping_bag_black_24dp.svg';
import { ReactComponent as SignInSVG } from '../../../assets/images/login_black_24dp.svg';
import { ReactComponent as SignUpSVG } from '../../../assets/images/person_add_black_24dp.svg';

const Header = () => {
  const {
    isUserStateKnown,
    currentUser,
    signUserOut: signUserOutHandler,
  } = useContext(AuthContext);

  return (
    <header className={classes.header}>
      <div className={classes.header__message}>I Stand With Ukraine</div>
      <div className={classes.header__bottom}>
        <Link to='/' className={classes.logo}>
          <Logo />
        </Link>
        <Nav className={classes.nav} />
        <ul className={classes['shop-actions']}>
          {isUserStateKnown && (
            <>
              <li className={classes['shop-action']}>
                <Link className={classes['shop-action__title']} to='/shop'>
                  <ShopSVG />
                </Link>
              </li>
              <li className={classes['shop-action']}>
                <span className={classes['shop-action__title']}>
                  <Cart />
                </span>
              </li>
              {!currentUser && (
                <>
                  <li className={classes['shop-action']}>
                    <Link
                      className={classes['shop-action__title']}
                      to='/signin'
                    >
                      <SignInSVG />
                    </Link>
                  </li>
                  <li className={classes['shop-action']}>
                    <Link
                      className={classes['shop-action__title']}
                      to='/signup'
                    >
                      <SignUpSVG />
                    </Link>
                  </li>
                </>
              )}
              {currentUser && (
                <li className={classes['shop-action']}>
                  <Link
                    className={classes['shop-action__title']}
                    to='/signin'
                    onClick={signUserOutHandler}
                  >
                    <LogoutSVG />
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
