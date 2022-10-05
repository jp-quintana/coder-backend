import { NavLink, Link } from 'react-router-dom';

import styles from './index.module.css';

const Nav = () => {
  const navLinkStyles = styles.active;

  return (
    <div className={styles.nav_container}>
      <nav>
        <ul>
          <li className={styles.logo}>
            <Link to="/">Logo</Link>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? navLinkStyles : undefined
              }
              end
            >
              Productos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/productos/admin"
              className={({ isActive }) =>
                isActive ? navLinkStyles : undefined
              }
              end
            >
              Productos Admin
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/productos/admin/agregar"
              className={({ isActive }) =>
                isActive ? navLinkStyles : undefined
              }
            >
              Agregar Producto
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/carrito"
              className={({ isActive }) =>
                isActive ? navLinkStyles : undefined
              }
            >
              Carrito
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
