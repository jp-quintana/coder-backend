import { useCartContext } from '../../hooks/useCartContext';

import styles from './index.module.css';

const CartItem = ({
  id,
  title,
  description,
  sku,
  thumbnail,
  price,
  quantity,
}) => {
  const { id: cartId, dispatch } = useCartContext();

  const handleDelete = async (e) => {
    await fetch(`/api/carrito/${cartId}/productos/${id}`, { method: 'DELETE' });

    dispatch({ type: 'DELETE_PRODUCT', payload: id });
  };

  return (
    <div className={styles.card}>
      <img className={styles.image} src={thumbnail} alt="" />
      <div className={styles.info}>
        <p className={styles.title}>{title}</p>
        <p className={styles.quantity}>Cantidad: {quantity}</p>
      </div>
      <button className="btn" onClick={handleDelete}>
        Eliminar
      </button>
    </div>
  );
};

export default CartItem;
