import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCartContext } from '../../hooks/useCartContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCart } from '../../hooks/useCart';

import CartItem from './CartItem';

import styles from './index.module.css';

const Cart = () => {
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const { id: cartId, items, dispatch } = useCartContext();
  const { updateCart, deleteCart, isLoading, error } = useCart();

  const [navigation, setNavigation] = useState(false);

  useEffect(() => {
    updateCart();
  }, []);

  const handleDeleteCart = async () => {
    await deleteCart();

    setNavigation(true);
  };

  useEffect(() => {
    if (navigation && !error) {
      navigate('/');
    } else {
      setNavigation(false);
    }
  }, [navigation]);

  return (
    <>
      <h1 className="page-title">Carrito</h1>
      {isLoading && <p>Cargando carrito...</p>}
      {!isLoading && items.length === 0 && (
        <p>No hay productos en el carrito...</p>
      )}
      {!isLoading && items.length > 0 && (
        <div className={styles.cart_container}>
          {items.map((product) => {
            return (
              <CartItem
                //TODO: FIX VIRTUAL
                key={product.id || product.productId}
                id={product.id}
                // timestamp={product.timestamp}
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
