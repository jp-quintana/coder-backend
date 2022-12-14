import { useState } from 'react';

import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const { dispatch } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async ({ email, password }) => {
    setError(null);
    setIsLoading(true);

    const user = { email, password };

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
        credentials: 'include',
      });

      const data = await response.json();

      console.log(response);

      if (data.error) {
        throw new Error(data.error);
      }

      dispatch({ type: 'LOGIN', payload: data.email });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError('Autenticación falló!');
    }
  };

  return { login, isLoading, error };
};
