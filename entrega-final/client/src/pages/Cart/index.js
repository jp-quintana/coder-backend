import { useState, useEffect } from 'react';
import { useCartContext } from '../../hooks/useCartContext';

import CartItem from './CartItem';

import styles from './index.module.css';

const Cart = () => {
  const { id: cartId, items, dispatch } = useCartContext();
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    if (cartId) {
      const fetchCart = async () => {
        const response = await fetch(`api/carrito/${cartId}/productos`);
        const data = await response.json();

        dispatch({ type: 'UPDATE_CART', payload: data });
        setIsPending(false);
      };

      fetchCart();
    }
  }, [cartId, dispatch]);

  return (
    <>
      <h1 className="page-title">Carrito</h1>
      {isPending && <p>Cargando carrito</p>}
      {!isPending && items.length === 0 && (
        <p>No hay productos en el carrito...</p>
      )}
      {items.length > 0 && (
        <div className={styles.cart_container}>
          {items.map((product) => {
            return (
              <CartItem
                key={product.id}
                id={product.id}
                timestamp={product.timestamp}
                title={product.title}
                description={product.description}
                sku={product.sku}
                thumbnail={product.thumbnail}
                price={product.price}
                stock={product.stock}
                quantity={product.quantity}
                // onDelete={handleDeleteCartItem}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Cart;
