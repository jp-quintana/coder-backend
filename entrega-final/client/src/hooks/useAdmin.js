import { useState } from 'react';

import { useCartContext } from './useCartContext';

export const useAdmin = () => {
  const { items, dispatch } = useCartContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addProduct = async (productDetails) => {
    setIsLoading(true);
    setError(null);

    try {
      await fetch('/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productDetails),
      });

      setIsLoading(false);
    } catch (err) {
      setError(err);
      console.log(err);
      setIsLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    setError(null);
    setIsLoading(true);

    try {
      await fetch(`/api/productos/${productId}`, { method: 'DELETE' });

      const updatedItems = items.filter((item) => item.id !== productId);

      dispatch({ type: 'UPDATE_CART', payload: updatedItems });
      setIsLoading(false);
    } catch (err) {
      setError('Hubo un error!');
      setIsLoading(false);
    }
  };

  return { addProduct, deleteProduct, isLoading, error };
};
