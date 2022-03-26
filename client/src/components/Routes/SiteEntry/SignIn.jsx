import { Link } from 'react-router-dom';

import classes from './SiteEntry.module.css';
import Button from '../../UI/Button/Button';

const SignIn = ({ changeHandler }) => {
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
      <h1 className={classes['site-entry__title']}>Sign In</h1>
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
        placeholder='enter your password 🔑'
      />
      <Button>Sign In </Button>
      <span className={classes['site-entry__redirect']}>
        If you do not have an account <Link to='/signup'>signup here</Link>
      </span>
    </form>
  );
};

export default SignIn;
