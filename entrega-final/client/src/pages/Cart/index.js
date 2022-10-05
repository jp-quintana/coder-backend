import { useState, useEffect } from 'react';

import CartItem from './CartItem';

import styles from './index.module.css';

const Cart = () => {
  const [cartProducts, setCartProducts] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch('/api/carrito/1/productos');
      const data = await response.json();

      setCartProducts(data);
      setIsPending(false);
    };

    fetchCart();
  }, []);

  console.log(cartProducts);

  return (
    <>
      {isPending && <p>Cargando carrito</p>}
      {cartProducts && (
        <div className={styles.cart_container}>
          {cartProducts.map((product) => {
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
        </div>
      )}
    </>
  );
};

export default Cart;
