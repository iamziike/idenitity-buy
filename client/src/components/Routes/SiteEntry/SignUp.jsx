import { Link } from 'react-router-dom';

import classes from './SiteEntry.module.css';
import Button from '../../UI/Button/Button';

const SignUp = ({ changeHandler }) => {
  const formSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const { target } = event;

      const email = target.email.value;
      const password = target.password.value;

      if (email && password) await changeHandler(email, password);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form className={classes['site-entry']} onSubmit={formSubmitHandler}>
      <h1 className={classes['site-entry__title']}>Sign Up</h1>
      <div className={classes['site-entry__input-wrapper']}>
        <input
          required
          name='firstname'
          type='text'
          placeholder='enter your firstname 😻'
        />
        <input
          required
          name='lastname'
          type='text'
          placeholder='enter your lastname 😻'
        />
      </div>
      <input
        required
        name='email'
        type='email'
        placeholder='enter your email 📧'
      />
      <input
        required
        name='password'
        type='password'
        minLength={7}
        placeholder='enter your password 🔑'
      />
      <Button>Sign Up </Button>
      <span className={classes['site-entry__redirect']}>
        If you have an account <Link to='/signin'>signin here</Link>
      </span>
    </form>
  );
};

export default SignUp;
