import { useEffect, useContext } from 'react';
import useFetch from 'use-http';

import { LoaderContext } from '../components/UI/Loader/Loader';

// built it to extend the useFetch with my inbuilt loader
// PS. 100 percent not reusable in other projects unless you have the same directory as mine which would be crazy

const useLoadFetch = (...data) => {
  const { setLoading } = useContext(LoaderContext);

  const response = useFetch(...data);
  const { loading } = response;

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  return response;
};

export default useLoadFetch;
