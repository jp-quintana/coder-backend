import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleAddToCart = async (e) => {
    await fetch('/api/carrito/1/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    navigate('/carrito');
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
