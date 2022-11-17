import { useState } from 'react';

import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (name) => {
    console.log(name);
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch('/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(name),
        credentials: 'include',
      });
      const data = await response.json();

      dispatch({ type: 'LOGIN', payload: data });
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
