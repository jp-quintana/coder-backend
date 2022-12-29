import { useReducer, useEffect } from 'react';

import CartContext from './cart-context';

import { useAuthContext } from '../../hooks/useAuthContext';

const initialState = {
  items: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART': {
      return {
        items: action.payload,
      };
    }
    case 'NO_CART_IN_STORAGE': {
      return {
        ...state,
        cartIsReady: true,
      };
    }
    case 'CREATE_CART': {
      localStorage.setItem('cart', action.payload);
      return {
        ...state,
        id: action.payload,
      };
    }
    case 'UPDATE_CART': {
      const items = action.payload;
      return { ...state, items };
    }
    case 'DELETE_CART': {
      localStorage.removeItem('cart');
      return { ...initialState, cartIsReady: true };
    }
    case 'DELETE_PRODUCT': {
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload
      );
      return { ...state, items: updatedItems };
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
      type: 'LOAD_CART',
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
