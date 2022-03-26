import { useEffect, useState } from 'react';

import classes from './CheckboxOptions.module.css';

const InputOption = ({ value, checked, onSelect }) => {
  const changeHandler = ({ target }) => {
    onSelect(target.value);
  };

  return (
    <input
      checked={checked}
      type='checkbox'
      value={value}
      onChange={changeHandler}
    />
  );
};

const CheckboxOptions = ({
  className = '',
  options,
  checkedOptions = [],
  onChange,
}) => {
  const [checkboxValues, setCheckboxValues] = useState(checkedOptions);

  const selectionHandler = (optionValue) => {
    setCheckboxValues((prev) => {
      if (prev.includes(optionValue)) {
        return prev.filter((value) => value !== optionValue);
      }
      return [...prev, optionValue];
    });
  };

  useEffect(() => {
    onChange(checkboxValues);
  }, [checkboxValues]);

  return (
    <div className={`${className} ${classes.checkboxOptions}`}>
      {options.map((option) => (
        <label key={option}>
          <InputOption
            checked={checkedOptions.includes(option)}
            value={option}
            onSelect={selectionHandler}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckboxOptions;
