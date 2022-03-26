import { Route, Routes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

import './App.css';
import Body from './components/UI/Body/Body';
import Header from './components/Layout/Header/Header';
import Home from './components/Routes/Home/Home';
import Shop from './components/Routes/Shop/Shop';
import SignIn from './components/Routes/SiteEntry/SignIn';
import SignUp from './components/Routes/SiteEntry/SignUp';
import Footer from './components/Layout/Footer/Footer';
import SiteEntry from './components/Routes/SiteEntry/SiteEntry';
import store from './services/state/store';
import LoaderProvider from './components/UI/Loader/Loader';
import AuthProvider from './services/auth/AuthProvider';
import {
  SHOP_PATH,
  SIGNIN_PATH,
  SIGNUP_PATH,
  HOW_IT_WORKS_PATH,
} from './constants/constants';
import HowItWorks from './components/Routes/HowItWorks/HowItWorks';

const App = () => {
  const location = useLocation();

  return (
    <Provider store={store}>
      <AuthProvider>
        <LoaderProvider>
          <Body>
            <Header />
            <AnimatePresence exitBeforeEnter>
              <Routes location={location} key={location}>
                <Route path={SHOP_PATH} element={<Shop />} />
                <Route path={HOW_IT_WORKS_PATH} element={<HowItWorks />} />
                <Route
                  path={SIGNIN_PATH}
                  element={<SiteEntry route={SIGNIN_PATH} element={SignIn} />}
                />
                <Route
                  path={SIGNUP_PATH}
                  element={<SiteEntry route={SIGNUP_PATH} element={SignUp} />}
                />
                <Route path='*' element={<Home />} />
              </Routes>
            </AnimatePresence>
            <Footer />
          </Body>
        </LoaderProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;

console.log('SHAMELESS PLEA');
console.log(
  "HI I AM ZIIKE, I AM CURRENTLY LOOKING FOR A JOB, MOST PREFERABLY A FRONTEND DEVELOPER ROLE, WELL ANY WEB DEV ROLE(BACKEND OR FRONTEND) WOULD BE PRETTY AWESOME, SOOOOO LONG AS I DON'T HAVE TO SELL MY KIDNEYS 😨😨😨 I'M UP FOR IT, SO IF YOU HAVE ANY OPEN POSITIONS DO REACH OUT 👊👊👊👊👊",
);
