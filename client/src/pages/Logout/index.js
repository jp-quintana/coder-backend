import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';

import styles from './index.module.css';

const Logout = () => {
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const { logout } = useLogout();

  useEffect(() => {
    setTimeout(async () => {
      await logout();
      navigate('/');
    }, 2000);
  }, []);

  return (
    <section>
      <h1 className={styles.page_title}>Adios {user}</h1>
    </section>
  );
};

export default Logout;
