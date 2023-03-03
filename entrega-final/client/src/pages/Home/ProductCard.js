import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../hooks/useAuthContext';
import { useCart } from '../../hooks/useCart';

import Card from '../../components/Card';

import styles from './index.module.css';

const ProductCard = ({
  id,
  // timestamp,
  title,
  description,
  thumbnail,
  price,
}) => {
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const { addItem } = useCart();

  const [navigation, setNavigation] = useState();

  const handleAddToCart = async (e) => {
    if (!user) {
      setNavigation(true);
      return;
    }

    await addItem({ id, title, description, thumbnail, price });
  };

  useEffect(() => {
    if (navigation) {
      navigate('/login');
    }
  }, [navigation]);

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
