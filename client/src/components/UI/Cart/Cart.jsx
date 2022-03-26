import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Cart.module.css';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import useLoadFetch from '../../../hooks/useLoadFetch';
import { AuthContext } from '../../../services/auth/AuthProvider';
import { ReactComponent as CartSVG } from '../../../assets/images/shopping_cart_black_24dp.svg';
import { ReactComponent as DeleteSVG } from '../../../assets/images/close_black_24dp.svg';
import { cartDeleteActionCreator } from '../../../services/state/actionCreators/actionCreators';
import { SERVER_URL } from '../../../constants/constants';

const Cart = ({
  className = '',
  controllerClassName = '',
  identifier = <CartSVG />,
}) => {
  const { currentUser } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const navigateTo = useNavigate();

  const { post, response } = useLoadFetch(SERVER_URL);

  let totalPrice = 0;
  let currency_symbol = '';

  const cartItemsStyled = cartItems.map((cartItem, index) => {
    const { id, avatar, name, price } = cartItem;
    const { flag } = cartItem.nationality;
    const { value: priceValue } = price;

    totalPrice += priceValue;

    // TODO: just create an endpoint to get the currency
    if (!index) currency_symbol = price.currency_symbol;

    return (
      <div key={id} className={classes['modal__item']}>
        <div className={classes['modal__item__img-wrapper']}>
          <img src={avatar} alt='avatar' />
        </div>
        <div className={classes['modal__item__text-wrapper']}>
          <span className={classes['modal__item__name']}>{name}</span>
          <img src={flag} alt='nationality' />
        </div>
        <div
          className={classes.modal__item__delete}
          onClick={() => {
            const action = cartDeleteActionCreator(id);
            dispatch(action);
          }}
        >
          <DeleteSVG />
        </div>
      </div>
    );
  });

  const cartModalVisibilityHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const checkoutHandler = async () => {
    setIsOpen(false);
    if (!currentUser) navigateTo('/signup');
    else {
      const identitiesId = cartItems.map((item) => item.id);
      const data = await post('/checkout', {
        identitiesId,
        email: currentUser.email,
      });
      if (response.ok) window.location = data.url;
    }
  };

  return (
    <div className={`${className} ${classes.cart}`}>
      <span
        className={`${controllerClassName} ${classes.controller}`}
        onClick={cartModalVisibilityHandler}
      >
        {identifier}
        <span className={classes.cart__counter}>{cartItemsStyled.length}</span>
      </span>
      <Modal
        className={classes.modal}
        isOpen={isOpen}
        closeHandler={() => setIsOpen(false)}
      >
        <h2 className={classes['modal__title']}>
          YOUR CART ({cartItemsStyled.length})
        </h2>
        <div className={`${classes['modal__items']} no-visible-scrollbar`}>
          {cartItemsStyled}
        </div>
        <div className={classes['modal__price-data']}>
          <div>
            <span className={classes['modal__price-data__title']}>Total</span>
            <span className={classes['modal__price-data__value']}>
              {currency_symbol}
              {totalPrice.toFixed(2)}
            </span>
          </div>
          <Button clickHandler={checkoutHandler}>PROCEED TO CHECKOUT</Button>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
