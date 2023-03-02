import { useState } from 'react';

import { useAuthContext } from './useAuthContext';
import { useCartContext } from './useCartContext';

export const useOrder = () => {
  const { user } = useAuthContext();
  const { dispatch } = useCartContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getOrders = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const orders = await fetch(`/api/ordenes/${user.id}`);

      setIsLoading(false);
      return orders;
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  const createOrder = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await fetch(`/api/ordenes/${user.id}/confirm`, { method: 'POST' });

      dispatch({ type: 'DELETE_CART' });
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  return { getOrders, createOrder, isLoading, error };
};

export default useOrder;
