import {
  CART_ADD,
  CART_DEL,
  CHANGE_SORT_ORDER,
  CHANGE_SORT_TYPE,
  FILTER_ADD,
  FILTER_DEL,
} from '../../../constants/constants';

export const filterAddActionCreator = (filterType, filterValue) => {
  return {
    type: FILTER_ADD,
    payload: { filterType, filterValue },
  };
};

export const filterDeleteActionCreator = (filterType, filterValue) => {
  return {
    type: FILTER_DEL,
    payload: { filterType, filterValue },
  };
};

export const cartAddActionCreator = (product) => {
  return {
    type: CART_ADD,
    payload: product,
  };
};

export const cartDeleteActionCreator = (id) => {
  return {
    type: CART_DEL,
    payload: id,
  };
};

export const sortTypeActionCreator = (sortType) => {
  return {
    type: CHANGE_SORT_TYPE,
    payload: sortType,
  };
};

export const sortOrderActionCreator = (orderBy) => {
  return {
    type: CHANGE_SORT_ORDER,
    payload: orderBy,
  };
};
