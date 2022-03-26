import classes from './Footer.module.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className={classes.footer}>
      <p>&copy;{year} Ziike Inc</p>
    </div>
  );
};

export default Footer;
