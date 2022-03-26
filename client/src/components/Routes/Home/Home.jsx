import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import classes from './Home.module.css';
import RouteAnimationContainer from '../../Utilities/RouteAnimationContainer/RouteAnimationContainer';
import { SHOP_PATH } from '../../../constants/constants';
import { ReactComponent as NextSVG } from '../../../assets/images/next-svgrepo-com.svg';
import Modal from '../../UI/Modal/Modal';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const isSuccess =
      location.search.split('?')[1]?.toLowerCase() === 'success';
    if (!isSuccess) return;

    setShowSuccessModal(true);
    const id = setTimeout(() => {
      setShowSuccessModal(false);
      navigate(location.pathname, {});
    }, 3000);

    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <RouteAnimationContainer className={classes.home}>
      <div className={classes['hero-text']}>
        <h1>who are we? </h1>
        <h2>we give you an identity</h2>
        <h2>we make you anyone</h2>
        <h2>in anyplace at anytime</h2>
        <h2>and we are freakishly*</h2>
        <h2>good at it!!</h2>
      </div>
      <div className={classes.arrow}>
        <Link className={classes['arrow-image']} to={SHOP_PATH}>
          <NextSVG className='test' />
        </Link>
        <span className={classes['arrow-description']}>Shop</span>
      </div>
      <Modal
        isOpen={showSuccessModal}
        closeHandler={setShowSuccessModal.bind(null, false)}
        className={classes['success-modal']}
      >
        <div>YOUR PURCHASE WAS A SUCCESS🤭</div>
        <br />
        <div>DO CHECK YOUR EMAIL TO GET YOUR PURCHASE</div>
      </Modal>
    </RouteAnimationContainer>
  );
};

export default Home;
