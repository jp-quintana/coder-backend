import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './index.module.css';

const EditProduct = () => {
  const navigate = useNavigate();
  const { id: urlId } = useParams();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const [userInput, setUserInput] = useState({
    title: '',
    description: '',
    sku: '',
    thumbnail: '',
    price: 0,
    stock: 0,
  });

  const [productTimestamp, setProductTimestamp] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/productos/${urlId}`);
      const { timestamp, title, description, sku, thumbnail, price, stock } =
        await response.json();

      setUserInput({ title, description, sku, thumbnail, price, stock });
      setProductTimestamp(timestamp);
    };

    fetchProduct();
  }, [urlId]);

  const handleTitleChange = (e) => {
    setUserInput((prevState) => {
      return { ...prevState, title: e.target.value };
    });
  };
  const handleDescriptionChange = (e) => {
    setUserInput((prevState) => {
      return { ...prevState, description: e.target.value };
    });
  };
  const handleSkuChange = (e) => {
    setUserInput((prevState) => {
      return { ...prevState, sku: e.target.value };
    });
  };
  const handleThumbnailChange = (e) => {
    setUserInput((prevState) => {
      return { ...prevState, thumbnail: e.target.value };
    });
  };
  const handlePriceChange = (e) => {
    setUserInput((prevState) => {
      return { ...prevState, price: e.target.value };
    });
  };
  const handleStockChange = (e) => {
    setUserInput((prevState) => {
      return { ...prevState, stock: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    try {
      await fetch(`/api/productos/${urlId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...userInput, timestamp: productTimestamp }),
      });
      //   const data = await response.json();

      navigate('/');
    } catch (err) {
      setIsPending(false);
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="page-title">Editar Producto</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Completar:</h2>
        <label>
          <span>Título: </span>
          <input
            type="text"
            onChange={handleTitleChange}
            value={userInput.title}
          />
        </label>
        <label>
          <span>Descripción: </span>
          <textarea
            type="text"
            onChange={handleDescriptionChange}
            value={userInput.description}
          />
        </label>
        <label>
          <span>SKU: </span>
          <input type="text" onChange={handleSkuChange} value={userInput.sku} />
        </label>
        <label>
          <span>Thumbnail: </span>
          <input
            type="url"
            onChange={handleThumbnailChange}
            value={userInput.thumbnail}
          />
        </label>
        <label>
          <span>Precio: </span>
          <input
            type="number"
            min="1"
            step="0.01"
            onChange={handlePriceChange}
            value={userInput.price}
          />
        </label>
        <label>
          <span>Stock: </span>
          <input
            type="number"
            min="1"
            step="1"
            onChange={handleStockChange}
            value={userInput.stock}
          />
        </label>
        {!isPending && <button className="btn">Editar</button>}
        {isPending && (
          <button className="btn" disabled>
            Cargando...
          </button>
        )}
        {error && <p className="error">Error: {error}</p>}
      </form>
    </div>
  );
};

export default EditProduct;
