import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../hooks/useCartContext';

import CartItem from './CartItem';

import styles from './index.module.css';

const Cart = () => {
  const navigate = useNavigate();
  const { id: cartId, items, dispatch } = useCartContext();
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (cartId) {
      setIsPending(true);

      const fetchCart = async () => {
        const response = await fetch(`/api/carrito/${cartId}/productos`);
        const data = await response.json();

        dispatch({ type: 'UPDATE_CART', payload: data });
        setIsPending(false);
      };

      fetchCart();
    }
  }, [cartId, dispatch]);

  //TODO: CHECK 2
  useEffect(() => {
    if (cartId && items.length === 0) {
      const deleteCart = async () => {
        await fetch(`/api/carrito/${cartId}`, { method: 'DELETE' });
        dispatch({ type: 'DELETE_CART' });
      };

      deleteCart();
    }
  }, [cartId, dispatch, items]);

  const handleDeleteCart = async () => {
    await fetch(`/api/carrito/${cartId}`, { method: 'DELETE' });

    dispatch({ type: 'DELETE_CART' });

    navigate('/');
  };

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
              />
            );
          })}
          <button className={`btn ${styles.button}`} onClick={handleDeleteCart}>
            Vaciar carrito
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
