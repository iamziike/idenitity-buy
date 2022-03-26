import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Nav.module.css';
import { HOWITWORKS_PATH, SHOP_PATH } from '../../../constants/constants';

const navLinks = [
  { to: '/', title: 'home' },
  { to: SHOP_PATH, title: 'shop' },
  { to: HOWITWORKS_PATH, title: 'how it works' },
];

const Nav = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  let navLinksClasses = classes['nav__links'];
  let navLinksControlClasses = classes['nav__links-control'];

  if (isOpen) {
    navLinksClasses += ` ${classes['nav__links--open']}`;
    navLinksControlClasses += ` ${classes['nav__links--control--active']}`;
  }

  const navVisibilityHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className={`${className} ${classes.nav}`}>
      <ul className={navLinksClasses}>
        {navLinks.map((link, index) => (
          <li key={index}>
            <NavLink
              className={classes['nav__link']}
              to={link.to}
              onClick={navVisibilityHandler}
            >
              {link.title.toUpperCase()}
            </NavLink>
          </li>
        ))}
      </ul>
      <div
        className={navLinksControlClasses}
        onClick={navVisibilityHandler}
      ></div>
    </nav>
  );
};

export default Nav;
