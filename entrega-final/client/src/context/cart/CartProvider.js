import { useReducer, useEffect } from 'react';

import CartContext from './cart-context';

import { useAuthContext } from '../../hooks/useAuthContext';

const initialState = {
  items: [],
  cartIsReady: false,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_CART': {
      return {
        items: action.payload,
        cartIsReady: true,
      };
    }
    case 'DELETE_CART': {
      return {
        ...initialState,
        cartIsReady: true,
      };
    }

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const { user, authIsReady } = useAuthContext();

  const [state, dispatch] = useReducer(cartReducer, initialState);
  console.log(state);

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
    if (authIsReady) {
      if (user) {
        fetchCart();
      } else {
        dispatch({
          type: 'DELETE_CART',
        });
      }
    }
  }, [user, authIsReady]);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
