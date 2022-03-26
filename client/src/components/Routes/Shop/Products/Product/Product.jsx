import classes from './Product.module.css';

const Product = ({ className = '', product, productSelectionHandler }) => {
  const { gender, name, avatar, price } = product;
  const { flag, country_shrt } = product.nationality;
  const { currency_symbol, value: priceValue } = price;

  const clickHandler = () => {
    productSelectionHandler(product);
  };

  return (
    <div className={`${classes.product} ${className}`} onClick={clickHandler}>
      <p className={classes.product__price}>
        {currency_symbol}
        {priceValue}
      </p>
      <div className={classes.product__image}>
        <img src={avatar} alt='avatar' />
      </div>
      <div className={classes.product__info}>
        <p className={classes.product__info__name}>{name}</p>
        <p className={classes.nat}>
          <span>
            <img src={flag} alt={`${country_shrt}`}></img>
          </span>
          <br />
        </p>
        <p>{gender.toUpperCase()} ID</p>
      </div>
    </div>
  );
};

export default Product;
