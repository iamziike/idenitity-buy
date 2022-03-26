import classes from './HowItWorks.module.css';

const HowItWorks = () => {
  return (
    <div className={classes.howitworks}>
      <ul>
        <li>SIGN IN</li>
        <li>SELECT YOUR IDENTITIES</li>
        <li>
          USE THIS CARD TO PAY
          <br />
          <span className={classes.emphasize}>
            4242 4242 4242 4242
          </span> <br /> AT CHECKOUT
        </li>
        <li>RECEIVE A LINK IN YOUR EMAIL</li>
      </ul>
    </div>
  );
};

export default HowItWorks;
