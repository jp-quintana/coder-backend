import { useReducer, useEffect } from 'react';

import CartContext from './cart-context';

const initialState = {
  id: null,
  cartIsReady: false,
  items: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART_IN_STORAGE': {
      return {
        id: action.payload.id,
        cartIsReady: true,
        items: action.payload.items,
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
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const cartInStorageId = localStorage.getItem('cart');

    if (cartInStorageId) {
      const controller = new AbortController();
      const fetchCart = async () => {
        const response = await fetch(
          `/api/carrito/${cartInStorageId}/productos`,
          {
            signal: controller.signal,
          }
        );
        const data = await response.json();
        dispatch({
          type: 'LOAD_CART_IN_STORAGE',
          payload: { id: cartInStorageId, items: data },
        });
      };

      fetchCart();

      return () => {
        controller.abort();
      };
    } else {
      dispatch({ type: 'NO_CART_IN_STORAGE' });
    }
  }, []);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
