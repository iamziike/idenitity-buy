import classes from './Shop.module.css';
import Products from './Products/Products';
import Contraints from './Contraints/Contraints';
import RouteAnimationContainer from '../../Utilities/RouteAnimationContainer/RouteAnimationContainer';

const Shop = () => {
  return (
    <RouteAnimationContainer className={classes.shop}>
      <Contraints />
      <Products />
    </RouteAnimationContainer>
  );
};

export default Shop;
