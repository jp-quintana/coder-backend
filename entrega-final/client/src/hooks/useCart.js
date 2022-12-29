import { useState } from 'react';

import { useAuthContext } from './useAuthContext';
import { useCartContext } from './useCartContext';

export const useCart = () => {
  const { user } = useAuthContext();
  const { dispatch } = useCartContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addItem = async (id) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(`/api/carrito/${user.id}/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const updatedItems = await response.json();

      dispatch({ type: 'UPDATE_CART', payload: updatedItems });
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  return { addItem, isLoading, error };
};
