import { useEffect, useRef, useState } from 'react';

import classes from './Options.module.css';
import CheckboxOptions from './CheckboxOptions/CheckboxOptions';
import SelectboxOptions from './SelectboxOptions/SelectboxOptions';
import SearchboxOptions from './SearchboxOptions/SearchboxOptions';
import { SEARCHBOX, SELECTBOX, LEFT } from '../../../../../constants/constants';
import { ReactComponent as ExpandMore } from '../../../../../assets/images/expand_more_black_24dp.svg';

// the wrapper for all options for filters
// each optiontype has a specific way it accepts and uses each of its arguments
const Options = ({
  className = '',
  type,
  title,
  onChange,
  options,
  selectedValue = '', // for selectbox
  checkedOptions = [], // for checkboxOption types options preset
  snapToAxis = LEFT,
}) => {
  const titleRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const windowClickHandler = ({ target }) => {
      if (target.closest(`.${classes['options-types']}`)) return;
      if (target.closest(`.${classes.title}`) === titleRef.current) return;
      setIsOpen(false);
    };

    window.addEventListener('pointerdown', windowClickHandler);

    return () => {
      removeEventListener('pointerdown', windowClickHandler);
    };
  }, []);

  const childrenProps = {
    className: `${className} ${classes['options-types']} ${
      snapToAxis === LEFT
        ? classes['options-types--snap-to-left']
        : classes['options-types--snap-to-right']
    }  ${isOpen ? '' : classes['options-types--no-display']}`,
    onChange,
  };

  let optionToShow = (
    <CheckboxOptions {...{ ...childrenProps, options, checkedOptions }} />
  );

  if (type === SELECTBOX)
    optionToShow = (
      <SelectboxOptions {...{ ...childrenProps, options, selectedValue }} />
    );
  if (type === SEARCHBOX)
    optionToShow = <SearchboxOptions {...childrenProps} />;

  return (
    <div
      className={`${className} ${classes.options} ${
        isOpen ? classes['options--open'] : ''
      }`}
    >
      <span ref={titleRef} className={classes.title} onClick={clickHandler}>
        {title}
        <ExpandMore />
      </span>
      {optionToShow}
    </div>
  );
};

export default Options;
