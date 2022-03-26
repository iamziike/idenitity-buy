const SelectboxOptions = ({
  className = '',
  options = [],
  onChange,
  selectedValue,
}) => {
  const changeHandler = ({ target }) => {
    onChange(target.value);
  };

  return (
    <select className={className} onChange={changeHandler}>
      {!selectedValue && (
        <option hidden disabled selected value>
          Select
        </option>
      )}
      {options.map((option) => {
        // will work if you text is also your value ie) no object
        const value = option.value || option;
        const name = option.name || option;

        return (
          <option
            key={value || name}
            value={value}
            selected={selectedValue === value}
          >
            {name.length > 25 ? `${name.slice(0, 20)}...` : name}
          </option>
        );
      })}
    </select>
  );
};

export default SelectboxOptions;
