import { Link } from 'react-router-dom';

import { useAuthContext } from '../../hooks/useAuthContext';

import styles from './index.module.css';

const Nav = () => {
  const { user } = useAuthContext();
  return (
    <nav className={`${styles.nav} main-container`}>
      <ul>
        <li className={styles.logo}>
          <Link to="/">Logo</Link>
        </li>
        {!user && (
          <li className={styles.login}>
            <Link to="/login">Login</Link>
          </li>
        )}
        {user && (
          <>
            <li className={styles.greeting}>Bienvenido, {user}</li>
            <li className={styles.logout}>
              <Link to="/logout">Logout</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
