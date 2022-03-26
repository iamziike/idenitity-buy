import { useDispatch, useSelector } from 'react-redux';

import classes from '../ContraintsType.module.css';
import {
  ASC,
  DESC,
  RIGHT,
  SELECTBOX,
} from '../../../../../constants/constants';
import Options from '../Options/Options';
import {
  sortOrderActionCreator,
  sortTypeActionCreator,
} from '../../../../../services/state/actionCreators/actionCreators';

const Sort = ({ className = '' }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const sort = useSelector((state) => state.sort);
  const filterKeys = Object.keys(filters);

  const sortTypeChangeHandler = (value) => {
    const action = sortTypeActionCreator(value);
    dispatch(action);
  };

  const sortOrderChangeHandler = (value) => {
    const action = sortOrderActionCreator(value);
    dispatch(action);
  };

  return (
    <div className={`${className} ${classes.type}`}>
      <div className={`${classes.title}`}>{'Sort By: '}</div>
      <div className={classes['type__options-wrapper']}>
        <Options
          type={SELECTBOX}
          className={classes.type__options}
          options={filterKeys}
          title={'sort'}
          onChange={sortTypeChangeHandler}
          selectedValue={sort.sortType}
          snapToAxis={RIGHT}
        />
        <Options
          type={SELECTBOX}
          className={classes.type__options}
          options={[ASC, DESC]}
          title={'order'}
          onChange={sortOrderChangeHandler}
          selectedValue={sort.orderBy}
          snapToAxis={RIGHT}
        />
      </div>
    </div>
  );
};

export default Sort;
