import { useDispatch, useSelector } from 'react-redux';
import useFetch from 'use-http';

import classes from '../ContraintsType.module.css';
import Options from '../Options/Options';
import {
  CHECKBOX,
  FEMALE,
  GENDER,
  MALE,
  NAME,
  NATIONALITY,
  SEARCHBOX,
  SELECTBOX,
} from '../../../../../constants/constants';
import {
  filterAddActionCreator,
  filterDeleteActionCreator,
} from '../../../../../services/state/actionCreators/actionCreators';

const Filters = ({ className = '' }) => {
  const allCOuntriesUrl = 'https://restcountries.com/v3/all?fields=name,cca2';
  const { data = [] } = useFetch(allCOuntriesUrl, []);
  const allCountries = data.map((country) => {
    return { name: country.name.common, value: country.cca2 };
  });

  const sortedCountries = allCountries.sort((prev, next) => {
    if (prev.name < next.name) return -1;
    if (prev.name > next.name) return 1;
  });

  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const filterInsertionHandler = (filterType, value) => {
    const action = filterAddActionCreator(filterType, value);
    return dispatch(action);
  };

  const filterDeletionHandler = (filterType, value) => {
    const action = filterDeleteActionCreator(filterType, value);
    dispatch(action);
  };

  const genders = [MALE, FEMALE];
  const genderChangeHandler = (checkboxValues) => {
    const { gender: currentGenderValues } = filters;

    if (currentGenderValues.length > checkboxValues.length) {
      const newValue = currentGenderValues.filter(
        (value) => !checkboxValues.includes(value),
      )?.[0];
      return filterDeletionHandler(GENDER, newValue);
    }
    if (currentGenderValues.length < checkboxValues.length) {
      const newValue = checkboxValues.filter(
        (value) => !currentGenderValues.includes(value),
      )?.[0];
      filterInsertionHandler(GENDER, newValue);
    }
  };

  const nationalityInsertionHandler = (value) => {
    filterInsertionHandler(NATIONALITY, value);
  };

  const nameInsertionHandler = (value) => {
    filterInsertionHandler(NAME, value);
  };

  return (
    <div className={`${className} ${classes.type}`}>
      <p className={classes.title}>Filters By:</p>
      <div className={classes['type__options-wrapper']}>
        <Options
          type={CHECKBOX}
          className={classes.type__options}
          title={GENDER}
          options={genders}
          checkedOptions={filters?.gender}
          onChange={genderChangeHandler}
        />
        <Options
          type={SELECTBOX}
          className={classes.type__options}
          title={NATIONALITY}
          options={sortedCountries}
          onChange={nationalityInsertionHandler}
        />
        <Options
          type={SEARCHBOX}
          className={classes.type__options}
          title={NAME}
          onChange={nameInsertionHandler}
        />
      </div>
    </div>
  );
};

export default Filters;
