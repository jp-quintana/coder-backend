import { useCartContext } from '../../hooks/useCartContext';

import Card from '../../components/Card';

import styles from './index.module.css';

const ProductCard = ({
  id,
  timestamp,
  title,
  description,
  sku,
  thumbnail,
  price,
  stock,
}) => {
  const { id: cartId, dispatch } = useCartContext();

  const handleAddToCart = async (e) => {
    let cId = cartId;
    if (!cId) {
      const response = await fetch(`/api/carrito`, {
        method: 'POST',
      });
      cId = await response.json();

      dispatch({ type: 'CREATE_CART', payload: cId });
    }

    const response = await fetch(`/api/carrito/${cId}/productos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    //TODO: CHECK 1
    const updatedItems = await response.json();

    dispatch({ type: 'UPDATE_CART', payload: updatedItems });

    // navigate('/carrito');
  };

  return (
    <Card>
      <div className={styles.img_wrapper}>
        <img src={thumbnail} alt="" />
      </div>
      <div className={styles.product_info_container}>
        <h2>{title}</h2>
        <p>{description}</p>
        <p className={styles.price}>${price}</p>
      </div>
      <button className="btn" onClick={handleAddToCart}>
        Agregar a carrito
      </button>
    </Card>
  );
};

export default ProductCard;
