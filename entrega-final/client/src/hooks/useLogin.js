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
      const response = await fetch('api/cuenta/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
        credentials: 'include',
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      dispatch({ type: 'LOGIN', payload: data });

      setIsLoading(false);
    } catch (err) {
      setError('Autenticación falló!');
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
