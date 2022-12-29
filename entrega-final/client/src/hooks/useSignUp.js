import { useState } from 'react';

import { useAuthContext } from './useAuthContext';

export const useSignUp = () => {
  const { dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const signUp = async ({ email, password }) => {
    setError(null);
    setIsLoading(true);

    const newUser = { email, password };

    try {
      const response = await fetch('api/cuenta/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
        credentials: 'include',
      });

      const data = await response.json();

      console.log(data);

      if (data.error) {
        throw new Error(data.error);
      }

      dispatch({ type: 'LOGIN', payload: data });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError('Registración falló!');
    }
  };
  return { signUp, isLoading, error };
};
