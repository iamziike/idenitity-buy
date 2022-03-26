import { CART_ADD, CART_DEL, CART_ITEMS } from '../../../constants/constants';

const initialState = JSON.parse(localStorage.getItem(CART_ITEMS)) || [];

const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;

  if (type in { CART_ADD, CART_DEL }) {
    let newState;

    if (type === CART_ADD) {
      if (state.some((product) => product.id === payload.id)) return state;

      newState = [...state, payload];
    } else newState = state.filter((product) => product.id !== payload);

    localStorage.setItem(CART_ITEMS, JSON.stringify(newState));
    return newState;
  }

  return state;
};

export default cartReducer;
