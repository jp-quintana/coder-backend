import { useReducer, useEffect } from 'react';

import CartContext from './cart-context';

import { useAuthContext } from '../../hooks/useAuthContext';

const initialState = {
  items: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_CART': {
      return {
        items: action.payload,
      };
    }
    case 'DELETE_CART': {
      return initialState;
    }

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const { user } = useAuthContext();

  const [state, dispatch] = useReducer(cartReducer, initialState);

  const fetchCart = async () => {
    const response = await fetch(`/api/carrito/${user.id}/productos`);

    if (!response.ok) {
      return;
    }

    const items = await response.json();

    dispatch({
      type: 'UPDATE_CART',
      payload: items,
    });
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
