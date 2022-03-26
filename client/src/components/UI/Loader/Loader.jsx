import { createContext, useState } from 'react';

import classes from './Loader.module.css';
import Modal from '../Modal/Modal';

export const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ setLoading }}>
      <Modal isOpen={isLoading} className={classes.loader} isClosable={false}>
        <p className={classes.loader_text}></p>
      </Modal>
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
