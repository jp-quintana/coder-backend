import { useState, useEffect } from 'react';

import ProductCard from './ProductCard';

import styles from './index.module.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/productos');
      const data = await response.json();
      setProducts(data);
      setIsPending(false);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="page-title">Productos</h1>
      {isPending && <p>Cargando productos...</p>}
      {!isPending && products.length === 0 && (
        <p>No se agregaron productos todavia!</p>
      )}
      {products.length > 0 && (
        <div className={styles.products_container}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              timestamp={product.timestamp}
              title={product.title}
              description={product.description}
              sku={product.sku}
              thumbnail={product.thumbnail}
              price={product.price}
              stock={product.stock}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
