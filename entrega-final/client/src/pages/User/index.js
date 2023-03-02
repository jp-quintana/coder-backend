import { useState, useEffect } from 'react';

import { useOrder } from '../../hooks/useOrder';

import styles from './index.module.css';

const User = () => {
  const { getOrders, isLoading, error } = useOrder();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrders();
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1 className="page-title">Perfil</h1>
      {isLoading && <p>Cargando ordenes...</p>}
      {!isLoading && orders.length === 0 && (
        <p>No se agregaron ordenes todavia!</p>
      )}
      {orders.length > 0 && <div className={styles.orders_container}></div>}
    </div>
  );
};

export default User;
