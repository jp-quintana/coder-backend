import { Link } from 'react-router-dom';

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
  const handleAddToCart = (e) => {
    console.log(id);
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
      <Link className={styles.button} to={`/productos/admin/${id}`}>
        <span>Editar</span>
      </Link>
    </Card>
  );
};

export default ProductCard;
