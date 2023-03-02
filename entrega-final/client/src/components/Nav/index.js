import { NavLink, Link, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../hooks/useAuthContext';
import { useCartContext } from '../../hooks/useCartContext';
import { useLogout } from '../../hooks/useLogout';

import styles from './index.module.css';

const Nav = () => {
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const { items } = useCartContext();
  const { logout } = useLogout();

  let cartQuantity = 0;
  items.forEach((item) => (cartQuantity += item.quantity));

  const navLinkStyles = styles.active;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

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
          {user && (
            <>
              {user.isAdmin && (
                <>
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
                </>
              )}
              <li>
                <NavLink
                  to="/carrito"
                  className={({ isActive }) =>
                    isActive ? navLinkStyles : undefined
                  }
                >
                  Carrito <span>({cartQuantity})</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/usuario"
                  className={({ isActive }) =>
                    isActive ? navLinkStyles : undefined
                  }
                >
                  Hola <span>{user.email}</span>!
                </NavLink>
              </li>

              <li className={styles.logout} onClick={handleLogout}>
                Logout
              </li>
            </>
          )}
          {!user && (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? navLinkStyles : undefined
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive ? navLinkStyles : undefined
                  }
                >
                  Registrate
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
