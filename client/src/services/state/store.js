import { combineReducers, createStore } from 'redux';

import cartReducer from './reducers/cartReducer';
import filtersReducer from './reducers/filtersReducer';
import sortReducer from './reducers/sortReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  filters: filtersReducer,
  sort: sortReducer,
});

const store = createStore(rootReducer);

export default store;
