import { useState } from 'react';

import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (userName) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch('/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userName),
        credentials: 'include',
      });
      const { name } = await response.json();
      console.log(name);
      dispatch({ type: 'LOGIN', payload: name });
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
