import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../services/auth/AuthProvider';
import { LoaderContext } from '../../UI/Loader/Loader';
import RouteAnimationContainer from '../../Utilities/RouteAnimationContainer/RouteAnimationContainer';
import {
  SHOP_PATH,
  SIGNIN_PATH,
  SIGNUP_PATH,
} from '../../../constants/constants';

const SiteEntry = ({ element: ELEMENT, route }) => {
  const { setLoading } = useContext(LoaderContext);
  const { currentUser, signUserUp, signUserIn } = useContext(AuthContext);

  const navigateTo = useNavigate();

  useEffect(() => {
    if (currentUser) navigateTo(SHOP_PATH);
    else {
      setLoading(currentUser);
    }
  }, [currentUser]);

  return (
    <>
      {route === SIGNIN_PATH && (
        <RouteAnimationContainer>
          <ELEMENT
            changeHandler={(...args) => {
              signUserIn(...args);
              setLoading(true);
            }}
          />
        </RouteAnimationContainer>
      )}
      {route === SIGNUP_PATH && (
        <RouteAnimationContainer>
          <ELEMENT
            changeHandler={(...args) => {
              signUserUp(...args);
              setLoading(true);
            }}
          />
        </RouteAnimationContainer>
      )}
    </>
  );
};

export default SiteEntry;
