import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import classes from './Modal.module.css';
import { ReactComponent as CloseSVG } from '../../../assets/images/close_black_24dp.svg';

const modalVariant = {
  initial: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.1 },
  },
};

const backdropVariant = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const modalBackdropVariantKeys = {
  initial: 'initial',
  animate: 'visible',
  exit: 'initial',
};

const Backdrop = () => {
  useEffect(() => {
    const fixBackgroundScroll = (height, overflowY) => {
      document.body.style.height = height;
      document.body.style.overflowY = overflowY;
    };

    fixBackgroundScroll('100vh', 'hidden');

    return () => {
      fixBackgroundScroll('max-content', '');
    };
  }, []);

  return (
    <motion.div
      className={classes.backdrop}
      variants={backdropVariant}
      {...modalBackdropVariantKeys}
    ></motion.div>
  );
};

// Modal Component can be "turned-off" from outside elements as well as "within" it also
const Modal = ({
  className,
  children = '',
  closeHandler = () => {},
  isClosable = true,
  isOpen,
}) => {
  const location = useLocation();

  useEffect(() => {
    // fixes the modal still being on screen after page route
    if (isOpen) closeHandler();
  }, [location.key]);

  return (
    <AnimatePresence exitBeforeEnter>
      {isOpen && (
        <>
          {createPortal(<Backdrop />, document.getElementById('backdrop'))}
          {createPortal(
            <motion.div
              className={classes.modal}
              variants={modalVariant}
              {...modalBackdropVariantKeys}
            >
              <div className={className}>{children}</div>
              {isClosable && (
                <div
                  className={classes.close}
                  onClick={closeHandler}
                  variants={backdropVariant}
                  {...modalBackdropVariantKeys}
                >
                  <CloseSVG />
                </div>
              )}
            </motion.div>,
            document.getElementById('modal'),
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
