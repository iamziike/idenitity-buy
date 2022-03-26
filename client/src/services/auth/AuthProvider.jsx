import { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import app from './firebaseSetup';

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [isUserStateKnown, setIsUserStateKnown] = useState(auth.currentUser);

  const asyncRequestHandler = async (asyncFunction, ...args) => {
    try {
      setLoading(true);
      await asyncFunction(...args);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const signUserUp = (email, password) =>
    asyncRequestHandler(createUserWithEmailAndPassword, auth, email, password);

  const signUserOut = () => asyncRequestHandler(signOut, auth);

  const signUserIn = (email, password) =>
    asyncRequestHandler(signInWithEmailAndPassword, auth, email, password);

  const subscribeToAuthChanges = (observer, ...args) =>
    asyncRequestHandler(onAuthStateChanged, auth, observer, ...args);

  useEffect(() => {
    const unSubscribe = subscribeToAuthChanges((currentUser) => {
      setCurrentUser(currentUser);
      setIsUserStateKnown(true);
    });

    return unSubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signUserUp,
        signUserOut,
        signUserIn,
        subscribeToAuthChanges,
        currentUser,
        isUserStateKnown,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
