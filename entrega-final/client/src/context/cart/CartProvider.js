import { useReducer, useEffect } from 'react';

import CartContext from './cart-context';

const initialState = {
  id: null,
  cartIsReady: false,
  items: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return { ...state, id: action.payload, cartIsReady: true };
    case 'UPDATE_CART':
      const items = action.payload;
      return { ...state, items };
    case 'DELETE_PRODUCT':
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload
      );
      return { ...state, items: updatedItems };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const controller = new AbortController();
    const fetchCart = async () => {
      const response = await fetch('api/carrito/', {
        method: 'POST',
        signal: controller.signal,
      });
      const data = await response.json();
      dispatch({ type: 'LOAD_CART', payload: data });
    };

    fetchCart();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
