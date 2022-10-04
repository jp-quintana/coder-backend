import { Link } from 'react-router-dom';

import './index.module.css';
const Nav = () => {
  return (
    <div>
      <nav>
        <ul>
          <li className="logo">Logo</li>
          <li>
            <Link>Productos</Link>
          </li>
          <li>
            <Link>Agregar</Link>
          </li>
          <li>
            <Link>Carrito</Link>
          </li>
          {/* <li>
            <Link>Productos</Link>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
