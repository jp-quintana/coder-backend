import { useState } from 'react';

import { useAuthContext } from './useAuthContext';
import { useCartContext } from './useCartContext';

export const useCart = () => {
  const { user } = useAuthContext();
  const { items, dispatch } = useCartContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addItem = async (product) => {
    setError(null);
    setIsLoading(true);
    try {
      await fetch(`/api/carrito/${user.id}/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id }),
      });

      let updatedItems = [...items];

      const existingItemIndex = updatedItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex >= 0) {
        updatedItems[existingItemIndex].quantity += 1;
      } else {
        updatedItems = [
          {
            ...product,
            quantity: 1,
          },
        ];
      }

      dispatch({ type: 'UPDATE_CART', payload: updatedItems });
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  const removeItem = async (id) => {
    setError(null);
    setIsLoading(true);
    try {
      await fetch(`/api/carrito/${user.id}/productos/${id}`, {
        method: 'DELETE',
      });

      const updatedItems = items.filter((item) => item.id !== id);

      dispatch({ type: 'UPDATE_CART', payload: updatedItems });
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  const updateCart = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(`/api/carrito/${user.id}/productos`);
      const data = await response.json();

      dispatch({ type: 'UPDATE_CART', payload: data });
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  const deleteCart = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await fetch(`/api/carrito/${user.id}`, { method: 'DELETE' });

      dispatch({ type: 'DELETE_CART' });
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  return {
    addItem,
    removeItem,
    updateCart,
    deleteCart,
    isLoading,
    error,
  };
};
