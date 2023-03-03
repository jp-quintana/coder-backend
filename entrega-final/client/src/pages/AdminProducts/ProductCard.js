import { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useAdmin } from '../../hooks/useAdmin';

import Card from '../../components/Card';

import styles from './index.module.css';

const ProductCard = ({
  id,
  // timestamp,
  title,
  description,
  sku,
  thumbnail,
  price,
  stock,
}) => {
  const navigate = useNavigate();
  const { deleteProduct, isLoading, error } = useAdmin();

  const [navigation, setNavigation] = useState(false);

  const handleDelete = async () => {
    await deleteProduct(id);

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
    <Card>
      <div className={styles.img_wrapper}>
        <img src={thumbnail} alt="" />
      </div>
      <div className={styles.product_info_container}>
        <h2>{title}</h2>
        <p>{description}</p>
        <p className={styles.price}>${price}</p>
      </div>
      <Link className={`btn ${styles.button}`} to={`/productos/admin/${id}`}>
        <span>Editar</span>
      </Link>
      <button className="btn" onClick={handleDelete}>
        Eliminar
      </button>
    </Card>
  );
};

export default ProductCard;
