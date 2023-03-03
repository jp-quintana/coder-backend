import { createContext } from 'react';

const CartContext = createContext({
  items: [],
  cartIsReady: false,
});

export default CartContext;
