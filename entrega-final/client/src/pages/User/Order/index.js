import moment from 'moment';

import styles from './index.module.css';

const Order = ({ order }) => {
  return (
    <div className={styles.order}>
      <p>Order: {order.id}</p>
      {order.createdAt && (
        <p>{moment(order.createdAt).format('hh:mm:ss DD/MM/YYYY')}</p>
      )}
    </div>
  );
};

export default Order;
