import {
  ASC,
  CHANGE_SORT_ORDER,
  CHANGE_SORT_TYPE,
  NAME,
  SORT,
} from '../../../constants/constants';

const initialState = JSON.parse(localStorage.getItem(SORT)) || {
  sortType: NAME,
  orderBy: ASC,
};

const sortReducer = (state = initialState, action) => {
  const { type, payload } = action;
  let newState = state;

  if (type === CHANGE_SORT_TYPE) {
    newState = { ...newState, sortType: payload };
  } else if (type === CHANGE_SORT_ORDER) {
    if (state.orderBy === payload) return state;
    newState = { ...newState, orderBy: payload };
  }

  localStorage.setItem(SORT, JSON.stringify(newState));
  return newState;
};

export default sortReducer;
