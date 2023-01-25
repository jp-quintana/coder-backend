import { createContext } from 'react';

const CartContext = createContext({
  cart: {},
  cartIsReady: false,
  items: [],
});

export default CartContext;
