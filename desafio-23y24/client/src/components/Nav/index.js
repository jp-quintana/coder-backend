import { Link } from 'react-router-dom';

import { useAuthContext } from '../../hooks/useAuthContext';
const Nav = () => {
  const { user } = useAuthContext();
  return (
    <nav className="nav main-container">
      <ul>
        <li className="logo">
          <Link to="/">Logo</Link>
        </li>
        {!user && (
          <li className="login">
            <Link to="/login">Login</Link>
          </li>
        )}
        {user && (
          <>
            <li className="greeting">
              <Link to="/login">Login</Link>
            </li>
            <li className="logout">
              <Link to="/login">Logout</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
