import {
  FILTER_DEL,
  FILTER_ADD,
  FILTER_PARAMS,
  GENDER,
  NATIONALITY,
  NAME,
  MALE,
  FEMALE,
} from '../../../constants/constants';

const initialState = JSON.parse(localStorage.getItem(FILTER_PARAMS)) || {
  [GENDER]: [MALE, FEMALE],
  [NATIONALITY]: [],
  [NAME]: [],
};

const filtersReducer = (state = initialState, action) => {
  const { type, payload } = action;

  if (type in { FILTER_ADD, FILTER_DEL }) {
    const { filterType, filterValue } = payload;

    let newFilterState;
    let filterTypeArrayEdit = state[filterType];
    if (type === FILTER_ADD) {
      // if it already exist do nothing...
      if (filterTypeArrayEdit.includes(filterValue)) return state;

      newFilterState = {
        ...state,
        [filterType]: [...filterTypeArrayEdit, filterValue],
      };
    } else if (type === FILTER_DEL) {
      filterTypeArrayEdit = filterTypeArrayEdit.filter(
        (oldFilterValue) => oldFilterValue !== filterValue,
      );
      newFilterState = { ...state, [filterType]: filterTypeArrayEdit };
    }

    localStorage.setItem(FILTER_PARAMS, JSON.stringify(newFilterState));
    return newFilterState;
  }

  return state;
};

export default filtersReducer;
