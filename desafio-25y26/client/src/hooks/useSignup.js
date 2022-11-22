import { useState } from 'react';

import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const { dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = async ({ email, password }) => {
    setError(null);
    setIsLoading(true);

    const newUser = { email, password };

    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
        credentials: 'include',
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      dispatch({ type: 'LOGIN', payload: data.email });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err.message);
      setError(err.message);
    }
  };
  return { signup, isLoading, error };
};
