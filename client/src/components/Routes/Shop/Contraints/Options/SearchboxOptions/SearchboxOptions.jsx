import classes from './SearchboxOptions.module.css';

const SearchboxOptions = ({ className, onChange }) => {
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const input = event.target.option.value.trim();
    if (input) onChange(input);

    event.target.reset();
  };

  return (
    <form
      className={`${className} ${classes.seachboxOptions}`}
      onSubmit={formSubmitHandler}
    >
      <input type='search' name='option' placeholder='seach for a name' />
    </form>
  );
};

export default SearchboxOptions;
