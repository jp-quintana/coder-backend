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
  return (
    <div className={styles.card}>
      <img className={styles.image} src={thumbnail} alt="" />
      <div className={styles.info}>
        <p className={styles.title}>{title}</p>
        <p className={styles.quantity}>Cantidad: {quantity}</p>
      </div>
      <button className="btn">Eliminar</button>
    </div>
  );
};

export default CartItem;
