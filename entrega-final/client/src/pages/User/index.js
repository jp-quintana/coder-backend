import { useState, useEffect } from 'react';

import { useAuthContext } from '../../hooks/useAuthContext';
import { useOrder } from '../../hooks/useOrder';

import Order from './Order';

import styles from './index.module.css';

const User = () => {
  const { user } = useAuthContext();
  const { getOrders, isLoading, error } = useOrder();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrders();
      const data = await response.json();
      setOrders(data);
      console.log(data);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1 className="page-title">Perfil</h1>
      <div className={styles.container}>
        <div className={styles.orders_wrapper}>
          <h2>Tus ordenes:</h2>
          {isLoading && <p>Cargando ordenes...</p>}
          {!isLoading && orders.length === 0 && (
            <p>No se agregaron ordenes todavia!</p>
          )}
          {!isLoading && orders.length > 0 && (
            <ul>
              {orders.map((order) => (
                <li key={order.id}>
                  <Order order={order} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.user_details_wrapper}>
          <h2>Detalles:</h2>
          <ul className={styles.user_details}>
            <li>Email: {user.email}</li>
            <li>Dirección: {user.address}</li>
            <li>Teléfono: {user.phone}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default User;
