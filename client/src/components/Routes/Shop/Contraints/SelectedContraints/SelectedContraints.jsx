import { useDispatch, useSelector } from 'react-redux';

import classes from './SelectedContraints.module.css';
import contraintsTypeClasses from '../ContraintsType.module.css';
import { filterDeleteActionCreator } from '../../../../../services/state/actionCreators/actionCreators';
import { ReactComponent as DeleteSVG } from '../../../../../assets/images/close_black_24dp.svg';

const SelectedContraints = ({ className = '' }) => {
  const dispatch = useDispatch();
  const filterState = useSelector((state) => state.filters);

  const clickHandler = (filterType, filterValue) => {
    const action = filterDeleteActionCreator(filterType, filterValue);
    dispatch(action);
  };

  const filterStateStyled = [];

  for (let filterType of Object.keys(filterState)) {
    filterState[filterType].forEach((filterValue) => {
      filterStateStyled.push(
        <div
          key={`${filterType}--${filterValue}`}
          className={`${classes['selected-contraints__value']} ${contraintsTypeClasses.type.type__options}`}
        >
          {filterValue}
          <span
            className={classes.delete}
            onClick={() => {
              clickHandler(filterType, filterValue);
            }}
          >
            <DeleteSVG />
          </span>
        </div>,
      );
    });
  }
  return (
    <div
      className={`${className} ${classes['selected-contraints']} ${contraintsTypeClasses.type} no-visible-scrollbar`}
    >
      {filterStateStyled}
    </div>
  );
};

export default SelectedContraints;
