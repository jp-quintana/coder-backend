import { useLocation, Link } from 'react-router-dom';

import styles from './index.module.css';

const AuthFail = () => {
  const { pathname, state } = useLocation();
  const pageTitle =
    pathname === '/failregister' ? 'Signup Failed' : 'Login Failed';
  return (
    <section className={`${styles.container} main-container`}>
      <h1 className={styles.page_title}>{pageTitle}</h1>
      <h2 className={styles.error_message}>{state.message}</h2>
      <div>
        <Link to="/" className={styles.back}>
          Volver a inicio
        </Link>
      </div>
    </section>
  );
};

export default AuthFail;
