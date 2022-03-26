import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Products.module.css';
import Product from './Product/Product';
import useLoadFetch from '../../../../hooks/useLoadFetch';
import { cartAddActionCreator } from '../../../../services/state/actionCreators/actionCreators';
import { SERVER_URL } from '../../../../constants/constants';

const Products = () => {
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const sort = useSelector((state) => state.sort);

  const productSelectionHandler = (productData) => {
    const action = cartAddActionCreator(productData);
    dispatch(action);
  };

  const { post, response } = useLoadFetch(SERVER_URL);

  useEffect(() => {
    (async () => {
      const body = { filters, sort };
      const newProducts = await post('/identities', body);
      if (response.ok) setProducts(newProducts);
    })();
  }, [filters, sort]);

  return (
    <div className={classes.products}>
      {products.map((product) => {
        return (
          <Product
            key={product.id}
            productSelectionHandler={productSelectionHandler}
            product={product}
          />
        );
      })}
    </div>
  );
};

export default Products;
