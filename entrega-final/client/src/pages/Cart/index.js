import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCartContext } from '../../hooks/useCartContext';
import { useCart } from '../../hooks/useCart';
import { useOrder } from '../../hooks/useOrder';

import { addAllItemsPrice } from '../../utils/calc';

import CartItem from './CartItem';

import styles from './index.module.css';

const Cart = () => {
  const navigate = useNavigate();

  const { items } = useCartContext();
  const { updateCart, deleteCart, isLoading, error } = useCart();
  const { createOrder } = useOrder();

  const [navigationHome, setNavigationHome] = useState(false);
  const [navigationUser, setNavigationUser] = useState(false);

  useEffect(() => {
    updateCart();
  }, []);

  const handleDeleteCart = async () => {
    await deleteCart();

    setNavigationHome(true);
  };

  const handleCreateOrder = async () => {
    await createOrder();

    setNavigationUser(true);
  };

  useEffect(() => {
    if (navigationHome && !error) {
      navigate('/');
    } else if (navigationUser && !error) {
      navigate('/usuario');
    } else {
      setNavigationHome(false);
      setNavigationUser(false);
    }
  }, [navigationHome, navigationUser]);

  return (
    <>
      <h1 className="page-title">Carrito</h1>
      {isLoading && <p>Cargando carrito...</p>}
      {!isLoading && items.length === 0 && (
        <p>No hay productos en el carrito...</p>
      )}
      {!isLoading && items.length > 0 && (
        <div className={styles.cart_container}>
          <div className={styles.total_price_wrapper}>
            Precio Total: $ {addAllItemsPrice(items)}
          </div>
          {items.map((product) => {
            return (
              <CartItem
                //TODO: FIX VIRTUAL
                key={product.id}
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
          <button
            className={`btn ${styles.button}`}
            onClick={handleCreateOrder}
          >
            Confirmar compra
          </button>
          <button className={`btn ${styles.button}`} onClick={handleDeleteCart}>
            Vaciar carrito
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
