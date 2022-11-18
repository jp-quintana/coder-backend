import { Link } from 'react-router-dom';

import styles from './index.module.css';

const Nav = () => {
  return (
    <nav className={`${styles.nav} main-container`}>
      <ul>
        <li className={styles.logo}>
          <Link to="/">Logo</Link>
        </li>
        <li className={styles.login}>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
